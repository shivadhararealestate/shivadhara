import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const cropLogo = {
    width: "200px",
    height: "80px",
    scale: 1.7,
    objectFit: "cover",
    objectPosition: "center",
    position: "relative",
    cursor: "pointer",
  };
  return (
    <header className="nav">
      <div className="nav-inner">
        {/* <Link to="/" className="brand"> */}
        {/* //   */}

        <img
          src={logo}
          alt="Shivadhara RealEstates"
          className="logo"
          //Write a style that crops the top and bottom 30% of the logo such that a horizontal strip of the middle 40% is left. Also crop the left and right 20% of the logo. such that only the middle 60% of the logo left vertically is left.
          style={cropLogo}
          onClick={() => (window.location.href = "/")}
        />
        {/* <span className="brand-mark">S</span>
          <span className="brand-text">
            <strong>Shivadhara</strong>
            <span>RealEstates</span>
          </span> */}
        {/* </Link> */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              isActive ? "is-active nav-keep" : "nav-keep"
            }
          >
            Properties
          </NavLink>

          <NavLink to="/contact" className="nav-cta">
            Enquire
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
