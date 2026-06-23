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

type UpdateLeadData = {
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
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

export async function updateLead(
  token: string,
  id: string,
  data: UpdateLeadData,
) {
  const response = await api.patch(
    `/leads/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}