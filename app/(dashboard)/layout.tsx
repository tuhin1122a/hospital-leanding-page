import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { LanguageProvider } from "@/contexts/LanguageContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Dashboard - Nurjahan Private Hospital & Diagnostic Center-2',
  description: 'Manage hospital operations, appointments, and patient records.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50/50">
        <ReactQueryProvider>
          <LanguageProvider>
            {children}
            <Toaster position="top-center" />
          </LanguageProvider>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
