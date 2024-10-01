import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.jpg";
import "./NavBar.css";

export const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleDropdown}>
          &#9776; Menu
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <Link to="/" onClick={toggleDropdown}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calendar" onClick={toggleDropdown}>
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/groups" onClick={toggleDropdown}>
                  My Groups
                </Link>
              </li>
              <li>
                <Link to="/myschedule" onClick={toggleDropdown}>
                  My Schedule
                </Link>
              </li>
              <li>
                <Link to="/createevent" onClick={toggleDropdown}>
                  Create Event
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="title">
        <h1 className="chronosync-title">
          <span className="chrono-part">Chrono</span>
          <span className="sync-part">Sync</span>
          <img src={logo} alt="ChronoSync Logo" className="logo-img" />
        </h1>
      </div>

      {localStorage.getItem("chrono_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("chrono_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : null}
    </nav>
  );
};
