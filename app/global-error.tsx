'use client'

import { Geist } from 'next/font/google';

const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={_geist.variable}>
      <body className="font-sans flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 text-center">
        <h1 className="text-4xl font-black text-[#0a1b4d] mb-4">A critical error occurred.</h1>
        <p className="text-slate-600 mb-8 max-w-md">{error.message || "An unexpected error occurred in the hospital system foundation."}</p>
        <button
          onClick={() => reset()}
          className="bg-[#1a4bde] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          Restart Application
        </button>
      </body>
    </html>
  )
}
