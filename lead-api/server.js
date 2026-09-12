const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Simple local storage for leads and temporary report states
const LEADS_FILE = path.join(__dirname, 'leads.json');
const activeReports = new Map();

function saveLead(lead) {
  let leads = [];
  if (fs.existsSync(LEADS_FILE)) {
    try {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    } catch (e) {
      leads = [];
    }
  }
  leads.push({ ...lead, timestamp: new Date().toISOString() });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Dummy security check function to simulate backend analysis
async function runSecurityChecks(domain) {
  return {
    domain,
    score: Math.floor(Math.random() * 40) + 40, // Simulated score 40-80
    issues: [
      {
        title: 'Missing HTTP Strict Transport Security (HSTS)',
        severity: 'high',
        description: 'The server does not enforce encrypted connections.',
        fix: 'Add the Strict-Transport-Security header to all responses.'
      },
      {
        title: 'Missing Content Security Policy (CSP)',
        severity: 'medium',
        description: 'No CSP is defined, increasing XSS risk.',
        fix: 'Implement a strict CSP restricting script execution.'
      },
      {
        title: 'DMARC Policy Not Enforced',
        severity: 'medium',
        description: 'The domain does not have a p=reject DMARC policy.',
        fix: 'Update DNS TXT records to enforce DMARC.'
      },
      {
        title: 'Server Information Leakage',
        severity: 'low',
        description: 'Server headers expose version information.',
        fix: 'Remove Server and X-Powered-By headers.'
      }
    ]
  };
}

// Step 1: Run security check (public, no auth) - Returns a preview
app.post('/api/audit', async (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: 'Domain is required' });
  
  const results = await runSecurityChecks(domain);
  const reportId = crypto.randomUUID();
  
  // Store full results temporarily in memory
  activeReports.set(reportId, results);
  
  // Cleanup after 1 hour
  setTimeout(() => activeReports.delete(reportId), 3600000);
  
  // Return partial results
  res.json({
    score: results.score,
    issuesFound: results.issues.length,
    preview: results.issues.slice(0, 3), // Show max 3 issues
    reportId: reportId
  });
});

// Step 2: User submits details → get full PDF report
app.post('/api/audit/:reportId/claim', async (req, res) => {
  const { reportId } = req.params;
  const { name, email, company, phone } = req.body;
  
  const results = activeReports.get(reportId);
  if (!results) {
    return res.status(404).json({ error: 'Report expired or not found' });
  }

  // Save the captured lead
  saveLead({ name, email, company, phone, domain: results.domain, score: results.score });
  
  // Generate PDF in memory
  const pdfBuffer = await generateAuditPDF(results, { name, company });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="security-audit-${results.domain}.pdf"`);
  res.send(pdfBuffer);
});

// Generate the PDF report using PDFKit
function generateAuditPDF(results, lead) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    
    // Header
    doc.fontSize(24).text('Website Security Audit Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Prepared for: ${lead.company || lead.name}`, { align: 'center' });
    doc.text(`Target Domain: ${results.domain}`, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, { align: 'center' });
    doc.moveDown(2);
    
    // Score
    doc.fontSize(18).text(`Security Score: ${results.score}/100`);
    let scoreLabel = 'CRITICAL RISK';
    if (results.score >= 80) scoreLabel = 'GOOD';
    else if (results.score >= 60) scoreLabel = 'MODERATE RISK';
    
    doc.fontSize(12).text(scoreLabel);
    doc.moveDown(2);
    
    // Issues List
    doc.fontSize(16).text('Security Issues Found:');
    doc.moveDown();
    
    results.issues.forEach((issue, i) => {
      let color = 'black';
      if (issue.severity === 'high') color = 'red';
      else if (issue.severity === 'medium') color = 'orange';
      
      doc.fontSize(12).fillColor(color).text(`${i+1}. [${issue.severity.toUpperCase()}] ${issue.title}`);
      doc.fillColor('black').fontSize(10).text(`   Description: ${issue.description}`);
      doc.text(`   Recommendation: ${issue.fix}`);
      doc.moveDown();
    });
    
    // Call to Action
    doc.moveDown(3);
    doc.fontSize(14).fillColor('#2F6BFF').text('Need Help Resolving These Vulnerabilities?', { align: 'center' });
    doc.moveDown(0.5);
    doc.fillColor('black').fontSize(11).text('The Zentrion Technologies team can secure your infrastructure in 24–48 hours.', { align: 'center' });
    doc.text('Contact: hello@zentriontechnologies.com', { align: 'center' });
    doc.text('Visit: zentriontechnologies.com/services', { align: 'center' });
    
    doc.end();
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Lead Gen API Server running on port ${PORT}`);
});
