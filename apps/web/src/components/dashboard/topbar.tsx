import { Bell, Command, Search } from "lucide-react";

type TopbarProps = {
  userName: string;
  role: string;
};
export default function Topbar({ userName, role }: TopbarProps) {
  return (
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
            <p className="text-xs font-semibold text-zinc-200 leading-none">
              John Doe
            </p>
            <p className="mt-0.5 text-[10px] text-zinc-500 leading-none">
              Sales Lead
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
