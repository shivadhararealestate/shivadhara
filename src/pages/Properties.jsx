import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { supabase } from "../lib/supabaseClient";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, location, area, instagram, dimensions")
        .order("id", { ascending: true });
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
    <div className="page listings-page">
      <div className="container">
        <div className="listings-hero">
          <p className="eyebrow">All listings</p>
          <h1>Available plots and homes.</h1>
          <p>
            Browse the full collection. Each listing includes size, dimensions,
            and a view of the property from Instagram.
          </p>
        </div>

        {loading ? (
          <p className="carousel-status">Loading properties…</p>
        ) : error ? (
          <p className="carousel-status carousel-error">
            We couldn’t load the listings right now. Please try again later.
          </p>
        ) : properties.length === 0 ? (
          <p className="carousel-status">No listings are available at the moment.</p>
        ) : (
          <>
            <p className="listings-count">
              {properties.length} {properties.length === 1 ? "property" : "properties"}
            </p>
            <div className="property-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
