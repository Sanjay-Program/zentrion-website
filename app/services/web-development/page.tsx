import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard, StatBlock } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Web Development Services',
  description: 'Corporate websites, marketing platforms, and robust web experiences built for scale and security.',
};

const capabilities = [
  "Corporate Websites", "Marketing Platforms", "E-commerce Frontends", "Content Platforms", "Landing Pages", "Custom Web Portals"
];

export default function WebDevelopmentPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/web-development', label: 'Web Development' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Enterprise <span className="text-cyan">Web Development</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Your website is often the first point of contact and a critical component of your digital attack surface. We build lightning-fast, accessible, and deeply secure web platforms that drive business outcomes.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {capabilities.map((step, i) => (
              <div key={i} className="px-4 py-2 bg-surface border border-line rounded font-mono text-sm text-ink">
                {step}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="What We Deliver"
          description="Modern architecture that prioritizes performance and security."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Frontend Engineering", desc: "React, Next.js, and modern JS frameworks for interactive, app-like experiences." },
            { title: "Performance Optimization", desc: "Edge caching, optimized assets, and static generation for 90+ Lighthouse scores." },
            { title: "Responsive Architecture", desc: "Flawless rendering across mobile, tablet, and ultra-wide desktop displays." },
            { title: "SEO Foundation", desc: "Semantic HTML, structured data, and dynamic metadata for maximum search visibility." },
            { title: "Headless CMS Integration", desc: "Connecting modern frontends to Sanity, Contentful, or custom backends." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Start Your Project</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your web development requirements with our engineering team.
           </p>
           <Link href="/contact/project?service=web-development" className="btn-primary inline-flex">
             Discuss Your Web Development Project
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/application-security" className="text-cyan hover:underline">Application Security</Link> · <Link href="/services/ui-ux" className="text-cyan hover:underline">UI/UX Design</Link>
           </div>
         </div>
      </section>
    </>
  );
}
