import type { Lead } from "../../features/leads/types/leads.types";
import Input from "../ui/input";
import Modal from "../ui/modal";
import Button from "@/src/components/ui/button";
import { updateLead } from "@/src/services/leads.service";
import { useEffect, useState } from "react";

type EditLeadModalProps = {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
  onLeadUpdated: (lead: Lead) => void;
};

export default function EditLeadModal({
  open,
  onClose,
  lead,
  onLeadUpdated,
}: EditLeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!lead) return;

    setName(lead.name || "");
    setEmail(lead.email || "");
    setPhone(lead.phone || "");
  }, [lead]);

  async function handleUpdateLead(e: React.FormEvent) {
    e.preventDefault();
    console.log("UPDATE CLICKED");

    if (!lead) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const updatedLead = await updateLead(token, lead.id, {
        name,
        email,
        phone,
      });

      onLeadUpdated(updatedLead);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Edit Lead</h2>

        <form onSubmit={handleUpdateLead} className="mt-6 space-y-4">
          <Input
            label="Lead Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
