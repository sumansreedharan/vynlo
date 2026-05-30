import { Bell, LogOut, Search } from "lucide-react";

type NavbarProps = {
  onLogout: () => void;
};

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <header className="relative border-b border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/50 text-white font-bold">
              V
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Vynlo
            </span>
          </div>
          <nav className="hidden md:flex space-x-1 text-sm font-medium">
            <a
              href="#"
              className="rounded-md bg-zinc-800/60 px-3 py-1.5 text-zinc-100"
            >
              Overview
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-1.5 text-zinc-400 hover:text-zinc-200 transition"
            >
              Leads
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-1.5 text-zinc-400 hover:text-zinc-200 transition"
            >
              Analytics
            </a>
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
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
