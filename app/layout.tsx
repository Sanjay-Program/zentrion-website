import type { Metadata } from 'next';
import { Chakra_Petch, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GridGlow from '@/components/GridGlow';
import MagneticButtons from '@/components/MagneticButtons';

const display = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const SITE_URL = 'https://zentriontechnologies.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zentrion Technologies | AI-Powered Cybersecurity, Cloud & AI Automation',
    template: '%s | Zentrion Technologies',
  },
  description:
    'Zentrion Technologies delivers AI-powered cybersecurity, cloud security, AI automation, and enterprise software for businesses, schools, and colleges. Intelligence That Protects.',
  keywords: [
    'AI cybersecurity company',
    'penetration testing services',
    'vulnerability assessment',
    'cloud security consulting',
    'AI automation agency',
    'LLM development company',
    'cybersecurity internship India',
    'cybersecurity training Chennai',
  ],
  authors: [{ name: 'Zentrion Technologies' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Zentrion Technologies',
    title: 'Zentrion Technologies | Intelligence That Protects.',
    description:
      'AI-powered cybersecurity, cloud security, and AI automation for enterprises, schools, and colleges.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zentrion Technologies | Intelligence That Protects.',
    description: 'AI-powered cybersecurity, cloud security, and AI automation solutions.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Zentrion Technologies',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  slogan: 'Intelligence That Protects.',
  description:
    'Zentrion Technologies delivers AI-powered cybersecurity, cloud security, AI automation, and enterprise software for businesses, schools, and colleges.',
  sameAs: [
    'https://instagram.com/zentriontech',
    'https://linkedin.com/company/zentriontechnologies',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-7305771789',
      contactType: 'customer service',
      areaServed: 'IN',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-8220437738',
      contactType: 'sales',
      areaServed: 'IN',
    },
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Zentrion Technologies',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased bg-void text-ink">
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('zentrion-theme')==='light'){document.documentElement.classList.add('light');}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-signal focus:text-void focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <GridGlow />
        <MagneticButtons />
        <div className="relative z-10">
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
