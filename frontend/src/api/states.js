const API_URL = import.meta.env.VITE_API_URL;
// GET STATES
export async function getStates() {
  const res = await fetch(`${API_URL}/states`);

  if (!res.ok) {
    throw new Error("Failed to fetch states");
  }
  return res.json();
}

// GET /STATES/:ID/MARKUPS
export async function getStateMarkups(stateId) {
  const res = await fetch(`${API_URL}/states/${stateId}/markups`);

  if (!res.ok) {
    throw new Error("Failed to get markup data for this state");
  }
  return res.json();
}
