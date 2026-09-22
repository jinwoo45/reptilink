"use client";

import { useEffect, useId, useRef } from "react";

/**
 * The only figurative image on the network, and the only thing on it that looks
 * back. Vector, so it stays sharp and weightless.
 *
 * - it follows the pointer, and drifts in saccades when nobody moves
 * - it blinks, and a nictitating membrane crosses it now and then
 * - `awake` dilates the pupil; `recognised` is reserved for the moment a reader
 *   declares itself REPTILIAN
 *
 * All of it stands down under prefers-reduced-motion.
 */
export default function ReptilianEye({
  awake = false,
  recognised = false,
  className,
}: {
  awake?: boolean;
  recognised?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  // Ids are scoped per instance so two eyes on one page do not fight over defs.
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const look = (x: number, y: number) => {
      el.style.setProperty("--eye-x", `${x}px`);
      el.style.setProperty("--eye-y", `${y}px`);
    };

    let idle = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width * 0.85);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height * 1.1);
      look(
        Math.max(-1, Math.min(1, dx)) * 24,
        Math.max(-1, Math.min(1, dy)) * 11
      );
      el.dataset.tracking = "true";
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        el.dataset.tracking = "false";
      }, 2600);
    };

    // Left alone, it does not go still — it scans.
    const saccade = window.setInterval(() => {
      if (el.dataset.tracking === "true") return;
      look((Math.random() * 2 - 1) * 17, (Math.random() * 2 - 1) * 7);
    }, 2900);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(saccade);
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className={`eye${className ? ` ${className}` : ""}`}
      data-awake={awake ? "true" : "false"}
      data-recognised={recognised ? "true" : "false"}
      role="img"
      aria-label="A reptilian eye with a vertical slit pupil, watching"
    >
      <defs>
        <radialGradient id={`iris-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d8ff6b" />
          <stop offset="34%" stopColor="#b6ff00" />
          <stop offset="72%" stopColor="#4d7a00" />
          <stop offset="100%" stopColor="#12250a" />
        </radialGradient>

        <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b6ff00" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#b6ff00" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`nict-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e7e4db" stopOpacity="0" />
          <stop offset="45%" stopColor="#cfe9a8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e7e4db" stopOpacity="0" />
        </linearGradient>

        {/* Scales: one teardrop, tiled. */}
        <pattern
          id={`scales-${uid}`}
          width="22"
          height="19"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(6)"
        >
          <path
            d="M11 1c6 0 10 4 10 9s-4 9-10 9-10-4-10-9 4-9 10-9z"
            fill="none"
            stroke="#2f3a1c"
            strokeWidth="1"
          />
          <path
            d="M22 10.5c6 0 10 4 10 9M0 10.5c-6 0-10 4-10 9"
            fill="none"
            stroke="#2f3a1c"
            strokeWidth="1"
          />
        </pattern>

        <clipPath id={`lid-${uid}`}>
          <path d="M18 200C90 96 310 96 382 200 310 304 90 304 18 200Z" />
        </clipPath>

        <linearGradient id={`lidShade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.75" />
          <stop offset="38%" stopColor="#000" stopOpacity="0" />
          <stop offset="72%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Instrument rings — the eye is being observed, not just shown. */}
      <g stroke="#1c1c1a" fill="none">
        <circle cx="200" cy="200" r="186" />
        <circle cx="200" cy="200" r="150" strokeDasharray="2 9" />
        <path d="M200 6v46M200 348v46M6 200h46M348 200h46" />
      </g>

      <circle className="eye__glow" cx="200" cy="200" r="150" fill={`url(#glow-${uid})`} />

      <g className="eye__globe">
        <g clipPath={`url(#lid-${uid})`}>
          <rect x="0" y="0" width="400" height="400" fill="#0a0d06" />
          <rect x="0" y="0" width="400" height="400" fill={`url(#scales-${uid})`} />

          <g className="eye__iris">
            <circle cx="200" cy="200" r="86" fill={`url(#iris-${uid})`} />

            <g stroke="#0d1a00" strokeOpacity="0.55" strokeWidth="1.4">
              {/* Fixed precision: raw doubles serialize differently on the
                  server and in the browser, which trips hydration. */}
              {Array.from({ length: 48 }, (_, i) => {
                const a = (i / 48) * Math.PI * 2;
                const at = (r: number, fn: (v: number) => number) =>
                  (200 + fn(a) * r).toFixed(3);
                return (
                  <line
                    key={i}
                    x1={at(34, Math.cos)}
                    y1={at(34, Math.sin)}
                    x2={at(86, Math.cos)}
                    y2={at(86, Math.sin)}
                  />
                );
              })}
            </g>

            <ellipse
              className="eye__pupil"
              cx="200"
              cy="200"
              rx="15"
              ry="74"
              fill="#040604"
            />

            <ellipse
              cx="168"
              cy="164"
              rx="26"
              ry="15"
              fill="#e7e4db"
              opacity="0.3"
              transform="rotate(-24 168 164)"
            />
            <circle cx="236" cy="240" r="7" fill="#e7e4db" opacity="0.14" />
          </g>

          {/* Nictitating membrane. */}
          <rect
            className="eye__nict"
            x="0"
            y="0"
            width="400"
            height="400"
            fill={`url(#nict-${uid})`}
          />

          <rect x="0" y="0" width="400" height="400" fill={`url(#lidShade-${uid})`} />
        </g>

        <path
          d="M18 200C90 96 310 96 382 200 310 304 90 304 18 200Z"
          fill="none"
          stroke="#b6ff00"
          strokeWidth="1.6"
          strokeOpacity="0.55"
        />
        <path
          d="M18 200C90 96 310 96 382 200"
          fill="none"
          stroke="#b6ff00"
          strokeWidth="2.6"
          strokeOpacity="0.9"
        />
      </g>

      {/* Brow ridge scales. */}
      <g stroke="#b6ff00" strokeOpacity="0.28" fill="none" strokeWidth="1.2">
        <path d="M44 176c30-42 84-70 156-70s126 28 156 70" />
        <path d="M66 160c30-36 78-60 134-60s104 24 134 60" />
      </g>
    </svg>
  );
}
