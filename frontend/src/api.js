const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : {};

  if (!response.ok) {
    throw new Error(payload?.message || 'Erreur serveur');
  }

  return payload;
}

export const api = {
  createVisiteur: (data) =>
    request('/visiteurs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getVisiteurs: () => request('/visiteurs'),
  updateVisiteur: (numeroVisiteur, data) =>
    request(`/visiteurs/${numeroVisiteur}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  deleteVisiteur: (numeroVisiteur) =>
    request(`/visiteurs/${numeroVisiteur}`, {
      method: 'DELETE',
    }),
  getBilan: () => request('/visiteurs/bilan'),
};

