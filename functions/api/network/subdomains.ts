export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let domain = urlParams.get('domain')?.trim();

  if (!domain) {
    return Response.json({ error: 'Please provide a domain.' }, { status: 400 });
  }

  // Basic sanitization
  domain = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
  
  // crt.sh query format
  const crtUrl = `https://crt.sh/?q=%.${domain}&output=json`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(crtUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (Subdomain Recon)'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 502 || res.status === 503 || res.status === 504) {
        return Response.json({ error: 'Certificate Transparency database is currently overloaded or offline. Please try again later.' }, { status: 502 });
      }
      throw new Error(`crt.sh returned status ${res.status}`);
    }

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // crt.sh sometimes returns invalid JSON or HTML when it errors out
      return Response.json({ error: 'Failed to parse response from Certificate Transparency logs.' }, { status: 502 });
    }

    if (!Array.isArray(data)) {
      return Response.json({ 
        domain,
        subdomains: [] 
      });
    }

    // Extract subdomains and deduplicate
    const subdomainSet = new Set<string>();

    data.forEach((entry: any) => {
      if (entry.name_value) {
        // name_value can contain multiple domains separated by newlines
        const names = entry.name_value.split('\n');
        names.forEach((name: string) => {
          const cleanName = name.trim().toLowerCase();
          // Filter out wildcards and the root domain itself if desired (though keeping root is fine)
          if (cleanName && !cleanName.startsWith('*.')) {
            subdomainSet.add(cleanName);
          }
        });
      }
    });

    const subdomains = Array.from(subdomainSet).sort();

    return Response.json({
      domain,
      count: subdomains.length,
      subdomains
    });

  } catch (err: any) {
    if (err.name === 'AbortError') {
      return Response.json({ error: 'Query timed out. The domain may have too many certificates or crt.sh is overloaded.' }, { status: 504 });
    }
    return Response.json({ 
      error: 'Failed to query Certificate Transparency logs.',
      details: err.message
    }, { status: 500 });
  }
}
