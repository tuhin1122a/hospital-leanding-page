'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Stethoscope } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <span className="text-[12rem] font-bold text-slate-100 select-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center translate-y-8">
          <Stethoscope className="w-24 h-24 text-[#2E68FF] opacity-20 animate-pulse" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-600 max-w-md mb-8"
      >
        Oops! The medical staff couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#2E68FF] text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
