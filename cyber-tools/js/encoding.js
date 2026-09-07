document.addEventListener('DOMContentLoaded', () => {
  const encType = document.getElementById('enc-type');
  const encInput = document.getElementById('enc-input');
  const encOutput = document.getElementById('enc-output');
  const encodeBtn = document.getElementById('encode-btn');
  const decodeBtn = document.getElementById('decode-btn');
  const swapBtn = document.getElementById('swap-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');

  copyBtn.addEventListener('click', () => {
    if (encOutput.value) CyberUtils.copyToClipboard(encOutput.value);
  });

  clearBtn.addEventListener('click', () => {
    encInput.value = '';
    encOutput.value = '';
  });

  swapBtn.addEventListener('click', () => {
    const temp = encInput.value;
    encInput.value = encOutput.value;
    encOutput.value = temp;
  });

  encodeBtn.addEventListener('click', () => {
    try {
      const type = encType.value;
      const text = encInput.value;
      if (!text) return;

      let res = '';
      if (type === 'base64') {
        res = btoa(unescape(encodeURIComponent(text)));
      } else if (type === 'url') {
        res = encodeURIComponent(text);
      } else if (type === 'html') {
        const div = document.createElement('div');
        div.textContent = text;
        res = div.innerHTML;
      } else if (type === 'hex') {
        res = Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2, '0')).join(' ');
      } else if (type === 'binary') {
        res = Array.from(new TextEncoder().encode(text)).map(b => b.toString(2).padStart(8, '0')).join(' ');
      }
      encOutput.value = res;
    } catch (e) {
      CyberUtils.showToast("Encoding Error: " + e.message, "error");
    }
  });

  decodeBtn.addEventListener('click', () => {
    try {
      const type = encType.value;
      const text = encOutput.value; // Decode from Output back to Input ? Actually Decode button usually decodes Input to Output. 
      // Wait, standard UI: Encode -> Input to Output. Decode -> Input to Output.
      // Let's decode from encInput -> encOutput.
      const src = encInput.value;
      if (!src) return;

      let res = '';
      if (type === 'base64') {
        res = decodeURIComponent(escape(atob(src)));
      } else if (type === 'url') {
        res = decodeURIComponent(src);
      } else if (type === 'html') {
        const doc = new DOMParser().parseFromString(src, "text/html");
        res = doc.documentElement.textContent;
      } else if (type === 'hex') {
        const hex = src.replace(/[^0-9a-fA-F]/g, '');
        if (hex.length % 2 !== 0) throw new Error("Invalid hex length");
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        res = new TextDecoder().decode(bytes);
      } else if (type === 'binary') {
        const bin = src.replace(/[^01]/g, '');
        if (bin.length % 8 !== 0) throw new Error("Invalid binary length");
        const bytes = new Uint8Array(bin.length / 8);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(bin.substr(i * 8, 8), 2);
        }
        res = new TextDecoder().decode(bytes);
      }
      encOutput.value = res;
    } catch (e) {
      CyberUtils.showToast("Decoding Error: " + e.message, "error");
    }
  });
});
