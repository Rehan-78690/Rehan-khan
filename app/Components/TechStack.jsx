"use client";
import React from "react";

/**
 * TechMarquee — a seamless, infinite-scrolling row of tech chips.
 * - No heading, just a moving “scroll bar” of your tools.
 * - Blends between a black and greish background to sit nicely between sections.
 * - Pause on hover, supports prefers-reduced-motion, soft edge fade masks.
 */
export default function TechMarquee({
  speedSec = 28,         // lower = faster
  gap = 22,              // px gap between chips
}) {
  // Minimal inline SVGs so it works without external assets.
  // Replace any with your own /public icons (e.g., src="/icons/react.svg")
  const Icon = {
    js:  () => <svg viewBox="0 0 256 256" className="h-6 w-6"><path fill="#f7df1e" d="M0 0h256v256H0z"/><path d="M67 214l20-12c4 7 8 13 17 13 9 0 14-3 14-16v-86h24v87c0 25-15 36-37 36-20 0-32-10-38-22m90-1l20-11c5 9 11 16 22 16 9 0 15-5 15-11 0-8-6-11-17-16l-6-2c-17-7-28-15-28-33 0-16 12-28 31-28 14 0 24 5 31 18l-19 12c-4-7-9-10-16-10-7 0-11 4-11 10 0 7 4 10 15 15l6 2c20 8 31 17 31 35 0 20-15 31-35 31-20 0-33-10-39-23" fill="#000"/></svg>,
    ts:  () => <svg viewBox="0 0 256 256" className="h-6 w-6"><path fill="#3178c6" d="M0 0h256v256H0z"/><path fill="#fff" d="M142 200v-18h27v-86h20v86h26v18zm-86-62h53v18H96v44H76v-44H56z"/></svg>,
    react: () => <svg viewBox="0 0 256 256" className="h-6 w-6"><circle cx="128" cy="128" r="14" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="10"><ellipse cx="128" cy="128" rx="90" ry="36"/><ellipse cx="128" cy="128" rx="90" ry="36" transform="rotate(60 128 128)"/><ellipse cx="128" cy="128" rx="90" ry="36" transform="rotate(120 128 128)"/></g></svg>,
    next: () => <svg viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" rx="24" fill="#111"/><path d="M106 178V78h18v100zm28 0V78h18v56l38 44h-22l-16-20v20z" fill="#fff"/></svg>,
    node: () => <svg viewBox="0 0 256 272" className="h-6 w-6"><path fill="#83CD29" d="M128 .4L11 66v140l117 66 117-66V66z"/><path fill="#fff" d="M128 40l74 42v84l-74 42-74-42V82z"/></svg>,
    python: () => <svg viewBox="0 0 256 255" className="h-6 w-6"><path fill="#387bbc" d="M126 0c62 0 61 27 61 27v24h-61v12h86c0 0 40 4 40 60 0 56-35 64-35 64h-33V146s2-36-60-36H62s-62-1-62-62C0 28 58 0 126 0z"/><path fill="#ffdf5a" d="M130 255c-62 0-61-27-61-27v-24h61v-12H44s-40-4-40-60c0-56 35-64 35-64h33v41s-2 36 60 36h62s62 1 62 62c0 56-58 88-126 88z"/></svg>,
    django: () => <svg viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" rx="24" fill="#092e20"/><path fill="#fff" d="M118 204V55h33v112c0 30-16 37-33 37m78-74V55h33v72c0 30-15 36-33 36-12 0-21-5-26-12 0 0 0 25 0 53h-33V55h33v73c0 12 7 18 17 18s16-6 16-20"/></svg>,
    tailwind: () => <svg viewBox="0 0 256 154" className="h-6 w-6"><path fill="#38bdf8" d="M128 0c-34 0-56 17-66 50 13-17 28-23 46-18 10 2 18 9 26 17 14 13 30 19 46 18 34 0 56-17 66-50-13 17-28 23-46 18-10-2-18-9-26-17C160 5 144-1 128 0zM62 87c-34 0-56 17-66 50 13-17 28-23 46-18 10 2 18 9 26 17 14 13 30 19 46 18 34 0 56-17 66-50-13 17-28 23-46 18-10-2-18-9-26-17-14-13-30-19-46-18z"/></svg>,
    postgres: () => <svg viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" rx="24" fill="#336791"/><path fill="#fff" d="M128 44c42 0 76 26 76 58 0 31-34 57-76 57s-76-26-76-57c0-32 34-58 76-58zm0 32c-25 0-45 12-45 26s20 26 45 26 45-12 45-26-20-26-45-26z"/></svg>,
    git: () => <svg viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" rx="24" fill="#f05133"/><path fill="#fff" d="M205 118l-67-67c-3-3-8-3-11 0l-17 17 19 19a17 17 0 0119 4 17 17 0 014 19l19 19a17 17 0 014 19 17 17 0 01-19 4l-19-19a17 17 0 01-23-23l-19-19-49 49c-3 3-3 8 0 11l67 67c3 3 8 3 11 0l80-80c3-3 3-8 0-11z"/></svg>,
    docker: () => <svg viewBox="0 0 256 192" className="h-6 w-6"><path fill="#2396ed" d="M244 89c-5-4-12-6-20-6-4 0-8 0-12 1-2-8-7-14-14-19l-9-6-6 9c-5 7-7 12-7 19 0 3 0 6 1 8-5 1-11 2-16 2H12c-7 0-12 5-12 12 0 33 27 60 60 60h116c42 0 72-21 80-58 1-3 1-6 1-9 0-6-2-10-5-14zM68 28h36v36H68zM108 28h36v36h-36zM148 28h36v36h-36zM68 68h36v36H68zM108 68h36v36h-36zM28 68h36v36H28z"/></svg>,
    aws: () => <svg viewBox="0 0 256 154" className="h-6S w-6"><path fill="#fff" d="M91 95c-11 0-19-5-24-15l16-9c2 5 5 7 8 7 4 0 6-2 6-7V41h20v30c0 16-10 24-26 24zm86 0c-17 0-28-9-28-25 0-15 11-25 28-25 7 0 13 2 18 6 5 4 8 10 9 17h-20c-1-4-3-7-7-7-6 0-10 4-10 9s4 9 10 9c4 0 6-2 7-7h20c-1 7-4 13-9 17-5 4-11 6-18 6z"/><path fill="#ff9900" d="M35 114c46 21 140 40 224 3-8 8-25 22-49 30-63 23-127 12-175-14-9-5-17-12-24-19 10 4 16 0 24 0z"/></svg>,
  };

  const items = [
    { name: "JavaScript", icon: <Icon.js /> },
    { name: "TypeScript", icon: <Icon.ts /> },
    { name: "React", icon: <Icon.react /> },
    { name: "Next.js", icon: <Icon.next /> },
    { name: "Node.js", icon: <Icon.node /> },
    { name: "Python", icon: <Icon.python /> },
    { name: "Django", icon: <Icon.django /> },
    { name: "Tailwind", icon: <Icon.tailwind /> },
    { name: "PostgreSQL", icon: <Icon.postgres /> },
    { name: "Git", icon: <Icon.git /> },
    { name: "Docker", icon: <Icon.docker /> },
    { name: "AWS", icon: <Icon.aws /> },
  ];

  // Duplicate once for a seamless loop
  const loop = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        // gentle blend between black hero and gray about
        background: "linear-gradient(180deg, #0b0c0f 0%, #121316 100%)",
      }}
    >
      {/* top/bottom hairlines to frame the band */}
      {/* <div className="absolute inset-x-0 top-0 h-px bg-white/10" /> */}
      {/* <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" /> */}

      <div
        className="mx-auto max-w-[1400px] px-4 py-8 sm:py-8"
        // edge fade mask
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="group relative"
          // pause on hover
          style={{ ["--dur"]: `${speedSec}s` }}
        >
          {/* marquee track */}
          <div
            className="flex items-center whitespace-nowrap gap-x-7 sm:gap-x-10 will-change-transform"
            style={{
              animation: "marquee var(--dur) linear infinite",
              animationPlayState: "running",
            }}
          >
            {loop.map((it, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 bg-white/[0.04] ring-1 ring-white/10 text-white/85 hover:bg-white/[0.06] transition"
                style={{ marginRight: `${gap}px` }}
              >
                <span className="shrink-0 opacity-90">{it.icon}</span>
                <span className="text-sm sm:text-base">{it.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Local styles (keyframes + reduced motion + hover pause) */}
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* because we duplicated the content once */
        }
        /* Pause on hover */
        .group:hover > div {
          animation-play-state: paused;
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .group > div { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
