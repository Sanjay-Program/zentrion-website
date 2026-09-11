export async function onRequestGet({ request }: { request: Request }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const urlParams = new URL(request.url).searchParams;
  const id = urlParams.get('id')?.trim().toUpperCase();

  if (!id) {
    return Response.json({ error: 'Please provide a CVE ID.' }, { status: 400, headers: corsHeaders });
  }

  // Validate CVE format: CVE-YYYY-NNNNN
  if (!/^CVE-\d{4}-\d{4,}$/.test(id)) {
    return Response.json(
      { error: `Invalid CVE ID format. Expected CVE-YYYY-NNNNN, got: ${id}` },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const nvdUrl = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${id}`;
    const res = await fetch(nvdUrl, {
      headers: {
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (CVE Lookup)',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: `NVD API returned status ${res.status}` },
        { status: res.status, headers: corsHeaders }
      );
    }

    const data: any = await res.json();

    if (!data.vulnerabilities || data.vulnerabilities.length === 0) {
      return Response.json(
        { error: `CVE ${id} not found in NVD database.` },
        { status: 404, headers: corsHeaders }
      );
    }

    const vuln = data.vulnerabilities[0].cve;

    // Parse description (prefer English)
    const description =
      vuln.descriptions?.find((d: any) => d.lang === 'en')?.value ??
      vuln.descriptions?.[0]?.value ??
      'No description available.';

    // Parse CVSS v3 metrics (prefer v3.1 over v3.0)
    let cvssV3Score: number | null = null;
    let cvssV3Severity: string | null = null;
    let cvssV3Vector: string | null = null;

    const metricsV31 = vuln.metrics?.cvssMetricV31?.[0]?.cvssData;
    const metricsV30 = vuln.metrics?.cvssMetricV30?.[0]?.cvssData;
    const cvssData = metricsV31 ?? metricsV30;

    if (cvssData) {
      cvssV3Score = cvssData.baseScore ?? null;
      cvssV3Severity = cvssData.baseSeverity ?? null;
      cvssV3Vector = cvssData.vectorString ?? null;
    }

    // Parse weaknesses (CWE IDs)
    const weaknesses: string[] = [];
    for (const w of vuln.weaknesses ?? []) {
      for (const d of w.description ?? []) {
        if (d.lang === 'en' && d.value) weaknesses.push(d.value);
      }
    }

    // Parse references
    const references: { url: string; tags: string[] }[] = (vuln.references ?? []).map((r: any) => ({
      url: r.url,
      tags: r.tags ?? [],
    }));

    return Response.json(
      {
        id: vuln.id,
        description,
        published: vuln.published,
        lastModified: vuln.lastModified,
        cvssV3Score,
        cvssV3Severity,
        cvssV3Vector,
        weaknesses,
        references,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      {
        error: 'Failed to fetch CVE data from NVD.',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 502, headers: corsHeaders }
    );
  }
}
