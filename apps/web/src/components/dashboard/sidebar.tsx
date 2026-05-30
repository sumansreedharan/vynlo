import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UserSquare2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  onLogout: () => void;
};

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Contacts", href: "/dashboard/contacts", icon: UserSquare2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-zinc-900 bg-zinc-950 p-4 md:flex">
      {/* Brand Header */}
      <div className="flex items-center gap-2 px-3 py-4 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white font-bold text-lg shadow-inner">
          V
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-white leading-none">
            Vynlo
          </h1>
          <span className="text-[11px] text-zinc-500 font-medium tracking-wide">
            ENTERPRISE CRM
          </span>
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
                  ? "bg-zinc-900 text-white shadow-sm border border-zinc-800/60"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-white" : "text-zinc-500"}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Lower Sidebar System Tray */}
      <div className="border-t border-zinc-900 pt-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-500 transition duration-200 hover:text-red-400 hover:bg-red-500/5"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
