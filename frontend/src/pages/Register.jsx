// import React from "react";
// import { useNavigate } from "react-router";
// const API_URL = import.meta.env.VITE_API_URL;

// function Register() {
//   const navigate = useNavigate();

//   async function submitForm(formData) {
//     const username = formData.get("username");
//     const password = formData.get("password");

//     try {
//       const response = await fetch(`${API_URL}/users/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       if (!response.ok) {
//         throw new Error("Bad response");
//       }

//       const json = await response.json();
//       console.log(json);

//       navigate("/login");
//     } catch (err) {
//       console.error("Something went wrong", err);
//     }
//   }

//   return (
//     <div>
//       <form
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

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitForm(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    const confirm = formData.get("confirm");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Bad response");

      const json = await response.json();
      console.log(json);

      navigate("/login");
    } catch (err) {
      console.error("Something went wrong", err);
      setError("Registration failed. That username may already be taken.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      {/* Left: Brand panel */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <p className="auth-brand-eyebrow">Get Started</p>
          <h1 className="auth-brand-title">
            Join the
            <br />
            <span>Smarter</span>
            <br />
            Buyers
          </h1>
          <p className="auth-brand-sub">
            Create a free account to save vehicle searches, track favorites, and
            monitor dealer markups across every state.
          </p>
          <div className="auth-brand-rule" />
          <p className="auth-brand-tagline">
            Free forever. No credit card required.
          </p>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">
              Choose a username and password to get started.
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
                placeholder="Choose a username"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                name="confirm"
                required
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <Link to="/" className="auth-back-link">
            ← Back to search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
