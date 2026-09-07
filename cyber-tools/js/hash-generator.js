document.addEventListener('DOMContentLoaded', () => {
  const modeTextBtn = document.getElementById('mode-text');
  const modeFileBtn = document.getElementById('mode-file');
  const textInputGroup = document.getElementById('text-input-group');
  const fileInputGroup = document.getElementById('file-input-group');
  
  const hashText = document.getElementById('hash-text');
  const hashFile = document.getElementById('hash-file');
  const hashAlgo = document.getElementById('hash-algo');
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const resultBox = document.getElementById('result-box');

  let mode = 'text';

  modeTextBtn.addEventListener('click', () => {
    mode = 'text';
    modeTextBtn.classList.remove('btn-ghost');
    modeFileBtn.classList.add('btn-ghost');
    textInputGroup.style.display = 'block';
    fileInputGroup.style.display = 'none';
  });

  modeFileBtn.addEventListener('click', () => {
    mode = 'file';
    modeFileBtn.classList.remove('btn-ghost');
    modeTextBtn.classList.add('btn-ghost');
    fileInputGroup.style.display = 'block';
    textInputGroup.style.display = 'none';
  });

  clearBtn.addEventListener('click', () => {
    hashText.value = '';
    hashFile.value = '';
    CyberUtils.clearResults(resultBox);
  });

  generateBtn.addEventListener('click', async () => {
    try {
      const algo = hashAlgo.value;
      CyberUtils.setLoading(generateBtn, true, 'Generate Hash');

      let buffer;
      let inputSize = 0;

      if (mode === 'text') {
        if (!hashText.value) throw new Error("Please enter some text.");
        buffer = new TextEncoder().encode(hashText.value);
        inputSize = buffer.byteLength;
      } else {
        if (!hashFile.files || hashFile.files.length === 0) throw new Error("Please select a file.");
        const file = hashFile.files[0];
        inputSize = file.size;
        buffer = await file.arrayBuffer();
      }

      const hashBuffer = await crypto.subtle.digest(algo, buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      resultBox.classList.remove('empty');
      resultBox.innerHTML = `
        <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">Result (${algo})</h4>
        <div style="font-size: 1.1rem; color: var(--c-accent); word-break: break-all; margin-bottom: 1rem;" id="hash-output">${hashHex}</div>
        <p style="font-size: 0.85rem; color: var(--c-mute); margin-bottom: 1rem;">Input Size: ${CyberUtils.formatBytes(inputSize)}</p>
        <div style="display: flex; gap: 0.5rem;">
          <button id="copy-hash" class="btn btn-small">Copy Hash</button>
          <button id="dl-hash" class="btn btn-ghost btn-small">Download</button>
        </div>
      `;

      document.getElementById('copy-hash').addEventListener('click', () => {
        CyberUtils.copyToClipboard(hashHex);
      });

      document.getElementById('dl-hash').addEventListener('click', () => {
        CyberUtils.downloadText(`hash_${algo.toLowerCase()}.txt`, hashHex);
      });

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    } finally {
      CyberUtils.setLoading(generateBtn, false);
    }
  });
});
