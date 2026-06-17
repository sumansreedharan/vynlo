import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Modal from "../ui/modal";
import { createLead } from "@/src/services/leads.service";
import { Lead } from "@/src/features/leads/types/leads.types";
import { Mail, Phone, User } from "lucide-react";

type CreateLeadModalProps = {
  open: boolean;
  onClose: () => void;
  onLeadCreated: (lead: Lead) => void;
};

export default function CreateLeadModal({
  open,
  onClose,
  onLeadCreated,
}: CreateLeadModalProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      onLeadCreated(newLead);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-2">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Create Lead
          </h2>
          <p className="text-sm text-zinc-400">
            Add operational points to your sales framework.
          </p>
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
              onClick={onClose}
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
  );
}
