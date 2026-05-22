const API_URL = import.meta.env.VITE_API_URL;

// HELPER TO ATTACH JWT TOKEN
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ADD A FAVORITE(LOGGED IN USER)
// POST/FAVORITES
export async function addFavorite(carId) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ car_id: carId }),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to add favorite");
  }

  return res.json();
}

// GET FAVORITES FOR LOGGED IN USER
// GET/FAVORITES
export async function getFavorites() {
  const res = await fetch(`${API_URL}/favorites`, {
    headers: {
      ...authHeader(),
    },
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return res.json();
}

// REMOVE A FAVORITE
// DELETE/FAVORITE/:CAR_ID
export async function removeFavorite(carId) {
  const res = await fetch(`${API_URL}/favorites/${carId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });

  if (!res.ok) {
    throw new Error("Failed to remove favorite");
  }
  return res.json();
}
