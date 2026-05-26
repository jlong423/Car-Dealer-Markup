import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../api/favorites";

export default function FavoriteToggle({ carId, initialFavorite }) {
  console.log(carId);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  async function toggle(carId) {
    try {
      if (isFavorite) {
        await removeFavorite(carId);
        setIsFavorite(false);
      } else {
        await addFavorite(carId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  }
  return (
    <button
      onClick={() => toggle(carId)}
      style={{
        fontSize: "1.5rem",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
}
