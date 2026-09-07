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

function getNetworkDetails(parsedNumber: any, clean: string) {
  let carrier = "Carrier Not Identified";
  let type = parsedNumber.getType() || "UNKNOWN";
  const country = parsedNumber.country as string;
  const countryName = COUNTRY_NAMES[country] || country;
  const isMobile = type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE';
  
  if (country === 'IN') {
    const national = parsedNumber.nationalNumber;
    const prefix = national.substring(0, 2);
    if (['98', '99', '97', '96', '95'].includes(prefix)) {
      carrier = 'Airtel / Vodafone Idea';
    } else if (['70', '79', '63', '89', '87', '91', '93', '77'].includes(prefix)) {
      carrier = 'Jio';
    } else if (['94', '84'].includes(prefix)) {
      carrier = 'BSNL';
    } else {
      carrier = 'Indian Carrier';
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
