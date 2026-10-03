self.onmessage = async function(e) {
  const { targetHash, dictionary } = e.data;
  
  self.postMessage({ type: 'status', message: 'Worker started. Hashing dictionary...' });

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  let attempts = 0;
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    const hash = await sha256(word);
    attempts++;
    
    // Every 100 attempts, post progress so UI can update smoothly
    if (attempts % 100 === 0) {
      self.postMessage({ type: 'progress', attempts, currentWord: word });
    }

    if (hash === targetHash) {
      self.postMessage({ type: 'success', match: word, attempts });
      return;
    }
  }

  self.postMessage({ type: 'complete', attempts, found: false });
};
