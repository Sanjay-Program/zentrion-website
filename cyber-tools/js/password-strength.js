document.addEventListener('DOMContentLoaded', () => {
  const pwdInput = document.getElementById('pwd-input');
  const toggleBtn = document.getElementById('toggle-pwd');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  const charCount = document.getElementById('char-count');

  toggleBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      toggleBtn.textContent = 'Hide';
    } else {
      pwdInput.type = 'password';
      toggleBtn.textContent = 'Show';
    }
  });

  pwdInput.addEventListener('input', analyzePassword);

  function analyzePassword() {
    const pwd = pwdInput.value;
    charCount.textContent = `${pwd.length} characters`;

    if (pwd.length === 0) {
      resetUI();
      return;
    }

    let pool = 0;
    let hasUpper = false, hasLower = false, hasNum = false, hasSym = false;

    if (/[a-z]/.test(pwd)) { pool += 26; hasLower = true; }
    if (/[A-Z]/.test(pwd)) { pool += 26; hasUpper = true; }
    if (/[0-9]/.test(pwd)) { pool += 10; hasNum = true; }
    if (/[^a-zA-Z0-9]/.test(pwd)) { pool += 32; hasSym = true; }

    const entropy = pool > 0 ? pwd.length * Math.log2(pool) : 0;
    
    // Pattern checks
    const repeated = /(.)\1{2,}/.test(pwd); // 3+ identical chars
    const seq = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890|012)/i.test(pwd) || /(qwerty|asdf|zxcv)/i.test(pwd);

    // Adjust entropy based on poor patterns
    let effectiveEntropy = entropy;
    if (repeated) effectiveEntropy -= 10;
    if (seq) effectiveEntropy -= 15;
    if (effectiveEntropy < 0) effectiveEntropy = 0;

    updateUI(pwd, pool, effectiveEntropy, hasUpper, hasLower, hasNum, hasSym, repeated, seq);
  }

  function resetUI() {
    strengthBar.style.width = '0%';
    strengthText.textContent = 'Enter a password';
    strengthText.style.color = 'var(--c-mute)';
    document.getElementById('res-entropy').textContent = '0 bits';
    document.getElementById('res-pool').textContent = '0';
    document.getElementById('res-len').textContent = '0';
    document.getElementById('res-upper').textContent = '0';
    document.getElementById('res-lower').textContent = '0';
    document.getElementById('res-num').textContent = '0';
    document.getElementById('res-sym').textContent = '0';
    document.getElementById('res-rep').textContent = 'No';
    document.getElementById('res-seq').textContent = 'No';
  }

  function updateUI(pwd, pool, entropy, hasUpper, hasLower, hasNum, hasSym, repeated, seq) {
    let strength = 'Very Weak';
    let color = 'var(--c-danger)';
    let width = 20;

    if (entropy > 80) { strength = 'Very Strong'; color = '#4ade80'; width = 100; }
    else if (entropy > 60) { strength = 'Strong'; color = '#16a34a'; width = 80; }
    else if (entropy > 40) { strength = 'Fair'; color = '#fbbf24'; width = 60; }
    else if (entropy > 25) { strength = 'Weak'; color = '#f97316'; width = 40; }

    strengthBar.style.width = `${width}%`;
    strengthBar.style.background = color;
    strengthText.textContent = strength;
    strengthText.style.color = color;

    document.getElementById('res-entropy').textContent = `${entropy.toFixed(1)} bits`;
    document.getElementById('res-pool').textContent = pool;
    document.getElementById('res-len').textContent = pwd.length;
    document.getElementById('res-upper').textContent = (pwd.match(/[A-Z]/g) || []).length;
    document.getElementById('res-lower').textContent = (pwd.match(/[a-z]/g) || []).length;
    document.getElementById('res-num').textContent = (pwd.match(/[0-9]/g) || []).length;
    document.getElementById('res-sym').textContent = (pwd.match(/[^a-zA-Z0-9]/g) || []).length;
    
    document.getElementById('res-rep').textContent = repeated ? 'Yes (Penalty applied)' : 'No';
    document.getElementById('res-rep').style.color = repeated ? 'var(--c-danger)' : 'var(--c-ink)';
    
    document.getElementById('res-seq').textContent = seq ? 'Yes (Penalty applied)' : 'No';
    document.getElementById('res-seq').style.color = seq ? 'var(--c-danger)' : 'var(--c-ink)';
  }
});
