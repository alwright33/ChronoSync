import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userServices";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const registerNewCustomer = () => {
    const newCustomer = {
      ...customer,
    };

    setLoading(true); // Start loading
    createUser(newCustomer)
      .then((createdCustomer) => {
        if (createdCustomer.hasOwnProperty("id")) {
          localStorage.setItem(
            "thorn_user",
            JSON.stringify({
              id: createdCustomer.id,
            })
          );

          navigate("/");
        }
      })
      .catch((error) => {
        setError("Failed to register. Please try again later.");
      })
      .finally(() => setLoading(false)); // End loading
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    getUserByEmail(customer.email)
      .then((response) => {
        if (response.length > 0) {
          window.alert("An account with this email already exists.");
        } else {
          registerNewCustomer();
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <main className="auth-container">
      <section className="glass-card">
        <form className="auth-form" onSubmit={handleRegister}>
          <h1 className="header">ChronoSync</h1>
          <h2>Please Register</h2>
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <p>Registering...</p>
          ) : (
            <>
              <fieldset className="auth-fieldset">
                <div>
                  <input
                    onChange={updateCustomer}
                    type="text"
                    id="firstName"
                    className="auth-form-input"
                    placeholder="First Name"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
              <fieldset className="auth-fieldset">
                <div>
                  <input
                    onChange={updateCustomer}
                    type="text"
                    id="lastName"
                    className="auth-form-input"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="auth-fieldset">
                <div>
                  <input
                    onChange={updateCustomer}
                    type="email"
                    id="email"
                    className="auth-form-input"
                    placeholder="Email address"
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="auth-fieldset">
                <div>
                  <input
                    onChange={updateCustomer}
                    type="password"
                    id="password"
                    className="auth-form-input"
                    placeholder="Password"
                    required
                  />
                </div>
              </fieldset>
              <fieldset className="auth-fieldset">
                <div>
                  <button type="submit" className="auth-button">
                    Register
                  </button>
                </div>
              </fieldset>
            </>
          )}
        </form>
      </section>
    </main>
  );
};
