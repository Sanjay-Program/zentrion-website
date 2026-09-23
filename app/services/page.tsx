import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, ServiceCard, SectionHeading, Eyebrow } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Technology Solutions & Services',
  description: 'Zentrion builds, secures and intelligently automates digital products and business systems.',
};

const servicePillars = [
  {
    title: "Software & Web Development",
    description: "End-to-end development of modern, scalable applications.",
    services: [
      { name: "Web Development", url: "/services/web-development", desc: "Corporate sites, portals, and robust web experiences." },
      { name: "Full-Stack Development", url: "/services/full-stack-development", desc: "Complete frontend and backend application architecture." },
      { name: "Web Applications", url: "/services/web-application-development", desc: "Complex business applications and internal tools." },
      { name: "SaaS Development", url: "/services/saas-development", desc: "Multi-tenant software-as-a-service platforms." },
      { name: "Custom Software", url: "/services/software-development", desc: "Bespoke systems solving unique business challenges." }
    ]
  },
  {
    title: "Enterprise Platforms",
    description: "Systems that run and scale modern businesses.",
    services: [
      { name: "CRM Development", url: "/services/crm-development", desc: "Custom Customer Relationship Management systems." },
      { name: "ERP Development", url: "/services/erp-development", desc: "Enterprise Resource Planning for complete operations." },
      { name: "E-Commerce", url: "/services/ecommerce-development", desc: "Scalable online stores and digital marketplaces." },
      { name: "Portal Development", url: "/services/portal-development", desc: "Secure access for customers, vendors, and employees." },
      { name: "Business Software", url: "/services/business-software", desc: "Inventory, HR, Payroll, and management tools." }
    ]
  },
  {
    title: "AI & Automation",
    description: "Intelligent systems that accelerate operations.",
    services: [
      { name: "Generative AI", url: "/services/generative-ai", desc: "Custom LLMs, RAG, and document intelligence." },
      { name: "Agentic AI", url: "/services/agentic-ai", desc: "Autonomous AI agents and multi-agent workflows." },
      { name: "AI & Machine Learning", url: "/services/ai-ml-development", desc: "Predictive models, computer vision, and NLP." },
      { name: "AI Chatbots", url: "/services/ai-chatbots", desc: "Intelligent assistants for support and knowledge." },
      { name: "Business Automation", url: "/services/automation", desc: "End-to-end digital workflow automation." }
    ]
  },
  {
    title: "Infrastructure & Security",
    description: "The secure foundation for digital transformation.",
    services: [
      { name: "Cloud Solutions", url: "/services/cloud-solutions", desc: "AWS, Azure, and GCP architecture and migration." },
      { name: "DevOps", url: "/services/devops", desc: "CI/CD, infrastructure as code, and deployment." },
      { name: "Cybersecurity", url: "/services", desc: "VAPT, Threat Hunting, and Security Monitoring." },
      { name: "DevSecOps", url: "/services/devsecops", desc: "Security integrated directly into the development pipeline." },
      { name: "System Integration", url: "/services/system-integration", desc: "Secure connection of disparate enterprise systems." }
    ]
  },
  {
    title: "Engineering Specialties",
    description: "Targeted expertise for complex technical requirements.",
    services: [
      { name: "Mobile App Development", url: "/services/mobile-app-development", desc: "Native and cross-platform mobile experiences." },
      { name: "API Development", url: "/services/api-development", desc: "REST and GraphQL secure API engineering." },
      { name: "Database Engineering", url: "/services/database-development", desc: "Schema design, optimization, and data modeling." },
      { name: "UI/UX Design", url: "/services/ui-ux", desc: "User research, prototyping, and design systems." },
      { name: "Legacy Modernization", url: "/services/modernization", desc: "Updating and migrating legacy applications safely." }
    ]
  }
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/services', label: 'Services' }]} />
      
      {/* HERO */}
      <section className="container-x pt-10 pb-20">
        <Reveal>
          <Eyebrow>Technology Solutions</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-4xl tracking-tight">
            We <span className="text-cyan">build, secure and automate</span> digital products.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            From idea to scalable architecture, Zentrion provides end-to-end technology solutions. We engineer complex web applications, integrate artificial intelligence, deploy to the cloud, and ensure the entire ecosystem is secured against modern threats.
          </p>
        </Reveal>
      </section>

      {/* PILLARS */}
      {servicePillars.map((pillar, index) => (
        <section key={index} className="container-x py-16 border-t border-line">
          <SectionHeading 
            eyebrow={`0${index + 1}`}
            title={pillar.title}
            description={pillar.description}
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillar.services.map((service, i) => (
              <ServiceCard 
                key={i}
                eyebrow="Capability"
                title={service.name}
                description={service.desc}
                href={service.url}
                points={[]}
              />
            ))}
          </div>
        </section>
      ))}

      {/* CLIENT ACQUISITION / CTA */}
      <section className="container-x py-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl max-w-4xl mx-auto flex flex-col items-center text-center">
           <h2 className="text-3xl font-display font-bold text-white mb-4">What Do You Need to Build?</h2>
           <p className="text-mute mb-8 max-w-xl">
             Whether you have a raw idea, a prototype, or a legacy system that needs modernization, our engineering team can help.
           </p>
           <Link href="/contact/project" className="btn-primary">
             Discuss Your Requirements
           </Link>
         </div>
      </section>
    </>
  );
}
