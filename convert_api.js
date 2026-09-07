const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'app', 'api', 'network');
const funcDir = path.join(__dirname, 'functions', 'api', 'network');

fs.mkdirSync(funcDir, { recursive: true });

const folders = fs.readdirSync(apiDir);

for (const folder of folders) {
  const routePath = path.join(apiDir, folder, 'route.ts');
  if (fs.existsSync(routePath)) {
    let content = fs.readFileSync(routePath, 'utf8');
    
    // Replace Next.js specific imports and exports
    content = content.replace(/export const dynamic = 'force-dynamic';\n?/, '');
    content = content.replace(/import \{ NextResponse \} from 'next\/server';\n?/, '');
    content = content.replace(/export async function GET\(request: Request\) \{/, 'export async function onRequestGet({ request }: { request: Request }) {');
    content = content.replace(/NextResponse\.json/g, 'Response.json');
    
    // Write to Cloudflare functions directory
    const outPath = path.join(funcDir, `${folder}.ts`);
    fs.writeFileSync(outPath, content);
    console.log(`Converted ${folder}`);
  }
}

console.log("Done converting to Cloudflare Functions.");
