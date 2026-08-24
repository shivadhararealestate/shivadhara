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
          <h4>Shivadhara RealEstates</h4>
          <p>
            Thoughtful property sales across Uttarakhand — with local knowledge
            you can rely on.
          </p>
        </div>

        <div className="footer-col">
          <h5>Visit</h5>
          <Link to="/">Featured listings</Link>
          <Link to="/properties">All properties</Link>
          <Link to="/contact">Book a consultation</Link>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <a href="tel:+917983708067" className="footer-contact">
            <PhoneIcon size={16} />
            +91 79837 08067
          </a>
          <a
            href="mailto:shivadhararealestate@gmail.com"
            className="footer-contact"
          >
            <MailIcon size={16} />
            shivadhararealestate@gmail.com
          </a>
          <div className="socials">
            <a
              href="https://www.instagram.com/shivadhara.realestate/"
              aria-label="Instagram"
              className="social-icon"
              target="_blank"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/1BkmpuzTNn/"
              aria-label="Facebook"
              className="social-icon"
              target="_blank"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Shivadhara RealEstates. All rights
        reserved.
      </p>
    </footer>
  );
}
