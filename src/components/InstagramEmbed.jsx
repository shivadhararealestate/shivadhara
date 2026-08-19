import { useEffect, useState } from "react";

let scriptPromise = null;

function loadEmbedScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (window.instgrm) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      'script[src*="instagram.com/embed.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export default function InstagramEmbed({ url }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    loadEmbedScript().then(() => {
      if (cancelled) return;
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="ig-embed">
      {!ready && <div className="ig-embed-placeholder" aria-hidden="true" />}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: 0,
          margin: 0,
          maxWidth: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}
