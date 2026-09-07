export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let targetUrl = urlParams.get('url')?.trim();

  if (!targetUrl) {
    return Response.json({ error: 'Please provide a URL to inspect.' }, { status: 400 });
  }

  // Auto-prepend https:// if missing
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const targetUrlObj = new URL(targetUrl);
    
    // Prevent abuse (don't fetch localhost/internal IPs)
    const hostname = targetUrlObj.hostname;
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
    ) {
      return Response.json({ error: 'Internal/Local IP addresses are not permitted.' }, { status: 403 });
    }

    const initTime = Date.now();
    
    // We do a GET request because some servers block or return different headers for HEAD requests
    const res = await fetch(targetUrlObj.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (Header Inspector)',
        'Accept': '*/*',
      },
      redirect: 'follow', // Follow redirects so we get the final destination headers
      // Cloudflare specific options: limit body size since we only care about headers
      cf: {
        cacheTtl: 0, 
      }
    });

    const responseTime = Date.now() - initTime;

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return Response.json({
      url: targetUrlObj.toString(),
      status: res.status,
      statusText: res.statusText,
      redirected: res.redirected,
      responseTimeMs: responseTime,
      headers: headers
    });

  } catch (err) {
    return Response.json({ 
      error: 'Failed to reach the target URL. The host may be down, blocking requests, or invalid.',
      details: err instanceof Error ? err.message : String(err)
    }, { status: 502 });
  }
}
