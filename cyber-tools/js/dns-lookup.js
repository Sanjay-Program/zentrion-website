document.addEventListener('DOMContentLoaded', () => {
  const domainInput = document.getElementById('dns-domain');
  const typeSelect = document.getElementById('dns-type');
  const lookupBtn = document.getElementById('lookup-btn');
  const resultBox = document.getElementById('result-box');

  lookupBtn.addEventListener('click', performLookup);
  domainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performLookup();
  });

  const typeMap = {
    1: 'A',
    2: 'NS',
    5: 'CNAME',
    6: 'SOA',
    15: 'MX',
    16: 'TXT',
    28: 'AAAA',
    257: 'CAA'
  };

  async function performLookup() {
    try {
      let domain = domainInput.value.trim();
      if (!domain) throw new Error("Please enter a domain name.");
      
      domain = domain.replace(/^https?:\/\//, '').split('/')[0];
      if (!/^[a-zA-Z0-9.-]+$/.test(domain)) throw new Error("Invalid domain format.");

      const type = typeSelect.value;
      
      CyberUtils.setLoading(lookupBtn, true, 'Lookup');
      CyberUtils.clearResults(resultBox, 'Querying Cloudflare DNS...');

      const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
        headers: {
          'Accept': 'application/dns-json'
        }
      });

      if (!response.ok) {
        throw new Error(`DNS Query failed: HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.Status !== 0) {
        const errorCodes = {
          1: 'FormErr (Format Error)',
          2: 'ServFail (Server Failure)',
          3: 'NXDomain (Non-Existent Domain)',
          4: 'NotImp (Not Implemented)',
          5: 'Refused'
        };
        throw new Error(`DNS Error: ${errorCodes[data.Status] || `Code ${data.Status}`}`);
      }

      const answers = data.Answer || [];
      
      if (answers.length === 0) {
        resultBox.classList.remove('empty');
        resultBox.innerHTML = `
          <h4 style="color: var(--c-warning); margin-bottom: 0.5rem;">No Records Found</h4>
          <p>No ${type} records exist for <strong>${CyberUtils.escapeHTML(domain)}</strong>.</p>
        `;
        return;
      }

      let rows = answers.map(ans => {
        const rType = typeMap[ans.type] || `TYPE${ans.type}`;
        return `
          <tr>
            <td>${CyberUtils.escapeHTML(ans.name)}</td>
            <td>${rType}</td>
            <td>${ans.TTL}</td>
            <td style="color: var(--c-accent); font-weight: bold; word-break: break-all;">${CyberUtils.escapeHTML(ans.data)}</td>
          </tr>
        `;
      }).join('');

      resultBox.classList.remove('empty');
      resultBox.innerHTML = `
        <h4 style="color: var(--c-mute); margin-bottom: 0.5rem;">DNS Response</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>TTL</th>
              <th>Value / Data</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <p style="margin-top: 1rem; color: var(--c-mute); font-size: 0.8rem;">* This tool queries Cloudflare DoH. Presence of a record does not cryptographically prove domain ownership.</p>
      `;

    } catch (err) {
      CyberUtils.showError(resultBox, err.message);
    } finally {
      CyberUtils.setLoading(lookupBtn, false);
    }
  }
});
