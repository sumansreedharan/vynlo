import api from "../lib/axios";

export async function getLeads(
  token: string,
) {
  const response = await api.get('/leads', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

type CreateLeadData = {
  name: string;

  email?: string;

  phone?: string;
};

export async function createLead(
  token: string,
  data: CreateLeadData,
) {
  const response = await api.post(
    '/leads',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}