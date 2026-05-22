const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

// Build query string safely
function buildQuery(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      query.append(key, value);
    }
  });

  return query.toString();
}

// GET /CARS/SEARCH
export async function searchCars(filters) {
  const query = buildQuery(filters);
  const res = await fetch(`${API_URL}/cars/search?${query}`);
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }

  const data = await res.json();
  return data;
}

// GET /CAR/:CARID/YEARS
export async function getCarMarkupAcrossYears(carId) {
  const res = await fetch(`${API_URL}/markups/car/${carId}/years`);

  if (!res.ok) {
    throw new Error("Failed to fetch markup across years");
  }
  return res.json();
}

// GET /MARKUPS/CAR/:CARID/STATE/:STATEID
export async function getCarMarkupByState(carId, stateId) {
  const res = await fetch(`${API_URL}/markups/car/${carId}/state/${stateId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch markup for car & state");
  }
  return res.json();
}

// GET/CARS/MAKE
export async function getMakes() {
  const res = await fetch(`${API_URL}/cars/makes`);

  if (!res.ok) {
    throw new Error("Failed to fetch makes");
  }

  return res.json();
}

// GET/CARS/MODELS?MAKE=DODGE
export async function getModels(make) {
  const res = await fetch(`${API_URL}/cars/models?make=${make}`);

  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }
  return res.json();
}

// GET/CARS/YEARS?MAKE=DODGE&MODEL=CHARGER
export async function getYears(make, model) {
  const res = await fetch(`${API_URL}/cars/years?make=${make}&model=${model}`);

  if (!res.ok) {
    throw new Error("Failed to fetch years");
  }

  return res.json();
}
