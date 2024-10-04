import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userServices";
import "./Login.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];

        if (user.password === password) {
          localStorage.setItem(
            "chrono_user",
            JSON.stringify({
              id: user.id,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid password");
        }
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-container">
      <section className="glass-card">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">ChronoSync</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="password"
                value={password}
                className="auth-form-input"
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit" className="auth-button">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>

        <section className="register-link">
          Not a member? <Link to="/register">Click here to sign up.</Link>
        </section>
      </section>
    </main>
  );
};
