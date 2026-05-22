const API_URL = import.meta.env.VITE_API_URL;

// GET /STATES/:STATEID/MARKUPS
export async function getStateMarkups(stateId) {
  const res = await fetch(`${API_URL}/states/${stateId}/markups`);

  if (!res.ok) {
    throw new Error("Failed to fetch markup data for this state");
  }

  return res.json();
}

// GET /MARKUPS/CAR/:CARID/YEARS
export async function getMarkupByCarAcrossYears(carId) {
  const res = await fetch(`${API_URL}/markups/car/${carId}/years`);

  if (!res.ok) {
    throw new Error("Failed to fetch markup history for this car");
  }

  return res.json();
}

// GET /MARKUPS/CAR/:CARID/STATE/:STATEID
export async function getMarkupByCarAndState(carId, stateId) {
  const res = await fetch(`${API_URL}/markups/car/${carId}/state/${stateId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch markup for this car and state");
  }

  return res.json();
}
