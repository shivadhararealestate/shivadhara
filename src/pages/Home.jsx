import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCarousel from "../components/PropertyCarousel";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, location, area, instagram, dimensions")
        .order("id", { ascending: true })
        .limit(6);
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setProperties(data || []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page home">
      <section className="hero-landing">
        <div className="hero-inner">
          <p className="eyebrow">Shivadhara Estates</p>
          <h1>Land and homes, chosen with care.</h1>
          <p>
            Premium plots and residences in well-connected neighbourhoods,
            presented with clarity and trust.
          </p>
          <div className="hero-actions">
            <a href="#featured" className="btn btn-primary">
              View properties
            </a>
            <Link to="/contact" className="btn btn-ghost">
              Talk to an advisor
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>12+</strong>
              <span>Years of local expertise</span>
            </div>
            <div>
              <strong>180+</strong>
              <span>Families settled</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Cities we serve</span>
            </div>
          </div>
        </div>
      </section>

      <section className="properties-section" id="featured">
        <div className="section-head">
          <p className="eyebrow">Featured listings</p>
          <h2>Homes currently in focus</h2>
          <p>
            Browse the collection. The featured listing sits in the centre;
            neighbouring plots stay in view, softly receded.
          </p>
        </div>
        {loading ? (
          <p className="carousel-status">Loading featured properties…</p>
        ) : error ? (
          <p className="carousel-status carousel-error">
            We couldn’t load the listings right now. Please try again later.
          </p>
        ) : (
          <PropertyCarousel items={properties} />
        )}
      </section>

      <section className="highlights">
        <article className="highlight-card">
          <h3>Verified plots</h3>
          <p>
            Clear dimensions, documented ownership, and neighbourhood context
            before you visit the site.
          </p>
        </article>
        <article className="highlight-card">
          <h3>Guided visits</h3>
          <p>
            We arrange walkthroughs around your schedule and help you compare
            locations side by side.
          </p>
        </article>
        <article className="highlight-card">
          <h3>Straightforward advice</h3>
          <p>
            No pressure selling — just practical guidance from people who know
            the local market.
          </p>
        </article>
      </section>
    </div>
  );
}
