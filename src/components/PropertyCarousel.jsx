import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import PropertyCard from "./PropertyCard";

function circularOffset(index, active, length) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function PropertyCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const previousOffsets = useRef(
    items.map((_, i) => circularOffset(i, 0, items.length)),
  );

  const next = useCallback(() => {
    setIndex((i) => {
      console.log("Shub", i, (i + 1) % items.length);
      return (i + 1) % items.length;
    });
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const id = window.setInterval(next, 3000);
    return () => window.clearInterval(id);
  }, [paused, next, items.length]);

  useEffect(() => {
    previousOffsets.current = items.map((_, i) =>
      circularOffset(i, index, items.length),
    );
  }, [index, items]);

  const dragX = useRef(null);

  function onPointerDown(event) {
    dragX.current = event.clientX;
  }

  function onPointerUp(event) {
    if (dragX.current == null) return;
    const delta = event.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  }

  if (items.length === 0) return null;

  return (
    <section
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Featured properties"
    >
      <div
        className="carousel-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {items.map((property, i) => {
          const offset = circularOffset(i, index, items.length);
          const abs = Math.abs(offset);
          const jumped = Math.abs(offset - previousOffsets.current[i]) > 1;
          const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68;

          return (
            <div
              key={property.id}
              className={[
                "carousel-slide",
                offset === 0 ? "is-active" : "",
                abs > 1 ? "is-far" : "",
                jumped ? "is-jump" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                "--offset": offset,
                "--depth": abs === 0 ? 80 : abs === 1 ? -140 : -280,
                "--scale": scale,
                "--blur": abs === 0 ? "0px" : abs === 1 ? "3px" : "8px",
                "--opacity": abs === 0 ? 1 : abs === 1 ? 0.72 : 0,
                zIndex: 10 - abs,
              }}
              aria-hidden={offset !== 0}
              onClick={() => {
                if (offset !== 0) setIndex(i);
              }}
            >
              <PropertyCard property={property} interactive={offset === 0} />
            </div>
          );
        })}
      </div>

      <div className="carousel-bar">
        <div className="carousel-bar-spacer" aria-hidden="true" />
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn prev"
            onClick={prev}
            aria-label="Previous property"
          >
            ‹
          </button>
          <div
            className="carousel-dots"
            role="tablist"
            aria-label="Property slides"
          >
            {items.map((property, i) => (
              <button
                key={property.id}
                type="button"
                className={`carousel-dot ${i === index ? "is-active" : ""}`}
                aria-label={`Show ${property.location}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn next"
            onClick={next}
            aria-label="Next property"
          >
            ›
          </button>
        </div>
        <Link to="/properties" className="btn btn-dark carousel-all">
          View all listings
        </Link>
      </div>
    </section>
  );
}
