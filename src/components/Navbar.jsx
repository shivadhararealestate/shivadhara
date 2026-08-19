import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-text">
            <strong>Shivadhara</strong>
            <span>Estates</span>
          </span>
        </Link>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            Contact
          </NavLink>
          <NavLink to="/contact" className="nav-cta">
            Enquire
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
