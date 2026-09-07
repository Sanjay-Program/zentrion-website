document.addEventListener('DOMContentLoaded', () => {
  const cidrInput = document.getElementById('cidr-input');
  const calcBtn = document.getElementById('calc-btn');
  const resultBox = document.getElementById('result-box');

  calcBtn.addEventListener('click', calculateSubnet);
  cidrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateSubnet();
  });

  function ip2long(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function long2ip(long) {
    return [
      (long >>> 24) & 255,
      (long >>> 16) & 255,
      (long >>> 8) & 255,
      long & 255
    ].join('.');
  }

  function calculateSubnet() {
    try {
      const input = cidrInput.value.trim();
      if (!input) throw new Error("Please enter an IPv4 CIDR.");

      const parts = input.split('/');
      if (parts.length !== 2) throw new Error("Invalid format. Use IP/CIDR (e.g., 192.168.1.0/24)");

      const ipStr = parts[0];
      const cidr = parseInt(parts[1], 10);

      if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ipStr)) throw new Error("Invalid IPv4 address format.");
      if (isNaN(cidr) || cidr < 0 || cidr > 32) throw new Error("CIDR must be between 0 and 32.");

      // Check octets
      ipStr.split('.').forEach(octet => {
        if (parseInt(octet, 10) > 255) throw new Error("IPv4 octets must be 0-255.");
      });

      const ipLong = ip2long(ipStr);
      
      const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const wildcardLong = ~maskLong >>> 0;
      
      const networkLong = (ipLong & maskLong) >>> 0;
      const broadcastLong = (networkLong | wildcardLong) >>> 0;
      
      let firstUsableLong, lastUsableLong, usableCount, totalCount;

      if (cidr === 32) {
        firstUsableLong = networkLong;
        lastUsableLong = networkLong;
        totalCount = 1;
        usableCount = 1;
      } else if (cidr === 31) {
        firstUsableLong = networkLong;
        lastUsableLong = broadcastLong;
        totalCount = 2;
        usableCount = 2;
      } else {
        firstUsableLong = networkLong + 1;
        lastUsableLong = broadcastLong - 1;
        // Need BigInt for counts to avoid JS float loss on /0
        totalCount = 2n ** BigInt(32 - cidr);
        usableCount = totalCount - 2n;
      }

      resultBox.classList.remove('empty');
      resultBox.innerHTML = `
        <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">Subnet Details</h4>
        <table style="width: 100%;">
          <tr><td>IP Address</td><td>${ipStr}</td></tr>
          <tr><td>Network Address</td><td style="color: var(--c-accent); font-weight: bold;">${long2ip(networkLong)}</td></tr>
          <tr><td>Broadcast Address</td><td>${long2ip(broadcastLong)}</td></tr>
          <tr><td>Subnet Mask</td><td>${long2ip(maskLong)}</td></tr>
          <tr><td>Wildcard Mask</td><td>${long2ip(wildcardLong)}</td></tr>
          <tr><td>First Usable Host</td><td style="color: #4ade80;">${long2ip(firstUsableLong)}</td></tr>
          <tr><td>Last Usable Host</td><td style="color: #4ade80;">${long2ip(lastUsableLong)}</td></tr>
          <tr><td>Total Addresses</td><td>${totalCount.toLocaleString()}</td></tr>
          <tr><td>Usable Hosts</td><td style="font-weight: bold;">${usableCount.toLocaleString()}</td></tr>
        </table>
        <button id="copy-subnet" class="copy-btn">Copy Details</button>
      `;

      document.getElementById('copy-subnet').addEventListener('click', () => {
        const txt = `Network: ${long2ip(networkLong)}/${cidr}
Broadcast: ${long2ip(broadcastLong)}
Mask: ${long2ip(maskLong)}
First: ${long2ip(firstUsableLong)}
Last: ${long2ip(lastUsableLong)}
Usable: ${usableCount}`;
        CyberUtils.copyToClipboard(txt);
      });

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    }
  }
});
