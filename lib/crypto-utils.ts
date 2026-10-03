'use client';

// Generate a new ECDSA key pair
export async function generateKeyPair() {
  return await window.crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"]
  );
}

// Export the public key to JWK (JSON Web Key) format for sharing
export async function exportPublicKey(key: CryptoKey) {
  return await window.crypto.subtle.exportKey("jwk", key);
}

// Sign data with the private key
export async function signData(privateKey: CryptoKey, data: any) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  const signatureBuffer = await window.crypto.subtle.sign(
    { name: "ECDSA", hash: { name: "SHA-256" } },
    privateKey,
    encodedData
  );
  
  // Convert ArrayBuffer to Base64
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  return btoa(String.fromCharCode.apply(null, signatureArray));
}

// Verify a signature using the public key (JWK)
export async function verifySignature(publicKeyJwk: JsonWebKey, data: any, signatureBase64: string) {
  try {
    const publicKey = await window.crypto.subtle.importKey(
      "jwk",
      publicKeyJwk,
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["verify"]
    );

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));
    
    // Convert Base64 back to ArrayBuffer
    const binaryString = atob(signatureBase64);
    const signatureArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      signatureArray[i] = binaryString.charCodeAt(i);
    }

    return await window.crypto.subtle.verify(
      { name: "ECDSA", hash: { name: "SHA-256" } },
      publicKey,
      signatureArray.buffer,
      encodedData
    );
  } catch (e) {
    return false;
  }
}
