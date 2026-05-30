import { TrendingUp } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Workspace Overview
        </h1>
        <p className="text-sm text-zinc-400">
          Here is how your pipeline looks today.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 border border-zinc-800 bg-zinc-900/30 px-3 py-2 rounded-lg backdrop-blur">
        <TrendingUp size={14} className="text-emerald-500" />
        <span>Updated real-time</span>
      </div>
    </div>
  );
}
