export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  const mac = urlParams.get('mac')?.trim();

  if (!mac) {
    return Response.json({ error: 'Please provide a MAC address.' }, { status: 400 });
  }

  // Basic MAC validation
  const cleanMac = mac.replace(/[:-]/g, '').toUpperCase();
  if (cleanMac.length !== 12 || !/^[0-9A-F]{12}$/.test(cleanMac)) {
    return Response.json({ error: 'Invalid MAC address format.' }, { status: 400 });
  }

  try {
    // https://macvendors.co/api/ returns { company, mac_prefix, address, ... }
    const res = await fetch(`https://macvendors.co/api/${cleanMac}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Zentrion-Cyber-Suite/1.0'
      },
      cf: {
        // Cache responses for a long time at the edge since MAC assignments rarely change
        cacheTtl: 86400 * 30,
        cacheEverything: true
      }
    });

    if (!res.ok) {
      return Response.json({ error: 'Failed to query MAC vendor database.' }, { status: 502 });
    }

    const data = await res.json();
    return Response.json(data);

  } catch (err) {
    return Response.json({ error: 'MAC vendor database is currently unreachable.' }, { status: 502 });
  }
}
