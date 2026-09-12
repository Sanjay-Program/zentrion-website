interface Env {
  // Add KV or D1 bindings here for production lead storage
  // LEADS: D1Database;
  // AUDIT_REPORTS: KVNamespace;
}

export async function onRequestPost({ request, env, params }: { request: Request, env: Env, params: any }) {
  try {
    const reportId = params.reportId;
    const data = await request.json() as { 
      name: string; 
      email: string; 
      company: string; 
      phone: string;
      _state?: any; // Used in this prototype to pass state from index.ts
    };

    if (!data.name || !data.email || !data.phone) {
      return new Response(JSON.stringify({ error: 'Name, email, and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // In a real scenario, we'd retrieve the report results from KV:
    // const rawResults = await env.AUDIT_REPORTS.get(reportId as string);
    // const results = rawResults ? JSON.parse(rawResults) : null;
    
    // For this prototype, we're relying on the state passed from the client
    const results = data._state;

    if (!results) {
      return new Response(JSON.stringify({ error: 'Report expired or not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Capture the lead
    const lead = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      domain: results.domain,
      score: results.score,
      timestamp: new Date().toISOString()
    };

    // Save lead to Cloudflare D1 or KV (Mocked for this prototype)
    console.log("Captured Lead:", lead);
    
    // Cloudflare Workers don't support Node's 'fs' or 'pdfkit' natively.
    // Instead of generating a PDF server-side, we return the FULL unredacted 
    // JSON results to the client. The client can then use \`jspdf\` or \`window.print()\`
    // to generate the final PDF report.
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Lead captured successfully',
      fullReport: results,
      leadDetails: lead
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
