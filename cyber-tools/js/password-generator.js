document.addEventListener('DOMContentLoaded', () => {
  const lenInput = document.getElementById('pwd-len');
  const lenVal = document.getElementById('len-val');
  const chkUpper = document.getElementById('chk-upper');
  const chkLower = document.getElementById('chk-lower');
  const chkNum = document.getElementById('chk-num');
  const chkSym = document.getElementById('chk-sym');
  const chkAmb = document.getElementById('chk-amb');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const pwdDisplay = document.getElementById('generated-pwd');

  const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLower = "abcdefghijklmnopqrstuvwxyz";
  const charsNum = "0123456789";
  const charsSym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const ambiguous = "il1Lo0O";

  lenInput.addEventListener('input', () => {
    lenVal.textContent = lenInput.value;
  });

  generateBtn.addEventListener('click', generatePassword);
  
  copyBtn.addEventListener('click', () => {
    const pwd = pwdDisplay.textContent;
    if (pwd && pwd !== 'Click generate...') {
      CyberUtils.copyToClipboard(pwd);
    }
  });

  function generatePassword() {
    let pool = "";
    let activeSets = [];
    if (chkUpper.checked) { pool += charsUpper; activeSets.push("Upper"); }
    if (chkLower.checked) { pool += charsLower; activeSets.push("Lower"); }
    if (chkNum.checked) { pool += charsNum; activeSets.push("Num"); }
    if (chkSym.checked) { pool += charsSym; activeSets.push("Sym"); }

    if (pool === "") {
      CyberUtils.showToast("Please select at least one character set.", "error");
      return;
    }

    if (chkAmb.checked) {
      const arr = pool.split('');
      pool = arr.filter(c => !ambiguous.includes(c)).join('');
    }

    const length = parseInt(lenInput.value, 10);
    const pwdArray = new Uint8Array(length);
    crypto.getRandomValues(pwdArray);
    
    let password = "";
    // Rejection sampling for uniform distribution
    const maxValid = 256 - (256 % pool.length);
    
    let i = 0;
    while(i < length) {
      const randomArr = new Uint8Array(1);
      crypto.getRandomValues(randomArr);
      if (randomArr[0] < maxValid) {
        password += pool[randomArr[0] % pool.length];
        i++;
      }
    }

    pwdDisplay.textContent = password;

    // Update Info
    document.getElementById('info-len').textContent = length;
    document.getElementById('info-sets').textContent = activeSets.join(', ');
    const entropy = length * Math.log2(pool.length);
    document.getElementById('info-entropy').textContent = `${entropy.toFixed(1)} bits`;
  }

  // Initial generate
  generatePassword();
});
