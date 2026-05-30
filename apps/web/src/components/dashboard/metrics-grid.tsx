import {
  ArrowDownRight,
  ArrowUpRight,
  CheckSquare,
  UserPlus,
  Users,
} from "lucide-react";
import { CardContent, Card } from "../ui/card";
const metrics = [
  {
    title: "Total Leads",
    value: "128",
    change: "+12%",
    trend: "up",
    icon: Users,
  },

  {
    title: "Tasks Pending",
    value: "24",
    change: "-3%",
    trend: "down",
    icon: CheckSquare,
  },

  {
    title: "New Contacts",
    value: "56",
    change: "+24%",
    trend: "up",
    icon: UserPlus,
  },
];

export default function MetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {metric.title}
                </span>

                <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/40 p-2 text-zinc-300">
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {metric.value}
                </span>

                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    metric.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}

                  {metric.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-zinc-500">vs last week</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
