import { useMemo } from "react";

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
  const src = useMemo(() => toEmbedSrc(url), [url]);

  if (!src) {
    return <div className="ig-embed ig-embed-empty" aria-hidden="true" />;
  }

  return (
    <div className="ig-embed">
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
