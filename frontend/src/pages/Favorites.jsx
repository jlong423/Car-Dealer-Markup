import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/favorites";
import ResultsTable from "../components/ResultsTable";
import FavoriteToggle from "../components/FavoriteToggle";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  //   LOAD FAVORITE ON MOUNT
  useEffect(() => {
    async function load() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  //   REMOVE A FAVORITE AND REFRESH LIST
  async function handleRemove(carId) {
    await removeFavorite(carId);
    setFavorites((prev) => prev.filter((f) => f.car_id !== carId));
  }

  if (loading) {
    return <p>Loading your favorites...</p>;
  }

  if (!favorites.length) {
    return <p>You have no favorites yet.</p>;
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      <ResultsTable
        results={favorites.map((f) => ({
          ...f,
          removeButton: (
            <FavoriteToggle carId={f.car_id} initialFavorite={true} />
          ),
        }))}
      />
    </div>
  );
}
