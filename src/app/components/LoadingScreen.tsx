import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import imgOrionLogo from "@/assets/figma/orion-logo.svg";

// How long the full-screen splash sits still before it starts morphing into
// the navbar logo, and how long that morph itself takes. The morph duration
// is deliberately inside the 600-900ms "feels intentional, not sluggish"
// window for a shared-element transition.
const MIN_DISPLAY_MS = 650;
const TRANSITION_S = 0.9;

// One big blob (index 0) provides full screen coverage on its own; the rest
// are smaller accents scattered around center. Scattering them (instead of
// stacking them all dead-center) is what makes the goo filter read as
// several liquid masses merging/splitting instead of one flat circle.
const BLOBS = [
  { x: 0, y: 0, size: 2.7, delay: 0 },
  { x: -20, y: 14, size: 1.15, delay: 0.06 },
  { x: 18, y: -12, size: 0.95, delay: 0.12 },
  { x: 6, y: 20, size: 0.8, delay: 0.09 },
  { x: -14, y: -18, size: 0.7, delay: 0.15 },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const gooRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const logo = logoRef.current;
      const gooEl = gooRef.current;
      const target = document.getElementById("orion-navbar-logo-img");

      if (!logo || !gooEl || !target) {
        gsap.to(gooEl, { opacity: 0, duration: 0.4, onComplete: () => setVisible(false) });
        return;
      }

      // Manual FLIP for the logo itself: measure its current (huge,
      // centered) rect and the real navbar logo's (small, corner) rect —
      // getBoundingClientRect already accounts for the navbar's own
      // `transform: scale()` sizing — then animate by the delta so it
      // visually "becomes" the navbar logo. Kept outside the goo-filtered
      // layer so it stays crisp while the background around it goes liquid.
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();

      const scaleX = to.width / from.width;
      const scaleY = to.height / from.height;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);

      const tl = gsap.timeline({ onComplete: () => setVisible(false) });

      tl.to(logo, { x: dx, y: dy, scaleX, scaleY, duration: TRANSITION_S, ease: "power3.inOut" }, 0);

      // Each blob drains toward that same point at a slightly different
      // delay/speed. Applying the identical (dx, dy) to every blob — rather
      // than re-centering each on the target — means only the center blob
      // lands exactly on it; the scattered ones arrive near it but offset,
      // so under the goo filter they read as liquid pulling itself together
      // and draining away rather than several shapes shrinking in unison.
      const blobs = gooEl.querySelectorAll<HTMLElement>(".loading-blob");
      blobs.forEach((blob, i) => {
        const cfg = BLOBS[i];
        tl.to(
          blob,
          { x: dx, y: dy, scale: 0.02, duration: TRANSITION_S * 0.95, ease: "power1.inOut" },
          cfg.delay,
        );
      });

      tl.to(gooEl, { opacity: 0, duration: 0.2 }, TRANSITION_S - 0.05);
    }, MIN_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="orion-loading-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="45" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
          </filter>
        </defs>
      </svg>

      <div ref={gooRef} className="absolute inset-0" style={{ filter: "url(#orion-loading-goo)" }}>
        {BLOBS.map((cfg, i) => (
          <div
            key={i}
            className="loading-blob absolute rounded-full"
            style={{
              background: "#251116",
              width: "60vmax",
              height: "60vmax",
              left: `calc(50% + ${cfg.x}vmax - 30vmax)`,
              top: `calc(50% + ${cfg.y}vmax - 30vmax)`,
              transform: `scale(${cfg.size})`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          ref={logoRef}
          src={imgOrionLogo}
          alt="ORION Chocolates"
          className="h-40 w-auto"
          style={{ transformOrigin: "center center" }}
        />
      </div>
    </div>
  );
}
