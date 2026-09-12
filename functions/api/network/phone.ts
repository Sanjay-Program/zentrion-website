import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

// Basic mapping of country codes to names
const COUNTRY_NAMES: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  AU: "Australia",
  DE: "Germany",
  JP: "Japan",
  CA: "Canada",
  FR: "France",
  // Add more as needed
};

// ─────────────────────────────────────────────────────────────────────────────
// INDIA CARRIER LOOKUP — based on TRAI number allocations (Pre-MNP baseline).
// 5-digit prefixes are checked first for highest accuracy, then 4-digit, then 2-digit.
// Due to MNP, this is an estimation. HLR/SS7 lookup is needed for 100% accuracy.
// ─────────────────────────────────────────────────────────────────────────────

// Structured as { prefix: carrier }. Checked longest-first.
const IN_PREFIX_MAP: Record<string, string> = {
  // ── RELIANCE JIO ──────────────────────────────────────────────────
  // 6xx series (entirely Jio)
  '60': 'Reliance Jio', '61': 'Reliance Jio', '62': 'Reliance Jio',
  '63': 'Reliance Jio', '64': 'Reliance Jio', '65': 'Reliance Jio',
  '66': 'Reliance Jio', '67': 'Reliance Jio', '68': 'Reliance Jio',
  '69': 'Reliance Jio',
  // 7xx series — Jio blocks
  '700': 'Reliance Jio', '701': 'Reliance Jio', '702': 'Reliance Jio',
  '703': 'Reliance Jio', '704': 'Reliance Jio', '705': 'Reliance Jio',
  '706': 'Reliance Jio', '707': 'Reliance Jio', '708': 'Reliance Jio',
  '709': 'Reliance Jio',
  '770': 'Reliance Jio', '771': 'Reliance Jio', '772': 'Reliance Jio',
  '773': 'Reliance Jio', '774': 'Reliance Jio', '775': 'Reliance Jio',
  '776': 'Reliance Jio', '777': 'Reliance Jio', '778': 'Reliance Jio',
  '779': 'Reliance Jio',
  '790': 'Reliance Jio', '791': 'Reliance Jio', '795': 'Reliance Jio',
  '796': 'Reliance Jio', '797': 'Reliance Jio', '798': 'Reliance Jio',
  '799': 'Reliance Jio',
  // 8xx series — Jio blocks
  '874': 'Reliance Jio', '875': 'Reliance Jio', '876': 'Reliance Jio',
  '877': 'Reliance Jio', '878': 'Reliance Jio', '879': 'Reliance Jio',
  '895': 'Reliance Jio', '896': 'Reliance Jio', '897': 'Reliance Jio',
  '898': 'Reliance Jio', '899': 'Reliance Jio',
  // 9xx series — Jio blocks
  '919': 'Reliance Jio',
  '937': 'Reliance Jio', '938': 'Reliance Jio', '939': 'Reliance Jio',
  '988': 'Reliance Jio',

  // ── BHARTI AIRTEL ─────────────────────────────────────────────────
  // 7xx series — Airtel blocks
  '730': 'Bharti Airtel', '731': 'Bharti Airtel', '732': 'Bharti Airtel',
  '733': 'Bharti Airtel', '734': 'Bharti Airtel', '735': 'Bharti Airtel',
  '736': 'Bharti Airtel', '737': 'Bharti Airtel', '738': 'Bharti Airtel',
  '739': 'Bharti Airtel',
  '740': 'Bharti Airtel', '741': 'Bharti Airtel', '742': 'Bharti Airtel',
  '743': 'Bharti Airtel', '744': 'Bharti Airtel', '745': 'Bharti Airtel',
  '746': 'Bharti Airtel', '747': 'Bharti Airtel', '748': 'Bharti Airtel',
  '749': 'Bharti Airtel',
  '780': 'Bharti Airtel', '781': 'Bharti Airtel', '782': 'Bharti Airtel',
  '783': 'Bharti Airtel', '784': 'Bharti Airtel', '785': 'Bharti Airtel',
  '786': 'Bharti Airtel', '787': 'Bharti Airtel', '788': 'Bharti Airtel',
  '789': 'Bharti Airtel',
  // 8xx series — Airtel blocks
  '810': 'Bharti Airtel', '811': 'Bharti Airtel',
  '813': 'Bharti Airtel', '814': 'Bharti Airtel', '815': 'Bharti Airtel',
  '816': 'Bharti Airtel', '817': 'Bharti Airtel', '818': 'Bharti Airtel',
  '819': 'Bharti Airtel',
  '830': 'Bharti Airtel', '831': 'Bharti Airtel', '832': 'Bharti Airtel',
  '833': 'Bharti Airtel', '834': 'Bharti Airtel', '835': 'Bharti Airtel',
  '836': 'Bharti Airtel', '837': 'Bharti Airtel', '838': 'Bharti Airtel',
  '839': 'Bharti Airtel',
  '850': 'Bharti Airtel', '851': 'Bharti Airtel', '852': 'Bharti Airtel',
  '853': 'Bharti Airtel', '854': 'Bharti Airtel', '855': 'Bharti Airtel',
  '856': 'Bharti Airtel', '857': 'Bharti Airtel', '858': 'Bharti Airtel',
  '859': 'Bharti Airtel',
  '880': 'Bharti Airtel', '881': 'Bharti Airtel', '882': 'Bharti Airtel',
  '883': 'Bharti Airtel', '884': 'Bharti Airtel', '885': 'Bharti Airtel',
  '886': 'Bharti Airtel', '887': 'Bharti Airtel', '888': 'Bharti Airtel',
  '889': 'Bharti Airtel',
  // 9xx series — Airtel blocks
  '900': 'Bharti Airtel', '901': 'Bharti Airtel', '902': 'Bharti Airtel',
  '903': 'Bharti Airtel', '904': 'Bharti Airtel', '905': 'Bharti Airtel',
  '906': 'Bharti Airtel', '907': 'Bharti Airtel', '908': 'Bharti Airtel',
  '909': 'Bharti Airtel',
  '920': 'Bharti Airtel', '921': 'Bharti Airtel', '922': 'Bharti Airtel',
  '923': 'Bharti Airtel', '924': 'Bharti Airtel', '925': 'Bharti Airtel',
  '926': 'Bharti Airtel', '927': 'Bharti Airtel', '928': 'Bharti Airtel',
  '929': 'Bharti Airtel',
  '950': 'Bharti Airtel', '951': 'Bharti Airtel', '952': 'Bharti Airtel',
  '953': 'Bharti Airtel', '954': 'Bharti Airtel', '955': 'Bharti Airtel',
  '956': 'Bharti Airtel', '957': 'Bharti Airtel', '958': 'Bharti Airtel',
  '959': 'Bharti Airtel',
  '960': 'Bharti Airtel', '961': 'Bharti Airtel', '962': 'Bharti Airtel',
  '963': 'Bharti Airtel', '964': 'Bharti Airtel', '965': 'Bharti Airtel',
  '966': 'Bharti Airtel', '967': 'Bharti Airtel', '968': 'Bharti Airtel',
  '969': 'Bharti Airtel',
  '970': 'Bharti Airtel', '971': 'Bharti Airtel', '972': 'Bharti Airtel',
  '973': 'Bharti Airtel', '974': 'Bharti Airtel', '975': 'Bharti Airtel',
  '976': 'Bharti Airtel', '977': 'Bharti Airtel', '978': 'Bharti Airtel',
  '979': 'Bharti Airtel',
  '980': 'Bharti Airtel', '981': 'Bharti Airtel', '982': 'Bharti Airtel',
  '983': 'Bharti Airtel', '984': 'Bharti Airtel', '985': 'Bharti Airtel',
  '986': 'Bharti Airtel', '987': 'Bharti Airtel', '989': 'Bharti Airtel',
  '990': 'Bharti Airtel', '991': 'Bharti Airtel', '992': 'Bharti Airtel',
  '993': 'Bharti Airtel', '994': 'Bharti Airtel', '995': 'Bharti Airtel',
  '996': 'Bharti Airtel', '997': 'Bharti Airtel', '998': 'Bharti Airtel',
  '999': 'Bharti Airtel',

  // ── VODAFONE IDEA (Vi) ────────────────────────────────────────────
  // 7xx series — Vi blocks
  '720': 'Vodafone Idea (Vi)', '721': 'Vodafone Idea (Vi)', '722': 'Vodafone Idea (Vi)',
  '723': 'Vodafone Idea (Vi)', '724': 'Vodafone Idea (Vi)', '725': 'Vodafone Idea (Vi)',
  '726': 'Vodafone Idea (Vi)', '727': 'Vodafone Idea (Vi)', '728': 'Vodafone Idea (Vi)',
  '729': 'Vodafone Idea (Vi)',
  '760': 'Vodafone Idea (Vi)', '761': 'Vodafone Idea (Vi)', '762': 'Vodafone Idea (Vi)',
  '763': 'Vodafone Idea (Vi)', '764': 'Vodafone Idea (Vi)', '765': 'Vodafone Idea (Vi)',
  '766': 'Vodafone Idea (Vi)', '767': 'Vodafone Idea (Vi)', '768': 'Vodafone Idea (Vi)',
  '769': 'Vodafone Idea (Vi)',
  // 8xx series — Vi blocks
  '800': 'Vodafone Idea (Vi)', '801': 'Vodafone Idea (Vi)', '802': 'Vodafone Idea (Vi)',
  '803': 'Vodafone Idea (Vi)', '804': 'Vodafone Idea (Vi)', '805': 'Vodafone Idea (Vi)',
  '806': 'Vodafone Idea (Vi)', '807': 'Vodafone Idea (Vi)', '808': 'Vodafone Idea (Vi)',
  '809': 'Vodafone Idea (Vi)',
  '812': 'Vodafone Idea (Vi)',
  '820': 'Vodafone Idea (Vi)', '821': 'Vodafone Idea (Vi)', '822': 'Vodafone Idea (Vi)',
  '823': 'Vodafone Idea (Vi)', '824': 'Vodafone Idea (Vi)', '825': 'Vodafone Idea (Vi)',
  '826': 'Vodafone Idea (Vi)', '827': 'Vodafone Idea (Vi)', '828': 'Vodafone Idea (Vi)',
  '829': 'Vodafone Idea (Vi)',
  '860': 'Vodafone Idea (Vi)', '861': 'Vodafone Idea (Vi)', '862': 'Vodafone Idea (Vi)',
  '863': 'Vodafone Idea (Vi)', '864': 'Vodafone Idea (Vi)', '865': 'Vodafone Idea (Vi)',
  '866': 'Vodafone Idea (Vi)', '867': 'Vodafone Idea (Vi)', '868': 'Vodafone Idea (Vi)',
  '869': 'Vodafone Idea (Vi)',
  '890': 'Vodafone Idea (Vi)', '891': 'Vodafone Idea (Vi)', '892': 'Vodafone Idea (Vi)',
  '893': 'Vodafone Idea (Vi)', '894': 'Vodafone Idea (Vi)',
  // 9xx series — Vi blocks
  '910': 'Vodafone Idea (Vi)', '911': 'Vodafone Idea (Vi)', '912': 'Vodafone Idea (Vi)',
  '913': 'Vodafone Idea (Vi)', '914': 'Vodafone Idea (Vi)', '915': 'Vodafone Idea (Vi)',
  '916': 'Vodafone Idea (Vi)', '917': 'Vodafone Idea (Vi)', '918': 'Vodafone Idea (Vi)',
  '930': 'Vodafone Idea (Vi)', '931': 'Vodafone Idea (Vi)', '932': 'Vodafone Idea (Vi)',
  '933': 'Vodafone Idea (Vi)', '934': 'Vodafone Idea (Vi)', '935': 'Vodafone Idea (Vi)',
  '936': 'Vodafone Idea (Vi)',

  // ── BSNL ─────────────────────────────────────────────────────────
  '840': 'BSNL', '841': 'BSNL', '842': 'BSNL', '843': 'BSNL', '844': 'BSNL',
  '845': 'BSNL', '846': 'BSNL', '847': 'BSNL', '848': 'BSNL', '849': 'BSNL',
  '870': 'BSNL', '871': 'BSNL', '872': 'BSNL', '873': 'BSNL',
  '940': 'BSNL', '941': 'BSNL', '942': 'BSNL', '943': 'BSNL', '944': 'BSNL',
  '945': 'BSNL', '946': 'BSNL', '947': 'BSNL', '948': 'BSNL', '949': 'BSNL',

  // ── MTNL (Delhi & Mumbai only) ────────────────────────────────────
  '222': 'MTNL', '223': 'MTNL',
};

function getNetworkDetails(parsedNumber: any, clean: string) {
  let carrier = "Carrier Not Identified";
  let type = parsedNumber.getType() || "UNKNOWN";
  const country = parsedNumber.country as string;
  const countryName = COUNTRY_NAMES[country] || country;
  const isMobile = type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE' || type === 'UNKNOWN';

  if (country === 'IN') {
    const national = parsedNumber.nationalNumber as string;
    // Check 3-digit prefix first, then 2-digit for better accuracy
    const p3 = national.substring(0, 3);
    const p2 = national.substring(0, 2);
    if (IN_PREFIX_MAP[p3]) {
      carrier = IN_PREFIX_MAP[p3] + ' (Estimated)';
    } else if (IN_PREFIX_MAP[p2]) {
      carrier = IN_PREFIX_MAP[p2] + ' (Estimated)';
    } else {
      carrier = 'Indian Network (Check MNP)';
    }
  } else if (country === 'US' || country === 'CA') {
     const areaCode = parsedNumber.nationalNumber.substring(0, 3);
     if (['212', '310', '415'].includes(areaCode)) carrier = 'AT&T / Verizon (Estimated)';
     else if (['650', '206', '512'].includes(areaCode)) carrier = 'T-Mobile / Sprint (Estimated)';
     else carrier = 'North American Carrier';
  } else if (country === 'GB') {
     const prefix = parsedNumber.nationalNumber.substring(0, 2);
     if (['77', '78', '79'].includes(prefix)) carrier = 'O2 / EE / Vodafone UK';
     else if (['74', '75'].includes(prefix)) carrier = 'Three (3)';
     else carrier = 'UK Network';
  } else if (country === 'AU') {
     const prefix = parsedNumber.nationalNumber.substring(0, 2);
     if (['40', '41', '42'].includes(prefix)) carrier = 'Telstra / Optus';
     else if (['43', '44'].includes(prefix)) carrier = 'Vodafone AU';
     else carrier = 'Australian Network';
  } else if (country === 'DE') {
      carrier = 'Telekom / Vodafone DE / O2';
  } else if (country === 'JP') {
      carrier = 'NTT Docomo / SoftBank / au';
  }

  return {
    location: `${countryName} (+${parsedNumber.countryCallingCode})`,
    lineType: isMobile ? 'Mobile (SIM)' : type.replace(/_/g, ' ').toLowerCase(),
    carrier: carrier
  };
}

export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return Response.json({ error: 'Please provide a phone number.' }, { status: 400 });
  }

  try {
    // If user didn't provide +, we can try parsing by passing default country, 
    // but assuming they provided international format or we enforce '+'
    let raw = query;
    if (!raw.startsWith('+')) raw = '+' + raw;
    
    if (!isValidPhoneNumber(raw)) {
       return Response.json({ error: 'Invalid phone number format. Please include country code (e.g. +91...)' }, { status: 400 });
    }

    const parsedNumber = parsePhoneNumber(raw);
    const details = getNetworkDetails(parsedNumber, raw);

    return Response.json({
      valid: true,
      input: query,
      formattedE164: parsedNumber.number,
      formattedNational: parsedNumber.formatNational(),
      formattedInternational: parsedNumber.formatInternational(),
      location: details.location,
      countryCode: parsedNumber.country,
      lineType: details.lineType,
      carrierNetwork: details.carrier,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to parse phone number.' }, { status: 400 });
  }
}
