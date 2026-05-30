'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/src/providers/auth-provider';

import Navbar from '@/src/components/dashboard/navbar';

import DashboardHeader from '@/src/components/dashboard/dashboard-header';

import MetricsGrid from '@/src/components/dashboard/metrics-grid';

import AnalyticsCTA from '@/src/components/dashboard/analytics-cta';

export default function DashboardPage() {
  const router = useRouter();

  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const handleLogout = () => {
    logout();

    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-100 antialiased selection:bg-zinc-800">
      <Navbar onLogout={handleLogout} />

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        <MetricsGrid />

        <AnalyticsCTA />
      </main>
    </div>
  );
}