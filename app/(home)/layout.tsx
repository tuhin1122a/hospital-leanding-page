import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackgroundShapes from '@/components/background-shapes';

export const metadata: Metadata = {
  metadataBase: new URL('https://nurjahandiagnostic.com'),
  title: {
    default: 'Nurjahan Private Hospital & Diagnostic Center-2 | Kushtia',
    template: '%s | Nurjahan Hospital'
  },
  description: 'Experience world-class healthcare at Nurjahan Private Hospital & Diagnostic Center-2. Expert doctors, advanced facilities, and compassionate care available 24/7 in Kumarkhali, Kushtia.',
  keywords: ['hospital in kushtia', 'diagnostic center kushtia', 'healthcare', 'medical services', 'Kushtia hospital', 'nurjahan hospital', 'best doctors in kushtia', 'emergency care kushtia', 'ICU kushtia'],
  authors: [{ name: 'Nurjahan Hospital' }],
  creator: 'Nurjahan Hospital',
  publisher: 'Nurjahan Hospital',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Nurjahan Private Hospital & Diagnostic Center-2',
    description: 'Leading healthcare provider with advanced medical technology and expert clinical care in Kumarkhali, Kushtia.',
    url: 'https://nurjahandiagnostic.com',
    siteName: 'Nurjahan Hospital',
    images: [
      {
        url: '/hero-hospital.jpg', // Using your beautiful hero image for social sharing
        width: 1200,
        height: 630,
        alt: 'Nurjahan Hospital Hero Section',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nurjahan Private Hospital & Diagnostic Center-2',
    description: 'World-class healthcare at your service in Kumarkhali, Kushtia. 24/7 emergency & diagnostic center.',
    creator: '@NurjahanHosp',
    images: ['/hero-hospital.jpg'],
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white min-h-screen relative isolate">
      <BackgroundShapes />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
