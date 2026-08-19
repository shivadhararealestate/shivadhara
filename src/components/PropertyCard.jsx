import { Link } from "react-router-dom";
import InstagramEmbed from "./InstagramEmbed";

export default function PropertyCard({ property, interactive = true }) {
  return (
    <article className="card">
      <div className="card-media">
        <InstagramEmbed url={property.instagram} />
        <span className="card-badge">Premium plot</span>
      </div>
      <div className="card-body">
        <h3>{property.location}</h3>
        <div className="card-meta">
          <p>
            Area
            <strong>{property.area} sq. yard</strong>
          </p>
          <p>
            Dimensions
            <strong>{property.dimensions}</strong>
          </p>
        </div>
        <div className="card-actions">
          <a
            href={property.instagram}
            target="_blank"
            rel="noreferrer"
            className="instagram-link"
            tabIndex={interactive ? 0 : -1}
          >
            View on Instagram
          </a>
          <Link
            to="/contact"
            className="btn btn-primary"
            tabIndex={interactive ? 0 : -1}
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}
