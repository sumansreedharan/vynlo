'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  UserSquare2, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Command
} from 'lucide-react';
import { useAuth } from '@/src/providers/auth-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

 const handleLogout = () => {
  logout();

  router.push('/login');
};

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Contacts', href: '/dashboard/contacts', icon: UserSquare2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-zinc-100 antialiased selection:bg-zinc-800">
      
      {/* Premium Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-zinc-900 bg-zinc-950 p-4 md:flex">
        {/* Brand Header */}
        <div className="flex items-center gap-2 px-3 py-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white font-bold text-lg shadow-inner">
            V
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-none">Vynlo</h1>
            <span className="text-[11px] text-zinc-500 font-medium tracking-wide">ENTERPRISE CRM</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition duration-200 ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm border border-zinc-800/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-zinc-500'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Lower Sidebar System Tray */}
        <div className="border-t border-zinc-900 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-500 transition duration-200 hover:text-red-400 hover:bg-red-500/5"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container Core */}
      <div className="flex flex-1 flex-col md:pl-64">
        
        {/* Structural topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-900 bg-zinc-950/70 px-6 backdrop-blur-md">
          {/* Global Hot-Search tool */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search workspaces..."
              className="w-full rounded-xl border border-zinc-900 bg-zinc-900/30 py-1.5 pl-9 pr-12 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition duration-200 focus:border-zinc-800 focus:bg-zinc-900/60"
            />
            <div className="absolute right-3 top-2 hidden items-center gap-0.5 rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 text-[9px] font-medium text-zinc-500 sm:flex">
              <Command size={10} />K
            </div>
          </div>

          {/* User Meta Controls */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-xl border border-zinc-900 p-2 text-zinc-400 hover:text-zinc-200 transition">
              <Bell size={16} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-zinc-100" />
            </button>
            
            <div className="h-4 w-px bg-zinc-900" />
            
            {/* User Profile Thumbnail */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-gradient-to-br from-zinc-700 to-zinc-900 text-xs font-semibold text-zinc-300">
                JD
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-zinc-200 leading-none">John Doe</p>
                <p className="mt-0.5 text-[10px] text-zinc-500 leading-none">Sales Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content Container */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}