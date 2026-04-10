import { LanguageProvider } from "@/contexts/LanguageContext";
import { SocketProvider } from "@/contexts/SocketContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import WrapperAnalytics from '@/components/analytics';

const _geist = Geist({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
  variable: '--font-geist' 
});
const _geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: '--font-geist-mono' 
});

export const metadata: Metadata = {
  title: 'Nurjahan Private Hospital & Diagnostic Center-2',
  description: 'World-class healthcare services provided 24/7.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (_) {}
        `}} />
      </head>
      <body className="font-sans antialiased">
        <ReactQueryProvider>
          <LanguageProvider>
            <SocketProvider>
              {children}
              <Toaster position="top-center" />
              <WrapperAnalytics />
            </SocketProvider>
          </LanguageProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
