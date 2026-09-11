export async function onRequestGet({ request }: { request: Request }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const urlParams = new URL(request.url).searchParams;
  let host = urlParams.get('host')?.trim();
  const portsParam = urlParams.get('ports')?.trim();

  if (!host) {
    return Response.json({ error: 'Please provide a host.' }, { status: 400, headers: corsHeaders });
  }

  // Basic sanitization
  host = host.replace(/^https?:\/\//, '').split('/')[0];

  // Prevent abuse (don't scan localhost/internal IPs)
  if (
    host === 'localhost' ||
    host.startsWith('127.') ||
    host.startsWith('192.168.') ||
    host.startsWith('10.') ||
    host.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
  ) {
    return Response.json({ error: 'Internal/Local IP addresses are not permitted.' }, { status: 403, headers: corsHeaders });
  }

  const SERVICES: Record<number, string> = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    110: 'POP3',
    143: 'IMAP',
    443: 'HTTPS',
    445: 'SMB',
    3306: 'MySQL',
    3389: 'RDP',
    5432: 'PostgreSQL',
    5900: 'VNC',
    6379: 'Redis',
    8080: 'HTTP-Alt',
    8443: 'HTTPS-Alt',
    8888: 'Jupyter',
    27017: 'MongoDB',
  };

  const PRESETS: Record<string, number[]> = {
    web: [80, 443, 8080, 8443],
    db: [3306, 5432, 27017, 6379],
    top20: [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 5432, 5900, 6379, 8080, 8443, 8888, 27017],
  };

  let ports: number[] = [];

  if (!portsParam) {
    ports = PRESETS['top20'];
  } else if (PRESETS[portsParam.toLowerCase()]) {
    ports = PRESETS[portsParam.toLowerCase()];
  } else {
    ports = portsParam
      .split(',')
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p) && p > 0 && p <= 65535);
  }

  // Limit to 30 ports
  ports = ports.slice(0, 30);

  if (ports.length === 0) {
    return Response.json({ error: 'No valid ports specified.' }, { status: 400, headers: corsHeaders });
  }

  const checkPort = async (port: number): Promise<{ port: number; open: boolean; service: string }> => {
    const protocol = port === 443 || port === 8443 ? 'https' : 'http';
    const url = `${protocol}://${host}:${port}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        // @ts-expect-error Cloudflare Workers specific fetch option
        cf: { cacheTtl: 0 },
      });
      clearTimeout(timeoutId);
      return { port, open: true, service: SERVICES[port] ?? 'Unknown' };
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isTimeout = err?.name === 'AbortError' || err?.message?.includes('aborted');
      const isConnectionRefused =
        err?.message?.includes('refused') || err?.message?.includes('ECONNREFUSED');

      if (isTimeout) {
        return { port, open: false, service: SERVICES[port] ?? 'Unknown' };
      }
      // Non-timeout, non-refused errors may indicate port is open but rejected HTTP
      if (!isConnectionRefused) {
        return { port, open: true, service: SERVICES[port] ?? 'Unknown' };
      }
      return { port, open: false, service: SERVICES[port] ?? 'Unknown' };
    }
  };

  try {
    const results = await Promise.all(ports.map(checkPort));
    const openCount = results.filter((r) => r.open).length;

    return Response.json(
      {
        host,
        results,
        scanned: results.length,
        open_count: openCount,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      {
        error: 'Port scan failed.',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 502, headers: corsHeaders }
    );
  }
}
