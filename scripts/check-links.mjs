import fs from 'fs';
import path from 'path';

const outDir = path.resolve('out');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(outDir);
let allLinks = new Set();
let fileLinks = {};

const hrefRegex = /href="(\/[^"]+)"/g;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  fileLinks[file] = new Set();
  while ((match = hrefRegex.exec(content)) !== null) {
    // ignore query params and fragments
    let link = match[1].split('?')[0].split('#')[0];
    if (link === '/') link = '/index.html';
    fileLinks[file].add(link);
    allLinks.add(link);
  }
}

let broken = new Set();
for (const link of allLinks) {
  if (link.startsWith('/_next/') || link.startsWith('/fonts/')) continue;
  
  let target = path.join(outDir, link);
  let targetHtml = path.join(outDir, link + '.html');
  let targetIndex = path.join(outDir, link, 'index.html');
  
  if (!fs.existsSync(target) && !fs.existsSync(targetHtml) && !fs.existsSync(targetIndex)) {
    broken.add(link);
  }
}

if (broken.size === 0) {
  console.log("No broken internal links found!");
} else {
  console.log("Broken links found:");
  for (const file of Object.keys(fileLinks)) {
    for (const link of fileLinks[file]) {
      if (broken.has(link)) {
        console.log(`In file ${file.replace(outDir, '')}: ${link}`);
      }
    }
  }
}
