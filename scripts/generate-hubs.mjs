import fs from 'fs';
import path from 'path';

const hubs = [
  { id: 'learn', title: 'Learn', subtitle: 'Cybersecurity Education Hub', desc: 'Explore guides, knowledge base, cheatsheets and structured roadmaps.', links: [{href: '/guides', label: 'Guides'}, {href: '/knowledge', label: 'Knowledge Base'}, {href: '/cheatsheets', label: 'Cheatsheets'}] },
  { id: 'practice', title: 'Practice', subtitle: 'Cyber Range & Labs', desc: 'Apply your knowledge in browser-native simulations and tools.', links: [{href: '/labs', label: 'Labs'}, {href: '/ctf', label: 'CTF'}, {href: '/tools', label: 'Tools'}] },
  { id: 'defend', title: 'Defend', subtitle: 'Blue Team & SOC Operations', desc: 'Learn detection engineering, threat hunting, and DFIR.', links: [{href: '/guides/network', label: 'Network Defense'}, {href: '/tools', label: 'Defensive Tools'}] },
  { id: 'build', title: 'Build', subtitle: 'Secure Development & AppSec', desc: 'Secure coding practices, DevSecOps, and cloud architecture.', links: [{href: '/secure-development', label: 'Secure Coding'}, {href: '/cloud', label: 'Cloud Security'}] },
  { id: 'career-paths', title: 'Career Paths', subtitle: 'Cybersecurity Roles', desc: 'Roadmaps and assessments to build your professional career.', links: [{href: '/roadmaps', label: 'Roadmaps'}, {href: '/assessments', label: 'Assessments'}] },
  { id: 'company', title: 'Company', subtitle: 'Zentrion Technologies', desc: 'Our enterprise services, research, and mission.', links: [{href: '/services', label: 'Services'}, {href: '/about', label: 'About Us'}, {href: '/contact', label: 'Contact'}] },
];

for (const hub of hubs) {
  const code = `import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: '${hub.title} | Zentrion Technologies',
  description: '${hub.desc}',
};

export default function HubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/${hub.id}', label: '${hub.title}' }]} />
      <section className="container-x pt-10 pb-16 min-h-[60vh]">
        <Reveal>
          <Eyebrow>${hub.subtitle}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            ${hub.title} Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            ${hub.desc}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${hub.links.map((l, i) => `
          <Reveal delay={${0.1 + (i * 0.1)}}>
            <Link href="${l.href}" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">${l.label}</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our ${l.label.toLowerCase()} section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>`).join('')}
        </div>
      </section>
    </>
  );
}
`;
  fs.writeFileSync(path.join(process.cwd(), 'app', hub.id, 'page.tsx'), code);
}
console.log('Hub pages generated!');
