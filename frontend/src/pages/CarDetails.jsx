import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`${API_URL}/cars/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Failed to load car", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading)
    return (
      <div className="details-status-page">
        <p className="loading-state">Loading vehicle details…</p>
      </div>
    );

  if (error || !car)
    return (
      <div className="details-status-page">
        <p className="error-state">Vehicle not found.</p>
      </div>
    );
  console.log(car);

  return (
    <div className="details-page">
      {/* ── Back nav ─────────────────────────────────────── */}
      <button className="details-back-btn" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      {/* ── Hero image ───────────────────────────────────── */}
      <div className="details-hero">
        <img
          src={`${API_URL}/images/${car.image_slug}`}
          alt={`${car.make} ${car.model}`}
          className="details-hero-img"
        />
        <div className="details-hero-overlay" />
        <div className="details-hero-caption">
          <p className="details-hero-eyebrow">
            {car.year} · {car.make}
          </p>
          <h1 className="details-hero-title">
            {car.model} <span>{car.trim}</span>
          </h1>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="details-body">
        {/* MSRP callout */}
        <div className="details-msrp-band">
          <div className="details-msrp-item">
            <span className="details-msrp-label">MSRP</span>
            <span className="details-msrp-value">
              ${Number(car.msrp).toLocaleString()}
            </span>
          </div>
          <div className="details-msrp-divider" />
          <div className="details-msrp-item">
            <span className="details-msrp-label">Year</span>
            <span className="details-msrp-value">{car.year}</span>
          </div>
          <div className="details-msrp-divider" />
          <div className="details-msrp-item">
            <span className="details-msrp-label">Trim</span>
            <span className="details-msrp-value">{car.trim || "—"}</span>
          </div>
        </div>

        {/* Spec grid */}
        <div className="details-section">
          <h2 className="details-section-title">Vehicle Specifications</h2>
          <div className="details-specs-grid">
            <div className="details-spec-card">
              <span className="details-spec-label">Make</span>
              <span className="details-spec-value">{car.make}</span>
            </div>

            <div className="details-spec-card">
              <span className="details-spec-label">Model</span>
              <span className="details-spec-value">{car.model}</span>
            </div>

            <div className="details-spec-card">
              <span className="details-spec-label">Trim</span>
              <span className="details-spec-value">{car.trim || "—"}</span>
            </div>

            <div className="details-spec-card">
              <span className="details-spec-label">Year</span>
              <span className="details-spec-value">{car.year}</span>
            </div>

            <div className="details-spec-card">
              <span className="details-spec-label">Horsepower</span>
              <span className="details-spec-value">
                {car.hp ? (
                  <>
                    {car.hp} <em>hp</em>
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>

            <div className="details-spec-card">
              <span className="details-spec-label">Torque</span>
              <span className="details-spec-value">
                {car.torque ? (
                  <>
                    {car.torque} <em>lb-ft</em>
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>

            <div className="details-spec-card details-spec-card--wide">
              <span className="details-spec-label">Engine</span>
              <span className="details-spec-value">
                {car.engine_spec || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
