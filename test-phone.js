const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');

const COUNTRY_NAMES = { IN: "India" };

function getNetworkDetails(parsedNumber, clean) {
  let carrier = "Carrier Not Identified";
  let type = parsedNumber.getType() || "UNKNOWN";
  const country = parsedNumber.country;
  const countryName = COUNTRY_NAMES[country] || country;
  const isMobile = type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE';
  
  if (country === 'IN') {
    const national = parsedNumber.nationalNumber;
    const p2 = national.substring(0, 2);
    const p3 = national.substring(0, 3);
    const p4 = national.substring(0, 4);
    
    // Explicit Jio Prefixes
    const jio4 = ['8072', '8079', '8073'];
    const jio2 = ['70', '79', '63', '89', '87', '91', '93', '77', '60', '61', '62', '66', '67', '68', '69'];
    
    // Explicit Airtel Prefixes
    const airtel4 = ['7305', '7339', '7358', '7373', '7397'];
    const airtel2 = ['98', '99', '97', '96', '95', '72', '74', '78', '81', '83', '85', '88', '90', '92'];
    
    // BSNL
    const bsnl = ['94', '84'];

    if (airtel4.includes(p4) || airtel2.includes(p2)) {
      carrier = 'Bharti Airtel';
    } else if (jio4.includes(p4) || jio2.includes(p2)) {
      carrier = 'Reliance Jio';
    } else if (bsnl.includes(p2)) {
      carrier = 'BSNL';
    } else if (['80', '82', '86', '75', '76'].includes(p2)) {
      carrier = 'Vodafone Idea (Vi)';
    } else {
      carrier = 'Indian Telecom Network';
    }
  }

  return {
    location: `${countryName} (+${parsedNumber.countryCallingCode})`,
    lineType: isMobile ? 'Mobile (SIM)' : type.replace(/_/g, ' ').toLowerCase(),
    carrier: carrier
  };
}

const num = parsePhoneNumber('+917305771789');
console.log(getNetworkDetails(num, '+917305771789'));
