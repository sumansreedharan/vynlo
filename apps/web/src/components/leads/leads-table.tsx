import type { Lead } from "../../features/leads/types/leads.types";
import { Card } from "../ui/card";

type LeadsTableProps = {
  leads: Lead[];
};

export default function LeadsTable({ leads }: LeadsTableProps) {
  // Helper utility to style dynamic status markers cleanly
  const getStatusStyle = (status: string) => {
    const normal = status?.toLowerCase() || "";
    if (normal.includes("new") || normal.includes("won")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (normal.includes("progress") || normal.includes("contacted")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    return "bg-zinc-500/10 text-zinc-400 border-zinc-800";
  };

  return (
    <Card
      hoverEffect={false}
      className="overflow-x-auto border-zinc-900 bg-zinc-950/20"
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <th className="p-4 pl-6">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4 pr-6 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900/60 text-sm text-zinc-300">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="group transition duration-150 hover:bg-zinc-900/20"
            >
              <td className="p-4 pl-6 font-medium text-zinc-100 group-hover:text-white">
                {lead.name}
              </td>
              <td className="p-4 text-zinc-400 group-hover:text-zinc-300">
                {lead.email || <span className="text-zinc-700">—</span>}
              </td>
              <td className="p-4 text-zinc-400 group-hover:text-zinc-300">
                {lead.phone || <span className="text-zinc-700">—</span>}
              </td>
              <td className="p-4 pr-6 text-right">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide shadow-sm capitalize ${getStatusStyle(lead.status)}`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
