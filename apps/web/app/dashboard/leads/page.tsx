"use client";

import { useEffect, useState } from "react";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import Modal from "@/src/components/ui/modal";
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
  Briefcase 
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await getLeads(token);
        setLeads(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  async function handleCreateLead(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const newLead = await createLead(token, {
        name,
        email,
        phone,
      });

      setLeads((prev) => [newLead, ...prev]);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper utility to style dynamic status markers cleanly
  const getStatusStyle = (status: string) => {
    const normal = status?.toLowerCase() || '';
    if (normal.includes('new') || normal.includes('won')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
    if (normal.includes('progress') || normal.includes('contacted')) {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
    return 'bg-zinc-500/10 text-zinc-400 border-zinc-800';
  };

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
          <h1 className="text-2xl font-bold tracking-tight text-white">Leads Pipeline</h1>
          <p className="text-sm text-zinc-400">Qualify, monitor, and convert pipeline deals.</p>
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
        <Button variant="secondary" size="sm" icon={<SlidersHorizontal size={14} />}>
          Filters
        </Button>
      </div>

      {/* Creation Modal Element */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Create Lead</h2>
            <p className="text-sm text-zinc-400">Add operational points to your sales framework.</p>
          </div>

          <form onSubmit={handleCreateLead} className="space-y-4">
            <Input
              label="Lead Name"
              type="text"
              required
              placeholder="E.g. Acme Corporation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              icon={<User size={16} />}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="pointofcontact@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              icon={<Mail size={16} />}
            />

            <Input
              label="Phone Connection"
              type="text"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
              icon={<Phone size={16} />}
            />

            <div className="mt-6 flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Add Lead
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Leads Content Wrapper */}
      {leads.length === 0 ? (
        <Card hoverEffect={false} className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-500">
            <Briefcase size={22} />
          </div>
          <h3 className="text-sm font-semibold text-zinc-200">No leads captured</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
            Get started by initializing your baseline customer log using the primary builder option above.
          </p>
        </Card>
      ) : (
        <Card hoverEffect={false} className="overflow-x-auto border-zinc-900 bg-zinc-950/20">
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
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide shadow-sm capitalize ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}