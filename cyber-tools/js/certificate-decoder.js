document.addEventListener('DOMContentLoaded', () => {
  const certInput = document.getElementById('cert-input');
  const decodeBtn = document.getElementById('decode-btn');
  const clearBtn = document.getElementById('clear-btn');
  const resultBox = document.getElementById('result-box');

  clearBtn.addEventListener('click', () => {
    certInput.value = '';
    CyberUtils.clearResults(resultBox);
  });

  decodeBtn.addEventListener('click', async () => {
    try {
      const pem = certInput.value.trim();
      if (!pem) throw new Error("Please paste a PEM certificate.");

      if (!pem.includes('-----BEGIN CERTIFICATE-----')) {
        throw new Error("Invalid PEM format. Missing -----BEGIN CERTIFICATE-----");
      }

      const b64 = pem.replace(/-----BEGIN CERTIFICATE-----/g, '')
                     .replace(/-----END CERTIFICATE-----/g, '')
                     .replace(/\s+/g, '');
                     
      const der = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

      // Calculate SHA-256 fingerprint
      const hashBuffer = await crypto.subtle.digest('SHA-256', der);
      const fingerprint = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0').toUpperCase())
        .join(':');

      // Basic ASN.1 DER Parser for X.509
      let offset = 0;
      
      function readLength() {
        let len = der[offset++];
        if (len & 0x80) {
          const numBytes = len & 0x7F;
          len = 0;
          for (let i = 0; i < numBytes; i++) {
            len = (len << 8) | der[offset++];
          }
        }
        return len;
      }

      function readTag() {
        return der[offset++];
      }

      // X.509 structure: SEQUENCE { tbsCertificate, signatureAlgorithm, signatureValue }
      const seqTag = readTag();
      if (seqTag !== 0x30) throw new Error("Invalid certificate: does not start with SEQUENCE");
      readLength(); // sequence length

      // tbsCertificate
      const tbsTag = readTag();
      if (tbsTag !== 0x30) throw new Error("Invalid certificate: no tbsCertificate");
      readLength(); // tbs len

      // We will extract strings by just scanning the DER payload for printable strings 
      // (PrintableString 0x13, UTF8String 0x0C, IA5String 0x16)
      // and finding dates (UTCTime 0x17, GeneralizedTime 0x18).
      // This is a heuristic approach suitable for client-side without a full 10MB ASN.1 library.
      
      const strings = [];
      const dates = [];
      
      for(let i=0; i<der.length - 2; i++) {
        const t = der[i];
        if (t === 0x13 || t === 0x0C || t === 0x16) {
          const l = der[i+1];
          if (l > 0 && l < 100 && i + 2 + l <= der.length) {
            let str = '';
            let valid = true;
            for (let j=0; j<l; j++) {
              const charCode = der[i+2+j];
              if (charCode < 32 || charCode > 126) { valid = false; break; }
              str += String.fromCharCode(charCode);
            }
            if (valid && str.length > 2) strings.push(str);
          }
        }
        
        if (t === 0x17) { // UTCTime
          const l = der[i+1];
          if (l === 13) {
            let str = '';
            for (let j=0; j<l; j++) str += String.fromCharCode(der[i+2+j]);
            if (str.endsWith('Z')) {
              // YYMMDDHHMMSSZ
              let yr = parseInt(str.substring(0,2));
              yr += (yr < 50) ? 2000 : 1900;
              dates.push(new Date(Date.UTC(yr, parseInt(str.substring(2,4))-1, parseInt(str.substring(4,6)), parseInt(str.substring(6,8)), parseInt(str.substring(8,10)), parseInt(str.substring(10,12)))));
            }
          }
        }
      }

      let expirationHtml = 'Unknown';
      let notBefore = dates.length > 0 ? dates[0] : null;
      let notAfter = dates.length > 1 ? dates[1] : (dates.length === 1 ? dates[0] : null);

      if (notAfter) {
        const now = new Date();
        const diffDays = Math.ceil((notAfter - now) / (1000 * 60 * 60 * 24));
        if (now > notAfter) {
          expirationHtml = `<span style="color: var(--c-danger); font-weight: bold;">Expired</span> (was valid until ${notAfter.toISOString()})`;
        } else if (notBefore && now < notBefore) {
          expirationHtml = `<span style="color: var(--c-warning); font-weight: bold;">Not yet valid</span> (valid from ${notBefore.toISOString()})`;
        } else {
          expirationHtml = `<span style="color: var(--c-success); font-weight: bold;">Valid</span> (Expires in ${diffDays} days, on ${notAfter.toISOString()})`;
        }
      }

      resultBox.classList.remove('empty');
      resultBox.innerHTML = `
        <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">Certificate Details</h4>
        <table style="width: 100%; word-break: break-all;">
          <tr><td style="width: 25%;">SHA-256 Fingerprint</td><td style="font-family: var(--font-mono); color: var(--c-accent);">${fingerprint}</td></tr>
          <tr><td>Status</td><td>${expirationHtml}</td></tr>
          <tr><td>Extracted Text Entities<br><span style="font-size:0.75rem; color:var(--c-mute);">(Subject/Issuer details)</span></td><td><ul style="list-style: none; margin: 0; padding: 0;">${strings.map(s => `<li>${CyberUtils.escapeHTML(s)}</li>`).join('')}</ul></td></tr>
        </table>
        <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--c-mute);">* Uses a heuristic ASN.1 parser. Does NOT verify trust chain or signature validity.</p>
      `;

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    }
  });
});
