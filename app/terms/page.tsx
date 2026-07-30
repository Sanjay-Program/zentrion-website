import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Zentrion Technologies.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <section className="container-x pt-36 pb-24 max-w-2xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Terms of Service</h1>
      <p className="mt-4 text-sm text-mute">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-mute leading-relaxed">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">1. Services</h2>
          <p className="mt-3">
            Zentrion Technologies provides cybersecurity, AI automation, cloud consulting,
            software development, and training services as described on this website and in
            individual client agreements.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">2. Engagements</h2>
          <p className="mt-3">
            Specific scope, deliverables, timelines, and fees for any engagement are defined in a
            separate signed agreement or statement of work, which takes precedence over this
            general website content.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">3. Limitation of Liability</h2>
          <p className="mt-3">
            No security assessment can guarantee the discovery of all vulnerabilities. Zentrion
            Technologies’ liability for any engagement is limited as set out in the relevant
            signed agreement.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">4. Contact</h2>
          <p className="mt-3">Questions about these terms can be directed to us via our Contact page.</p>
        </div>
      </div>

      <p className="mt-10 text-xs text-mute">
        This page is a template and should be reviewed by legal counsel before publishing.
      </p>
    </section>
  );
}
