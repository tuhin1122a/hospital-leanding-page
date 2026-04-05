'use client'

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { useState, useEffect } from 'react';

export default function Analytics() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <VercelAnalytics />;
}
