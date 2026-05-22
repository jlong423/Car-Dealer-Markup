// import React from "react";
// import { useNavigate, Navigate } from "react-router";
// const API_URL = import.meta.env.VITE_API_URL;

// function Login() {
//   const navigate = useNavigate();
//   async function submitForm(formData) {
//     const username = formData.get("username");
//     const password = formData.get("password");

//     try {
//       const response = await fetch(`${API_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       if (!response.ok) {
//         throw new Error("Bad response");
//       }
//       const json = await response.json();
//       console.log(json);

//       localStorage.setItem("token", json.token);
//       navigate("/");
//     } catch (err) {
//       console.error("Something went wrong", err);
//     }
//   }

//   const token = localStorage.getItem("token");
//   console.log(token);
//   if (token) return <Navigate to="/" replace />;

//   return (
//     <div>
//       <form
//         form
//         onSubmit={(e) => {
//           e.preventDefault();
//           submitForm(new FormData(e.target));
//         }}
//       >
//         <label>
//           User Name
//           <input type="text" required name="username" />
//         </label>
//         <label>
//           password
//           <input type="password" required name="password" />
//         </label>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitForm(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Bad response");

      const json = await response.json();
      localStorage.setItem("token", json.token);
      navigate("/");
    } catch (err) {
      console.error("Something went wrong", err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;

  return (
    <div className="auth-page">
      {/* Left panel — branding */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <p className="auth-brand-eyebrow">Welcome Back</p>
          <h1 className="auth-brand-title">
            Car Dealer
            <br />
            <span>Markup</span>
            <br />
            Search
          </h1>
          <p className="auth-brand-sub">
            Transparency in every transaction. Know what dealers pay — and what
            you should.
          </p>
          <div className="auth-brand-rule" />
          <p className="auth-brand-tagline">
            Trusted data. Smarter negotiations.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Sign In</h2>
            <p className="auth-form-subtitle">
              Access your account to save searches and track favourites.
            </p>
          </div>

          {error && <p className="error-state">{error}</p>}

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(new FormData(e.target));
            }}
          >
            <div className="auth-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="Enter your username"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>

          <Link to="/" className="auth-back-link">
            ← Back to search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
