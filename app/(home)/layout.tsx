import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { LanguageProvider } from "@/contexts/LanguageContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackgroundShapes from '@/components/background-shapes';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nurjahan Private Hospital & Diagnostic Center-2 | World-Class Healthcare',
  description: 'Experience world-class healthcare at Nurjahan Private Hospital & Diagnostic Center-2. Expert doctors, advanced facilities, and compassionate care available 24/7 in Sylhet.',
  keywords: 'hospital, diagnostic center, healthcare, medical services, Sylhet, nurjahan hospital, best doctors, emergency care',
  authors: [{ name: 'Nurjahan Hospital' }],
  creator: 'Nurjahan Hospital',
  publisher: 'Nurjahan Hospital',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Nurjahan Private Hospital & Diagnostic Center-2',
    description: 'Leading healthcare provider with advanced medical technology and expert clinical care.',
    url: 'https://nurjahanhospital.com',
    siteName: 'Nurjahan Hospital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nurjahan Private Hospital & Diagnostic Center-2',
    description: 'World-class healthcare at your service.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${_geist.variable} font-sans antialiased bg-white`}>
        <ReactQueryProvider>
          <LanguageProvider>
            <div className="relative isolate min-h-screen">
              <BackgroundShapes />
              <Header />
              {children}
              <Footer />
            </div>
            <Toaster position="top-center" />
            <Analytics />
          </LanguageProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
