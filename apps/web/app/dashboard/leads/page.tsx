"use client";

import { useEffect, useState } from "react";
import Button from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getLeads, createLead } from "@/src/services/leads.service";
import {
  User,
  Mail,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Loader2,
  Briefcase,
} from "lucide-react";
import type { Lead } from "@/src/features/leads/types/leads.types";
import LeadsTable from "@/src/components/leads/leads-table";
import CreateLeadModal from "@/src/components/leads/create-lead-modal";
import { useLeads } from "@/src/features/leads/hooks/use-leads";

export default function LeadsPage() {
  const { leads, loading, addLead } = useLeads();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          <span>Syncing pipeline accounts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header Layout Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Leads Pipeline
          </h1>
          <p className="text-sm text-zinc-400">
            Qualify, monitor, and convert pipeline deals.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setOpen(true)}
          icon={<Plus size={16} />}
        >
          Create Lead
        </Button>
      </div>

      {/* Sub-Header Utility Utility Bar */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-900 bg-zinc-950/40 p-3 backdrop-blur-sm">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Filter leads database..."
            className="w-full rounded-lg border border-zinc-900 bg-zinc-900/20 py-1.5 pl-9 pr-4 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition focus:border-zinc-800 focus:bg-zinc-900/40"
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<SlidersHorizontal size={14} />}
        >
          Filters
        </Button>
      </div>
      <CreateLeadModal
        open={open}
        onClose={() => setOpen(false)}
         onLeadCreated={addLead}
      />

      {/* Leads Content Wrapper */}
      {leads.length === 0 ? (
        <Card
          hoverEffect={false}
          className="flex flex-col items-center justify-center p-12 text-center"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-500">
            <Briefcase size={22} />
          </div>
          <h3 className="text-sm font-semibold text-zinc-200">
            No leads captured
          </h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
            Get started by initializing your baseline customer log using the
            primary builder option above.
          </p>
        </Card>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </div>
  );
}
