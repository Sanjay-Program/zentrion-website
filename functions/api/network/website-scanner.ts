export async function onRequestGet(context: any) {
  const request = context.request;
  const urlParam = new URL(request.url).searchParams.get('url');

  if (!urlParam) {
    return Response.json({ error: 'Please provide a valid URL or domain.' }, { status: 400 });
  }

  // Clean the domain
  let domain = urlParam.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
  
  if (!domain) {
    return Response.json({ error: 'Invalid domain format.' }, { status: 400 });
  }

  try {
    const originUrl = new URL(request.url).origin;
    
    // Fetch DNS Data
    const dnsRes = await fetch(`${originUrl}/api/network/dns?domain=${domain}&type=A`);
    const dnsData = await dnsRes.json();
    
    // Fetch Header Data
    let headerScore = 0;
    let headers = {};
    try {
        const headerRes = await fetch(`https://${domain}`, { method: 'HEAD', redirect: 'follow' });
        const rawHeaders = Object.fromEntries(headerRes.headers.entries());
        headers = rawHeaders;
        
        // Very basic security header check
        const securityHeaders = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options'];
        let foundHeaders = 0;
        for (const h of securityHeaders) {
            if (rawHeaders[h]) foundHeaders++;
        }
        headerScore = Math.round((foundHeaders / securityHeaders.length) * 100);
    } catch(e) {
        // Network error fetching headers
    }

    // Determine basic security score
    let score = 50;
    let grade = 'C';
    
    if (headerScore > 50) score += 20;
    if (headerScore === 100) score += 30;
    if (dnsData.valid && dnsData.records?.length > 0) score += 20;
    else score -= 20;

    if (score > 90) grade = 'A';
    else if (score > 70) grade = 'B';
    else if (score > 50) grade = 'C';
    else if (score > 30) grade = 'D';
    else grade = 'F';

    return Response.json({
      valid: true,
      domain: domain,
      security_score: score,
      grade: grade,
      dns_status: dnsData.valid ? 'Active' : 'Offline',
      header_security: `${headerScore}%`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to scan website.' }, { status: 500 });
  }
}
