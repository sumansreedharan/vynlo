import { useEffect, useState } from "react";
import type { Lead } from "../types/leads.types";
import { getLeads } from "@/src/services/leads.service";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const token = localStorage.getItem("token");

        // if (!token) return;
        if (!token) {
          setLoading(false);
          return;
        }

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

  const addLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return {
    leads,
    loading,
    addLead,
  };
}
