import { useEffect, useMemo, useRef } from "react";

const IG_LAYOUT_WIDTH = 326;

function toEmbedSrc(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("instagram.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    const kind = parts[0] === "reels" ? "reel" : parts[0];
    const shortcode = parts[1];
    if (!shortcode || !["p", "reel", "tv"].includes(kind)) return null;
    return `https://www.instagram.com/${kind}/${shortcode}/embed/`;
  } catch {
    return null;
  }
}

export default function InstagramEmbed({ url }) {
  const rootRef = useRef(null);
  const src = useMemo(() => toEmbedSrc(url), [url]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !src) return undefined;

    const syncScale = () => {
      const size = root.clientWidth;
      root.style.setProperty(
        "--ig-scale",
        size > 0 ? String(size / IG_LAYOUT_WIDTH) : "1",
      );
    };

    syncScale();
    const observer = new ResizeObserver(syncScale);
    observer.observe(root);
    return () => observer.disconnect();
  }, [src]);

  if (!src) {
    return <div className="ig-embed ig-embed-empty" aria-hidden="true" />;
  }

  return (
    <div className="ig-embed" ref={rootRef}>
      <div className="ig-embed-crop">
        <iframe
          src={src}
          title="Instagram post"
          loading="lazy"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="ig-embed-iframe"
        />
      </div>
    </div>
  );
}
