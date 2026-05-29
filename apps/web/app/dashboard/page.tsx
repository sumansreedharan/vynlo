'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  CheckSquare, 
  UserPlus, 
  ArrowUpRight, 
  ArrowDownRight, 
  LogOut, 
  Bell, 
  Search, 
  TrendingUp 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Prevent flash of content before authentication check finishes
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-100 antialiased selection:bg-zinc-800">
      {/* Structural ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-transparent to-transparent pointer-events-none" />

      {/* Premium Navigation Header */}
      <header className="relative border-b border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/50 text-white font-bold">
                V
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Vynlo</span>
            </div>
            <nav className="hidden md:flex space-x-1 text-sm font-medium">
              <a href="#" className="rounded-md bg-zinc-800/60 px-3 py-1.5 text-zinc-100">Overview</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-zinc-400 hover:text-zinc-200 transition">Leads</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-zinc-400 hover:text-zinc-200 transition">Analytics</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search CRM..." 
                className="w-48 rounded-lg border border-zinc-800 bg-zinc-900/50 py-1.5 pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all focus:w-60"
              />
            </div>
            <button className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition">
              <Bell size={18} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Welcome Block */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Workspace Overview</h1>
            <p className="text-sm text-zinc-400">Here is how your pipeline looks today.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 border border-zinc-800 bg-zinc-900/30 px-3 py-2 rounded-lg backdrop-blur">
            <TrendingUp size={14} className="text-emerald-500" />
            <span>Updated real-time</span>
          </div>
        </div>

        {/* 3-Column Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Card 1: Total Leads */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Leads</span>
              <div className="rounded-lg bg-zinc-800/40 p-2 text-zinc-300 border border-zinc-700/50">
                <Users size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-white">128</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                <ArrowUpRight size={12} />
                +12%
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">vs last week</p>
          </div>

          {/* Card 2: Tasks Pending */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Tasks Pending</span>
              <div className="rounded-lg bg-zinc-800/40 p-2 text-zinc-300 border border-zinc-700/50">
                <CheckSquare size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-white">24</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                <ArrowDownRight size={12} />
                -3%
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">vs last week</p>
          </div>

          {/* Card 3: New Contacts */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">New Contacts</span>
              <div className="rounded-lg bg-zinc-800/40 p-2 text-zinc-300 border border-zinc-700/50">
                <UserPlus size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-white">56</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                <ArrowUpRight size={12} />
                +24%
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">vs last week</p>
          </div>

        </div>

        {/* Premium Data Context Block */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/10 p-6 text-center text-sm text-zinc-500">
          Ready to review comprehensive pipeline insights? 
          <a href="#" className="ml-1 font-medium text-zinc-300 hover:text-white transition underline underline-offset-4">
            View Analytics Report →
          </a>
        </div>

      </main>
    </div>
  );
}