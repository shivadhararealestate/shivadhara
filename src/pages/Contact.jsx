import { useState } from "react";
import {
  InstagramIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon,
} from "../components/icons";
import { supabase } from "../lib/supabaseClient";

function collectBrowserMetadata() {
  const nav = navigator;
  const screen = window.screen;
  return {
    user_agent: nav.userAgent || null,
    language: nav.language || nav.userLanguage || null,
    platform: nav.platform || null,
    screen: screen
      ? `${screen.width}x${screen.height}`
      : `${window.innerWidth}x${window.innerHeight}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    referrer: document.referrer || null,
    page_url: window.location.href,
  };
}

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      interest: String(formData.get("interest") || "").trim() || null,
      message: String(formData.get("message") || "").trim() || null,
      ...collectBrowserMetadata(),
    };

    if (!payload.name || !payload.email) {
      setStatus("error");
      setErrorMsg("Please provide your name and email.");
      return;
    }

    const { error } = await supabase.from("enquiries").insert([payload]);

    if (error) {
      setStatus("error");
      setErrorMsg(
        "We couldn’t send your message right now. Please try again or email us directly.",
      );
      return;
    }

    setStatus("success");
    form.reset();
  }

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
            <h2>Office</h2>
            <div className="contact-list">
              <div className="contact-item">
                <span>Phone</span>
                <a href="tel:+917983708067" className="contact-item-link">
                  <PhoneIcon size={16} />
                  +91 79837 08067
                </a>
              </div>
              <div className="contact-item">
                <span>Email</span>
                <a
                  href="mailto:shivadhararealestate@gmail.com"
                  className="contact-item-link"
                >
                  <MailIcon size={16} />
                  shivadhararealestate@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span>Address</span>
                <p>
                  Shivadhara RealEstates, <br />
                  Nehru Colony, <br />
                  Dehradun, Uttarakhand 248001
                </p>
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
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={status === "submitting"}
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
                  disabled={status === "submitting"}
                />
              </div>
              <div className="form-row">
                <label htmlFor="interest">I’m interested in</label>
                <input
                  id="interest"
                  name="interest"
                  type="text"
                  placeholder="City, plot size, or listing"
                  disabled={status === "submitting"}
                />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you’re looking for"
                  disabled={status === "submitting"}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Request a callback"}
              </button>
              {status === "success" && (
                <p className="form-feedback form-feedback-success">
                  Thank you — your enquiry has been sent. We’ll be in touch
                  within one business day.
                </p>
              )}
              {status === "error" && (
                <p className="form-feedback form-feedback-error">
                  {errorMsg}
                </p>
              )}
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
