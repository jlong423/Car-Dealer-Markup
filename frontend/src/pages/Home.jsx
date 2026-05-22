import { useState } from "react";
import { Link, useNavigate } from "react-router";
import SearchForm from "../components/SearchForm";
import ResultsTable from "../components/ResultsTable";
import { searchCars } from "../api/cars";

export default function Home() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      setError("");
      const data = await searchCars(filters);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <>
      {/* ── Top navbar ───────────────────────────────────── */}
      <nav className="site-nav">
        <span className="site-nav-brand">CDM Search</span>
        <div className="site-nav-actions">
          {!token ? (
            <>
              <Link to="/login" className="site-nav-link">
                Login
              </Link>
              <Link
                to="/register"
                className="site-nav-link site-nav-link--primary"
              >
                Register
              </Link>
            </>
          ) : (
            <button className="site-nav-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ── Page content ─────────────────────────────────── */}
      <div className="home-page">
        <h1>Car Dealer Markup Search</h1>

        <SearchForm onSearch={handleSearch} />

        {loading && <p className="loading-state">Searching inventory…</p>}
        {error && <p className="error-state">{error}</p>}

        {!loading && !error && (
          <div className="results-wrap">
            <ResultsTable token={token} results={results} />
          </div>
        )}
      </div>
    </>
  );
}
