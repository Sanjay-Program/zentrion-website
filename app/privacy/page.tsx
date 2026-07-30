import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Zentrion Technologies.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <section className="container-x pt-36 pb-24 max-w-2xl prose-invert">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-mute">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-mute leading-relaxed">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">1. Information We Collect</h2>
          <p className="mt-3">
            We collect information you provide directly, such as your name, email, phone number,
            and company, when you submit a form, book a consultation, apply for an internship, or
            enroll in a course.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">2. How We Use Information</h2>
          <p className="mt-3">
            We use the information you provide to respond to inquiries, deliver services, manage
            training and internship programs, and communicate updates relevant to your engagement
            with us.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">3. Data Security</h2>
          <p className="mt-3">
            As a cybersecurity company, we apply industry-standard safeguards to the data we hold
            and do not sell personal information to third parties.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">4. Contact</h2>
          <p className="mt-3">
            For privacy-related requests, contact us at the phone numbers listed on our Contact
            page.
          </p>
        </div>
      </div>

      <p className="mt-10 text-xs text-mute">
        This page is a template and should be reviewed by legal counsel before publishing.
      </p>
    </section>
  );
}
