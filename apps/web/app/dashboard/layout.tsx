'use client';

import { useRouter } from 'next/navigation';

import Sidebar from '@/src/components/dashboard/sidebar';
import Topbar from '@/src/components/dashboard/topbar';

import { useAuth } from '@/src/providers/auth-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-zinc-100 antialiased selection:bg-zinc-800">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Layout */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Topbar */}
        <Topbar
          userName="John Doe"
          role="Sales Lead"
        />

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}