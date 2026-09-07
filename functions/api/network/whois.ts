export async function onRequestGet({ request, env }: { request: Request, env: any }) {
  const urlParams = new URL(request.url).searchParams;
  const domain = urlParams.get('domain')?.trim().toLowerCase();

  if (!domain) {
    return Response.json({ error: 'Please provide a domain name.' }, { status: 400 });
  }

  // Basic domain validation
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(domain)) {
    return Response.json({ error: 'Invalid domain format.' }, { status: 400 });
  }

  // Check if API key is provided in Cloudflare environment variables
  const apiKey = env.WHOIS_API_KEY;

  if (!apiKey) {
    // Return mock data if no API key is configured yet
    return Response.json({
      domain: domain,
      domain_id: `MOCK_ID_${Math.floor(Math.random() * 1000000)}`,
      status: "clientTransferProhibited",
      create_date: "1997-09-15T04:00:00Z",
      update_date: new Date().toISOString(),
      expire_date: new Date(Date.now() + 31536000000).toISOString(),
      domain_age: 9500,
      whois_server: `whois.mock-registrar.com`,
      registrar: {
        iana_id: "1337",
        name: "Mock Registrar, LLC",
        url: "https://mock-registrar.com"
      },
      registrant: {
        name: "DATA REDACTED",
        organization: "DATA REDACTED",
        street_address: "REDACTED FOR PRIVACY",
        city: "REDACTED",
        region: "REDACTED",
        zip_code: "REDACTED",
        country: "US",
        phone: "REDACTED",
        fax: "REDACTED",
        email: "mock-privacy@contactprivacy.com"
      },
      nameservers: [
        "ns1.mock-dns.com",
        "ns2.mock-dns.com"
      ],
      _mock: true,
      _message: "Configure the WHOIS_API_KEY environment variable in Cloudflare to enable real live lookups."
    });
  }

  try {
    // Implement live lookup using IP2WHOIS API
    const res = await fetch(`https://api.ip2whois.com/v2?key=${apiKey}&domain=${encodeURIComponent(domain)}`, {
      cf: {
        cacheTtl: 86400, // Cache WHOIS lookups for 24 hours to save API credits
      }
    });

    if (!res.ok) {
      return Response.json({ error: 'WHOIS provider returned an error.' }, { status: 502 });
    }

    const data = await res.json();
    
    if (data.error) {
      return Response.json({ error: data.error.error_message || 'Domain lookup failed.' }, { status: 400 });
    }

    return Response.json(data);

  } catch (err) {
    return Response.json({ error: 'Failed to contact WHOIS servers.' }, { status: 502 });
  }
}
