export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let mac = urlParams.get('mac')?.trim();

  if (!mac) {
    return Response.json({ error: 'Please provide a MAC address.' }, { status: 400 });
  }

  // Clean the MAC address (remove colons, hyphens, dots)
  const cleanMac = mac.replace(/[^a-fA-F0-9]/g, '');

  if (cleanMac.length < 6) {
    return Response.json({ error: 'Invalid MAC address. Must provide at least the first 6 hex characters (OUI).' }, { status: 400 });
  }

  // api.maclookup.app provides a free JSON API for OUI lookups
  // Ensure we use the API key if required, but v2/macs is public for basic info
  const apiUrl = `https://api.maclookup.app/v2/macs/${cleanMac}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (OUI Lookup)'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 404 || res.status === 400) {
        return Response.json({ error: 'MAC address or Vendor not found in the OUI database.' }, { status: 404 });
      }
      if (res.status === 429) {
         return Response.json({ error: 'Rate limit exceeded for OUI database. Try again later.' }, { status: 429 });
      }
      throw new Error(`API returned status ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.success || !data.found) {
       return Response.json({ error: 'Vendor not found.' }, { status: 404 });
    }

    return Response.json(data);

  } catch (err: any) {
    if (err.name === 'AbortError') {
      return Response.json({ error: 'OUI lookup timed out.' }, { status: 504 });
    }
    return Response.json({ 
      error: 'Failed to fetch OUI data.',
      details: err.message
    }, { status: 500 });
  }
}
