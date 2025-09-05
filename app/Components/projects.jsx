"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// --- tiny in-view reveal helper ---
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.unobserve(el)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function ProjectCard({ p, featured = false, index = 0 }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className={[
        "group relative overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10",
        "transition hover:ring-white/20",
        featured ? "lg:col-span-2 min-h-[420px]" : "min-h-[340px]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDuration: "600ms" }}
    >
      {/* neon aura */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition blur-2xl"
        style={{
          background:
            "radial-gradient(600px circle at 10% 0%, rgba(160,0,0,.18), transparent 40%), radial-gradient(800px circle at 100% 0%, rgba(99,102,241,.20), transparent 45%)",
        }}
      />

      {/* media */}
      <div className="absolute inset-0">
        {p.video ? (
          <video
            src={p.video}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover brightness-[.85] contrast-[.98]"
          />
        ) : (
          <img
            src={p.image || "/placeholder-dark.png"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[.9] contrast-[.98]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      {/* content */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        {/* top row */}
        <div className="flex items-center gap-3">
          {p.badge && (
            <span className="text-[10px] uppercase tracking-widest rounded-full px-2 py-1 bg-white/10 text-white/80 ring-1 ring-white/15">
              {p.badge}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            {p.year && (
              <span className="text-xs text-white/60 ring-1 ring-white/10 rounded-full px-2 py-1 bg-black/30">
                {p.year}
              </span>
            )}
          </div>
        </div>

        {/* title + desc */}
        <div className="mt-auto">
          <h3
            className={[
              "font-extrabold tracking-tight leading-[1.05]",
              featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
            ].join(" ")}
          >
            <span className="text-white/85">{p.titlePrefix || ""}</span>
            {p.titleGradient ? (
              <span
                className="block bg-gradient-to-r from-[#a00000] via-[#6D5DF6] to-[#00F0FF] bg-clip-text text-transparent"
              >
                {p.title}
              </span>
            ) : (
              <span className="block text-white">{p.title}</span>
            )}
          </h3>
          {p.description && (
            <p className="mt-2 text-white/75 max-w-2xl">{p.description}</p>
          )}

          {/* tags */}
          {!!p.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full px-2.5 py-1 bg-white/5 ring-1 ring-white/10 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* actions */}
          <div className="mt-5 flex items-center gap-3">
            {p.demo && (
              <Link
                href={p.demo}
                target="_blank"
                className="rounded-xl px-3 py-2 text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/85 transition"
              >
                Live demo
              </Link>
            )}
            {p.repo && (
              <Link
                href={p.repo}
                target="_blank"
                className="rounded-xl px-3 py-2 text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/85 transition"
              >
                GitHub
              </Link>
            )}
            {p.caseStudy && (
              <Link
                href={p.caseStudy}
                className="rounded-xl px-3 py-2 text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/85 transition"
              >
                Case study →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  // === Replace these with your real projects ===
  const projects = [
    {
      badge: "Featured",
      titlePrefix: "Split Hero /",
      title: "Designer ↔ Developer",
      titleGradient: true,
      description:
        "Interactive split-portrait hero with mouse-follow clip-path, neon accents, and responsive text logic.",
      tags: ["Next.js", "React", "Tailwind", "CSS clip-path"],
      image: "/projects/split-hero.jpg", // or video: "/projects/split-hero.mp4"
      demo: "#",
      repo: "#",
      caseStudy: "#",
      year: "2025",
    },
    {
      title: "Neon Wave Divider",
      description:
        "SVG-powered wave/saw dividers with animated glow that perfectly bridges dark/gray sections.",
      tags: ["SVG", "Tailwind", "Motion"],
      image: "/projects/neon-divider.jpg",
      demo: "#",
      repo: "#",
      year: "2025",
    },
    {
      title: "Contact CTA with Leaning Circle",
      description:
        "Physics-ish CTA button that leans toward the cursor along a hairline, with red/indigo aura.",
      tags: ["UI Motion", "Canvas-free", "Accessibility"],
      image: "/projects/leaning-circle.jpg",
      demo: "#",
      repo: "#",
      year: "2025",
    },
    // Add more if you have them…
  ];

  // If you only have 1–3 projects, we make the first tile span wider (featured).
  const hasFew = projects.length <= 3;

  return (
    <section className="bg-black text-white min-h-[100svh]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        {/* header */}
        <header className="mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-white/60">Projects</span>
          <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
            <span className="text-white/90">Small set,</span>{" "}
            <span className="bg-gradient-to-r from-[#a00000] via-[#6D5DF6] to-[#00F0FF] bg-clip-text text-transparent">
              high polish
            </span>
          </h1>
          <p className="mt-3 text-white/65 max-w-2xl">
            A few hand-built pieces. I’d rather ship things I’m proud of than list every experiment.
          </p>
        </header>

        {/* grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title + i}
              p={p}
              index={i}
              featured={hasFew && i === 0}
            />
          ))}
        </div>

        {/* tiny “in progress” row (optional, remove if you don’t like it) */}
        <div className="mt-12 md:mt-14 grid gap-4 md:grid-cols-3">
          {[
            { label: "Personal RAG notes", pct: 70 },
            { label: "AI prompt mini-lab", pct: 40 },
            { label: "Portfolio case study writeups", pct: 30 },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-4"
            >
              <div className="flex items-center justify-between text-white/80 text-sm">
                <span>{m.label}</span>
                <span className="text-white/50">{m.pct}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
                       bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/85 transition"
          >
            Let’s talk about a project
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
      
    </section>
  );
}
