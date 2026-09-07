document.addEventListener('DOMContentLoaded', () => {
  const jwtInput = document.getElementById('jwt-input');
  const decodeBtn = document.getElementById('decode-btn');
  const clearBtn = document.getElementById('clear-btn');
  const resultBox = document.getElementById('result-box');

  clearBtn.addEventListener('click', () => {
    jwtInput.value = '';
    CyberUtils.clearResults(resultBox);
  });

  decodeBtn.addEventListener('click', () => {
    const token = jwtInput.value.trim();
    if (!token) {
      CyberUtils.showToast("Please enter a JWT.", "error");
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Must contain exactly 3 parts separated by dots.");
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      
      let warnings = [];
      if (header.alg === 'none' || header.alg === 'NONE') {
        warnings.push("⚠️ WARNING: Algorithm is set to 'none'. This token is insecure.");
      }

      const now = Math.floor(Date.now() / 1000);
      
      let expText = "Not present";
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const isExpired = payload.exp < now;
        if (isExpired) warnings.push("⚠️ WARNING: Token has expired.");
        expText = `${expDate.toISOString()} (${isExpired ? 'Expired' : 'Valid'})`;
      }

      let nbfText = "Not present";
      if (payload.nbf) {
        const nbfDate = new Date(payload.nbf * 1000);
        const notActive = payload.nbf > now;
        if (notActive) warnings.push("⚠️ WARNING: Token is not active yet (nbf).");
        nbfText = `${nbfDate.toISOString()} (${notActive ? 'Not active' : 'Active'})`;
      }
      
      if (payload.exp && payload.iat && (payload.exp - payload.iat > 31536000)) {
        warnings.push("⚠️ WARNING: Unusually long expiration time (> 1 year).");
      }

      let html = '';
      if (warnings.length > 0) {
        html += `<div style="background: rgba(220, 38, 38, 0.2); padding: 1rem; border-radius: 6px; border: 1px solid var(--c-danger); margin-bottom: 1rem; color: #fca5a5;">
          ${warnings.join('<br>')}
        </div>`;
      }

      html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">Header (Decoded)</h4>
          <pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 6px; overflow-x: auto; color: var(--c-accent);">${CyberUtils.escapeHTML(JSON.stringify(header, null, 2))}</pre>
        </div>
        <div>
          <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">Payload (Decoded)</h4>
          <pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 6px; overflow-x: auto; color: #4ade80;">${CyberUtils.escapeHTML(JSON.stringify(payload, null, 2))}</pre>
        </div>
      </div>`;

      html += `<h4 style="color: var(--c-mute); margin-top: 1.5rem; margin-bottom: 0.5rem;">Time Claims</h4>
      <table style="width: 100%;">
        <tr><td>EXP (Expiration)</td><td>${expText}</td></tr>
        <tr><td>NBF (Not Before)</td><td>${nbfText}</td></tr>
        <tr><td>IAT (Issued At)</td><td>${payload.iat ? new Date(payload.iat * 1000).toISOString() : 'Not present'}</td></tr>
      </table>`;

      resultBox.classList.remove('empty');
      resultBox.innerHTML = html;

    } catch (err) {
      CyberUtils.showError(resultBox, "Decoding failed: " + err.message);
    }
  });

  function base64UrlDecode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: break;
      case 2: output += '=='; break;
      case 3: output += '='; break;
      default: throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent(atob(output).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
});
