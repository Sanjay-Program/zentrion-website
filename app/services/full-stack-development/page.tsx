import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Full-Stack Development',
  description: 'Complete end-to-end application development encompassing frontend, backend, database, and infrastructure.',
};

const techStack = [
  "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Redis", "TypeScript", "GraphQL", "REST APIs"
];

export default function FullStackPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/full-stack-development', label: 'Full-Stack' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            End-to-End <span className="text-cyan">Full-Stack Development</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            We architect and build complete systems from the database layer to the user interface, ensuring performance, scalability, and security are designed into the core of your application.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {techStack.map((tech, i) => (
              <div key={i} className="px-4 py-2 bg-surface border border-line rounded font-mono text-sm text-ink">
                {tech}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="Complete System Architecture"
          description="We do not just write code; we design resilient systems."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Backend Architecture", desc: "Scalable microservices or monolithic architectures using Node.js or Python." },
            { title: "Database Design", desc: "Relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) data modeling." },
            { title: "API Development", desc: "Secure RESTful and GraphQL APIs for seamless frontend/backend communication." },
            { title: "Authentication & Authorization", desc: "RBAC, JWT, OAuth, and secure session management implementations." },
            { title: "Cloud Infrastructure", desc: "Automated deployment pipelines and scalable infrastructure on AWS/GCP." }
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
           <h2 className="text-3xl font-display font-bold text-white mb-4">Build Your Product</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your full-stack application requirements with our engineering team.
           </p>
           <Link href="/contact/project?service=full-stack" className="btn-primary inline-flex">
             Discuss Your Full-Stack Project
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/cloud-solutions" className="text-cyan hover:underline">Cloud Solutions</Link> · <Link href="/services/api-security" className="text-cyan hover:underline">API Security</Link>
           </div>
         </div>
      </section>
    </>
  );
}
