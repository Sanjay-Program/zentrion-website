export async function onRequestGet(context: any) {
  try {
    const request = context.request;
    const cf = request.cf || {};
    
    // Fallback headers for local dev where `request.cf` might be empty
    const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-real-ip') || '127.0.0.1';
    
    return Response.json({
      success: true,
      ip: ip,
      country: cf.country || 'Unknown',
      city: cf.city || 'Unknown',
      region: cf.region || 'Unknown',
      asn: cf.asn ? `AS${cf.asn}` : 'Unknown',
      org: cf.asOrganization || 'Unknown',
      loc: cf.colo || 'Unknown'
    });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
