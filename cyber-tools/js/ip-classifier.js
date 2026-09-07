document.addEventListener('DOMContentLoaded', () => {
  const ipInput = document.getElementById('ip-input');
  const classifyBtn = document.getElementById('classify-btn');
  const resultBox = document.getElementById('result-box');

  classifyBtn.addEventListener('click', classifyIP);
  ipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') classifyIP();
  });

  function ip2long(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function inRange(ipLong, network, cidr) {
    const netLong = ip2long(network);
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    return (ipLong & mask) === (netLong & mask);
  }

  function classifyIPv4(ipStr) {
    const octets = ipStr.split('.');
    if (octets.length !== 4 || octets.some(o => isNaN(o) || o === '' || o < 0 || o > 255)) {
      throw new Error("Invalid IPv4 address format.");
    }
    
    const ipLong = ip2long(ipStr);
    let classification = "Public";
    let special = "None";

    if (inRange(ipLong, "10.0.0.0", 8)) { classification = "Private (RFC 1918)"; special = "Class A Private"; }
    else if (inRange(ipLong, "172.16.0.0", 12)) { classification = "Private (RFC 1918)"; special = "Class B Private"; }
    else if (inRange(ipLong, "192.168.0.0", 16)) { classification = "Private (RFC 1918)"; special = "Class C Private"; }
    else if (inRange(ipLong, "127.0.0.0", 8)) { classification = "Loopback"; special = "Host Loopback"; }
    else if (inRange(ipLong, "169.254.0.0", 16)) { classification = "Link-Local"; special = "APIPA"; }
    else if (inRange(ipLong, "100.64.0.0", 10)) { classification = "Carrier-Grade NAT (CGN)"; special = "RFC 6598"; }
    else if (inRange(ipLong, "224.0.0.0", 4)) { classification = "Multicast"; special = "Class D"; }
    else if (inRange(ipLong, "240.0.0.0", 4)) { classification = "Reserved"; special = "Class E"; }
    else if (inRange(ipLong, "192.0.2.0", 24) || inRange(ipLong, "198.51.100.0", 24) || inRange(ipLong, "203.0.113.0", 24)) {
      classification = "Documentation"; special = "TEST-NET";
    }
    else if (ipLong === 0xFFFFFFFF) { classification = "Broadcast"; special = "Limited Broadcast"; }
    else if (ipLong === 0) { classification = "This Network"; special = "Software Address"; }

    const bin = octets.map(o => parseInt(o, 10).toString(2).padStart(8, '0')).join('.');

    return { version: "IPv4", normalized: ipStr, classification, special, binary: bin };
  }

  function classifyIPv6(ipStr) {
    // Basic IPv6 validation (very simplified, regex for general hex colon format)
    if (!/^[a-fA-F0-9:]+$/.test(ipStr) || ipStr.indexOf(':') === -1) {
      throw new Error("Invalid IPv6 address format.");
    }
    
    // Normalize (expand ::) - Simplified approach
    let norm = ipStr.toLowerCase();
    
    let classification = "Global Unicast (Public)";
    let special = "None";

    if (norm === "::1") { classification = "Loopback"; special = "Host Loopback"; }
    else if (norm === "::") { classification = "Unspecified"; special = "Software Address"; }
    else if (norm.startsWith("fc") || norm.startsWith("fd")) { classification = "Unique Local (Private)"; special = "ULA (RFC 4193)"; }
    else if (norm.startsWith("fe8") || norm.startsWith("fe9") || norm.startsWith("fea") || norm.startsWith("feb")) { classification = "Link-Local"; special = "Local Subnet"; }
    else if (norm.startsWith("ff")) { classification = "Multicast"; special = "Multicast Group"; }
    else if (norm.startsWith("2001:db8:")) { classification = "Documentation"; special = "RFC 3849"; }

    return { version: "IPv6", normalized: norm, classification, special, binary: "N/A for IPv6" };
  }

  function classifyIP() {
    try {
      const input = ipInput.value.trim();
      if (!input) throw new Error("Please enter an IP address.");

      let res;
      if (input.includes('.')) {
        res = classifyIPv4(input);
      } else {
        res = classifyIPv6(input);
      }

      resultBox.classList.remove('empty');
      resultBox.innerHTML = `
        <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">IP Classification</h4>
        <table style="width: 100%;">
          <tr><td>Version</td><td>${res.version}</td></tr>
          <tr><td>Normalized Address</td><td style="color: var(--c-accent); font-family: var(--font-mono);">${res.normalized}</td></tr>
          <tr><td>Classification</td><td style="font-weight: bold; color: ${res.classification.includes('Public') ? 'var(--c-danger)' : 'var(--c-success)'};">${res.classification}</td></tr>
          <tr><td>Special Range</td><td>${res.special}</td></tr>
          ${res.binary !== 'N/A for IPv6' ? `<tr><td>Binary Representation</td><td style="font-family: var(--font-mono); font-size: 0.85em;">${res.binary}</td></tr>` : ''}
        </table>
      `;

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    }
  }
});
