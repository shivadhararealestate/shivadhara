import { Link } from "react-router-dom";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  PhoneIcon,
  MailIcon,
} from "./icons";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>Shivadhara Estates</h4>
          <p>
            Thoughtful property sales across Bengaluru, Chennai, and Hyderabad —
            with local knowledge you can rely on.
          </p>
        </div>

        <div className="footer-col">
          <h5>Visit</h5>
          <Link to="/">Featured listings</Link>
          <Link to="/contact">Book a consultation</Link>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <a href="tel:+919876543210" className="footer-contact">
            <PhoneIcon size={16} />
            +91 98765 43210
          </a>
          <a href="mailto:hello@shivadhara.com" className="footer-contact">
            <MailIcon size={16} />
            hello@shivadhara.com
          </a>
          <div className="socials">
            <a href="#" aria-label="Instagram" className="social-icon">
              <InstagramIcon size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="social-icon">
              <FacebookIcon size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Shivadhara Estates. All rights reserved.
      </p>
    </footer>
  );
}
