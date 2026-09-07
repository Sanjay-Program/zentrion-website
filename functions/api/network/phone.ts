
function inferCarrier(clean: string) {
  if (clean.startsWith('+91')) {
    const prefix = clean.substring(3, 5);
    if (['98', '99', '97', '96', '95'].includes(prefix)) {
      return { country: 'India (+91)', carrier: 'Airtel / Vodafone Idea' };
    }
    if (['70', '79', '63', '89'].includes(prefix)) {
      return { country: 'India (+91)', carrier: 'Jio' };
    }
    if (['94', '84'].includes(prefix)) {
      return { country: 'India (+91)', carrier: 'BSNL' };
    }
    return { country: 'India (+91)', carrier: 'Unknown Indian Carrier' };
  }

  if (clean.startsWith('+1')) {
    const areaCode = clean.substring(2, 5);
    if (['212', '310', '415'].includes(areaCode)) {
      return { country: 'US / Canada (+1)', carrier: 'AT&T / Verizon' };
    }
    if (['650', '206', '512'].includes(areaCode)) {
      return { country: 'US / Canada (+1)', carrier: 'T-Mobile / Sprint' };
    }
    return { country: 'US / Canada (+1)', carrier: 'North American Carrier' };
  }

  if (clean.startsWith('+44')) {
    const prefix = clean.substring(3, 5);
    if (['77', '78', '79'].includes(prefix)) {
      return { country: 'United Kingdom (+44)', carrier: 'O2 / EE / Vodafone UK' };
    }
    if (['74', '75'].includes(prefix)) {
      return { country: 'United Kingdom (+44)', carrier: 'Three (3)' };
    }
    return { country: 'United Kingdom (+44)', carrier: 'UK Network' };
  }

  if (clean.startsWith('+61')) {
    const prefix = clean.substring(3, 5);
    if (['40', '41', '42'].includes(prefix)) {
      return { country: 'Australia (+61)', carrier: 'Telstra / Optus' };
    }
    if (['43', '44'].includes(prefix)) {
      return { country: 'Australia (+61)', carrier: 'Vodafone AU' };
    }
    return { country: 'Australia (+61)', carrier: 'Australian Network' };
  }

  if (clean.startsWith('+49')) {
    return { country: 'Germany (+49)', carrier: 'Telekom / Vodafone DE / O2' };
  }

  if (clean.startsWith('+81')) {
    return { country: 'Japan (+81)', carrier: 'NTT Docomo / SoftBank / au' };
  }

  return { country: 'Unknown Region', carrier: 'Carrier Not Identified' };
}

export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return Response.json({ error: 'Please provide a phone number.' }, { status: 400 });
  }

  const raw = query;
  let clean = raw.replace(/[\s\-().]/g, '');
  const valid = /^\+?[1-9]\d{1,14}$/.test(clean);
  if (!clean.startsWith('+')) clean = `+${clean}`;
  const inference = inferCarrier(clean);

  return Response.json({
    valid,
    input: raw,
    cleanFormat: clean,
    country: inference.country,
    carrier: inference.carrier,
    numberLength: clean.startsWith('+') ? clean.length - 1 : clean.length,
    timestamp: new Date().toISOString(),
    source: 'Local Algorithmic Inference',
    inferenceMethod: 'prefix-based estimation (not HLR/MNP verification)',
  });
}
