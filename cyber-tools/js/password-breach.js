document.addEventListener('DOMContentLoaded', () => {
  const pwdInput = document.getElementById('pwd-input');
  const toggleBtn = document.getElementById('toggle-pwd');
  const checkBtn = document.getElementById('check-btn');
  const resultBox = document.getElementById('result-box');

  toggleBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      toggleBtn.textContent = 'Hide';
    } else {
      pwdInput.type = 'password';
      toggleBtn.textContent = 'Show';
    }
  });

  checkBtn.addEventListener('click', checkBreach);

  async function checkBreach() {
    const pwd = pwdInput.value;
    if (!CyberUtils.validateInput(pwd)) {
      CyberUtils.showToast("Please enter a password.", "error");
      return;
    }

    if (!navigator.onLine) {
      CyberUtils.showError(resultBox, "Browser is offline.");
      return;
    }

    CyberUtils.setLoading(checkBtn, true, 'Check Breach Database');
    CyberUtils.clearResults(resultBox, 'Checking...');

    try {
      const msgBuffer = new TextEncoder().encode(pwd);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limited by API. Please wait.");
        }
        throw new Error(`API returned status ${response.status}`);
      }

      const text = await response.text();
      const lines = text.split('\n');
      
      let foundCount = 0;
      for (const line of lines) {
        const parts = line.split(':');
        if (parts[0] === suffix) {
          foundCount = parseInt(parts[1].trim(), 10);
          break;
        }
      }

      resultBox.classList.remove('empty');
      if (foundCount > 0) {
        resultBox.innerHTML = `
          <h4 style="color: var(--c-danger); margin-bottom: 0.5rem;">⚠️ Password found in breaches: YES</h4>
          <p>Times seen: <strong>${foundCount.toLocaleString()}</strong></p>
          <p style="margin-top: 1rem; color: var(--c-mute); font-size: 0.85rem;">This password has previously appeared in a data breach and should never be used.</p>
        `;
      } else {
        resultBox.innerHTML = `
          <h4 style="color: var(--c-success); margin-bottom: 0.5rem;">✅ Password found in breaches: NO</h4>
          <p>Times seen: <strong>0</strong></p>
          <p style="margin-top: 1rem; color: var(--c-mute); font-size: 0.85rem;">No match was returned by the breach corpus queried.</p>
        `;
      }

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    } finally {
      CyberUtils.setLoading(checkBtn, false);
    }
  }
});
