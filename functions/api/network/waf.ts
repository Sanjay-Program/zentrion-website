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

    // Prevent SSRF abuse
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

    const res = await fetch(targetUrlObj.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ZentrionSecScanner/1.0)',
        'Accept': '*/*',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
      // @ts-expect-error Cloudflare Workers specific fetch options
      cf: { cacheTtl: 0 },
    });

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const wafDetected: string[] = [];

    // WAF signature detection
    if (headers['cf-ray']) wafDetected.push('Cloudflare');
    if (headers['x-amz-cf-id']) wafDetected.push('AWS WAF / CloudFront');
    if (headers['x-akamai-transformed'] || headers['x-akamai-request-id']) wafDetected.push('Akamai');
    if (headers['x-sucuri-id']) wafDetected.push('Sucuri');
    if (headers['x-iinfo']) wafDetected.push('Imperva');
    if (headers['x-served-by'] && headers['x-served-by'].toLowerCase().includes('cache')) wafDetected.push('Fastly');
    if (headers['x-varnish']) wafDetected.push('Varnish');
    if (headers['barra_counter_session']) wafDetected.push('Barracuda');
    if (headers['x-waf-status']) wafDetected.push('F5 BIG-IP');
    if (headers['server'] && headers['server'].toLowerCase().includes('nginx')) wafDetected.push('Nginx');
    if (headers['server'] && headers['server'].toLowerCase().includes('apache')) wafDetected.push('Apache');

    return Response.json({
      url: targetUrlObj.toString(),
      wafDetected,
      server: headers['server'] ?? null,
      responseCode: res.status,
      headers,
      tls: targetUrlObj.protocol === 'https:',
    });
  } catch (err) {
    return Response.json({
      error: 'Failed to reach the target URL. The host may be down, blocking requests, or the URL is invalid.',
      details: err instanceof Error ? err.message : String(err),
    }, { status: 502 });
  }
}
