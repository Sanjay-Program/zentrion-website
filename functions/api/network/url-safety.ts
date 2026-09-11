export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  const targetUrl = urlParams.get('url')?.trim();

  if (!targetUrl) {
    return Response.json({ error: 'Please provide a URL to check.' }, { status: 400 });
  }

  // --- URLhaus check ---
  let urlhausResult: { listed: boolean; threat: string | null; tags: string[] } = {
    listed: false,
    threat: null,
    tags: [],
  };

  try {
    const uhBody = new URLSearchParams({ url: targetUrl });
    const uhRes = await fetch('https://urlhaus-api.abuse.ch/v1/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: uhBody.toString(),
      signal: AbortSignal.timeout(8000),
    });

    if (uhRes.ok) {
      const uhData = await uhRes.json() as {
        query_status?: string;
        url_status?: string;
        threat?: string | null;
        tags?: string[] | null;
      };

      const isListed =
        uhData.query_status === 'is_listed' &&
        (uhData.url_status === 'online' || uhData.url_status === 'offline');

      urlhausResult = {
        listed: isListed,
        threat: uhData.threat ?? null,
        tags: uhData.tags ?? [],
      };
    }
  } catch {
    // URLhaus unreachable — leave defaults
  }

  // --- PhishTank check ---
  let phishtankResult: { listed: boolean; verified: boolean } | null = null;

  try {
    const ptParams = new URLSearchParams({
      url: encodeURIComponent(targetUrl),
      format: 'json',
      app_key: '',
    });
    const ptRes = await fetch(
      `https://checkurl.phishtank.com/checkurl/?${ptParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ZentrionSecScanner/1.0)',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (ptRes.ok) {
      const ptData = await ptRes.json() as {
        results?: {
          in_database?: boolean;
          verified?: boolean;
        };
      };

      phishtankResult = {
        listed: ptData.results?.in_database ?? false,
        verified: ptData.results?.verified ?? false,
      };
    }
  } catch {
    // PhishTank unreachable — leave null
  }

  // --- Verdict ---
  let verdict: 'safe' | 'unsafe' | 'suspicious' | 'unknown' = 'unknown';

  const isPhishing = phishtankResult?.listed && phishtankResult?.verified;

  if (urlhausResult.listed || isPhishing) {
    verdict = 'unsafe';
  } else if (phishtankResult?.listed && !phishtankResult?.verified) {
    verdict = 'suspicious';
  } else if (phishtankResult !== null) {
    // Both checks ran and neither flagged it
    verdict = 'safe';
  } else if (!urlhausResult.listed) {
    // Only URLhaus ran and it's clean — call it suspicious since we lack full info
    verdict = 'suspicious';
  }

  return Response.json({
    url: targetUrl,
    urlhaus: urlhausResult,
    phishtank: phishtankResult,
    verdict,
  });
}
