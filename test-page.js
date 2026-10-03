const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

const serve = serveStatic('out', { index: ['index.html'] });
const server = http.createServer((req, res) => serve(req, res, finalhandler(req, res)));

server.listen(4000, async () => {
  console.log('Server running on 4000');
  try {
    const browser = await puppeteer.launch({ 
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`PAGE ERROR: ${msg.text()}`);
      }
    });

    page.on('pageerror', exception => {
      console.log(`UNCAUGHT EXCEPTION: ${exception}`);
    });

    await page.goto('http://localhost:4000');
    await page.waitForTimeout(4000);
    await browser.close();
  } catch(e) {
    console.error("Puppeteer error:", e);
  }
  server.close();
});
