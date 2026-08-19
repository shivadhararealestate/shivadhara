import {
  InstagramIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon,
} from "../components/icons";

export default function Contact() {
  return (
    <div className="page contact-page">
      <div className="container">
        <div className="contact-hero">
          <p className="eyebrow">Get in touch</p>
          <h1>Let’s find the right plot together.</h1>
          <p>
            Share a few details and we’ll get back within one business day with
            availability and next steps.
          </p>
        </div>

        <div className="contact-grid">
          <section className="contact-card">
            <h2>Studio</h2>
            <div className="contact-list">
              <div className="contact-item">
                <span>Phone</span>
                <a href="tel:+919876543210" className="contact-item-link">
                  <PhoneIcon size={16} />
                  +91 98765 43210
                </a>
              </div>
              <div className="contact-item">
                <span>Email</span>
                <a href="mailto:hello@shivadhara.com" className="contact-item-link">
                  <MailIcon size={16} />
                  hello@shivadhara.com
                </a>
              </div>
              <div className="contact-item">
                <span>Hours</span>
                <p>Mon–Sat, 10:00–18:00 IST</p>
              </div>
            </div>
            <div className="social-row">
              <a href="#" className="social-link">
                <InstagramIcon size={16} />
                Instagram
              </a>
              <a href="#" className="social-link">
                <FacebookIcon size={16} />
                Facebook
              </a>
            </div>
          </section>

          <section className="contact-form">
            <h2>Send a message</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="interest">I’m interested in</label>
                <input
                  id="interest"
                  name="interest"
                  type="text"
                  placeholder="City, plot size, or listing"
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you’re looking for"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Request a callback
              </button>
              <p className="form-note">
                This form is for enquiries only. We’ll never share your details.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
