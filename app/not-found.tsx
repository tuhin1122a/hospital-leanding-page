import Link from 'next/link';
import { ArrowLeft, Home, Stethoscope } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <span className="text-[12rem] font-bold text-slate-100 select-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center translate-y-8">
          <Stethoscope className="w-24 h-24 text-[#2E68FF] opacity-20 animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        Page Not Found
      </h1>

      <p className="text-slate-600 max-w-md mb-8">
        Oops! The medical staff couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#2E68FF] text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </div>
    </div>
  );
}
