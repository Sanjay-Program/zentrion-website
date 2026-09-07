export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let target = urlParams.get('target')?.trim();

  if (!target) {
    return Response.json({ error: 'Please provide a target domain or IP.' }, { status: 400 });
  }

  // Basic sanitization
  target = target.replace(/^https?:\/\//, '').split('/')[0];

  // Prevent abuse (don't fetch localhost/internal IPs)
  if (
    target === 'localhost' ||
    target.startsWith('127.') ||
    target.startsWith('192.168.') ||
    target.startsWith('10.') ||
    target.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
  ) {
    return Response.json({ error: 'Internal/Local IP addresses are not permitted.' }, { status: 403 });
  }

  const pings = [];
  const PING_COUNT = 4;
  
  // To simulate ping, we will do HTTP HEAD requests to measure latency.
  // We use http:// to avoid TLS handshake overhead in the latency calculation if possible,
  // but many sites enforce HTTPS, so we'll try HTTPS if HTTP fails.
  let protocol = 'http://';
  let targetUrl = `${protocol}${target}`;

  try {
    for (let i = 0; i < PING_COUNT; i++) {
      const initTime = Date.now();
      let success = false;
      let status = 0;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout per ping
        
        const res = await fetch(targetUrl, {
          method: 'HEAD',
          headers: { 'User-Agent': 'Zentrion-Cyber-Suite/1.0 (Web Ping)' },
          signal: controller.signal,
          // @ts-expect-error Cloudflare Workers specific fetch options
          cf: { cacheTtl: 0 } // Bypass cache
        });
        
        clearTimeout(timeoutId);
        success = true;
        status = res.status;
      } catch (err: any) {
        // If HTTP fails on the first try, switch to HTTPS for subsequent pings
        if (i === 0 && (err.message?.includes('network error') || err.message?.includes('socket'))) {
          protocol = 'https://';
          targetUrl = `${protocol}${target}`;
        }
      }

      const responseTime = Date.now() - initTime;

      pings.push({
        seq: i + 1,
        success,
        status,
        timeMs: responseTime
      });

      // Artificial small delay between pings
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const successfulPings = pings.filter(p => p.success);
    const packetLoss = ((PING_COUNT - successfulPings.length) / PING_COUNT) * 100;
    
    let minTime = 0;
    let maxTime = 0;
    let avgTime = 0;

    if (successfulPings.length > 0) {
      const times = successfulPings.map(p => p.timeMs);
      minTime = Math.min(...times);
      maxTime = Math.max(...times);
      avgTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    }

    return Response.json({
      target,
      resolvedProtocol: protocol.replace('://', ''),
      pings,
      statistics: {
        packetsTransmitted: PING_COUNT,
        packetsReceived: successfulPings.length,
        packetLossPercent: packetLoss,
        minMs: minTime,
        maxMs: maxTime,
        avgMs: avgTime
      }
    });

  } catch (err) {
    return Response.json({ 
      error: 'Ping sequence failed critically.',
      details: err instanceof Error ? err.message : String(err)
    }, { status: 502 });
  }
}
