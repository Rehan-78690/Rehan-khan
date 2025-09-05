"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CertsShowcase({ showThumbnails = false }) {
  const [preview, setPreview] = useState(null); // { src, title } | null

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- CURATED SIX (balanced full-stack + AI) ----
  // Replace verifyUrl with your real Coursera/Scrimba links.
  // Put optional preview files in /public/certs/*
  const certs = [
    {
      title: "Fundamentals of Machine Learning",
      issuer: "NVIDIA (Coursera)",
      date: "2025",
      verifyUrl: "https://coursera.org/share/4e3eb1e20e125ddfb4cd3b10b5957fdb",                  // <- paste shareable link
      logoText: "NV",
      logoBg: "#0b1b2b",
      preview: "/certs/nvidia-ml.png", // or .pdf
    },
    {
      title: "Fundamentals of Deep Learning",
      issuer: "NVIDIA (Coursera)",
      date: "2025",
      verifyUrl: "https://coursera.org/share/174f2b90a6dd5b71c142251d9393958e",
      logoText: "NV",
      logoBg: "#0b1b2b",
      preview: "/certs/nvidia-dl.png",
    },
    {
      title: "Fundamentals of NLP & Transformers",
      issuer: "NVIDIA (Coursera)",
      date: "2025",
      verifyUrl: "https://coursera.org/share/50e44d0130fa28b8fef3247175380e4f",
      logoText: "NV",
      logoBg: "#0b1b2b",
      preview: "/certs/nvidia-nlp.png",
    },
    {
      title: "Programming in Python",
      issuer: "Coursera / Meta",
      date: "2024",
      verifyUrl: "https://coursera.org/share/fec941ab0b602222ef248c9ac88b8954",
      logoText: "Co",
      logoBg: "#1f2937",
      preview: "/certs/python.png",
    },
    {
      title: "Programming in JavaScript",
      issuer: "Coursera / Meta",
      date: "2023",
      verifyUrl: "https://coursera.org/share/2d8c3d84b61c970d33d4ad94676bd8a1",
      logoText: "Co",
      logoBg: "#1f2937",
      preview: "/certs/js.png",
    },
    {
      title: "Learn Next.js",
      issuer: "Scrimba",
      date: "2024",
      verifyUrl: "https://coursera.org/share/7c984b83bd1cde6fc940c0be77d04985",
      logoText: "Sc",
      logoBg: "#141414",
      preview: "/certs/nextjs.png",
      // If you prefer, swap this item with "Version Control with Git & GitHub"
    },
  ];

  const openPreview = (c) => {
    if (!c.preview) return;
    setPreview({ src: c.preview, title: c.title });
  };

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Certifications
          </h2>
          <p className="mt-2 text-white/60">
            Foundations in Python & JavaScript, plus NVIDIA tracks in ML / DL / NLP.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <article
              key={c.title}
              className="group relative rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-5 hover:ring-white/20 transition"
            >
              <div className="flex items-start gap-4">
                {/* Logo chip (swap for <img src="/logos/coursera.svg" /> if you have one) */}
                <div
                  className="h-10 w-10 rounded-lg grid place-items-center text-sm font-semibold"
                  style={{ background: c.logoBg }}
                  aria-hidden="true"
                >
                  {c.logoText}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold leading-tight">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-sm text-white/70">
                    {c.issuer} • {c.date}
                  </div>
                </div>
              </div>

              {/* Optional small in-card thumbnail (kept subtle) */}
              {showThumbnails && c.preview && (
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
                  <div className="relative aspect-[16/10]">
                    <img
                      src={c.preview}
                      alt={`${c.title} certificate preview`}
                      className="absolute inset-0 h-full w-full object-cover
                                 opacity-90 brightness-[0.9] contrast-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25" />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <Link
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 text-white/85 transition"
                >
                  View credential
                  <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
                    <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {c.preview && (
                  <button
                    onClick={() => openPreview(c)}
                    className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 text-white/85 transition"
                  >
                    Preview
                  </button>
                )}
              </div>

              {/* Subtle radial hover glow */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition blur-2xl"
                style={{
                  background:
                    "radial-gradient(600px circle at 0% 0%, rgba(167,139,250,.22), transparent 40%)",
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
              aria-label="Close preview"
            >
              ✕
            </button>
            {/* Render PDF in <iframe>, images in <img> */}
            {/\.(pdf)$/i.test(preview.src) ? (
              <iframe
                src={preview.src}
                className="w-full h-[72vh] rounded-xl ring-1 ring-white/10 bg-black"
                title={preview.title}
              />
            ) : (
              <img
                src={preview.src}
                alt={preview.title}
                className="w-full max-h-[72vh] object-contain rounded-xl ring-1 ring-white/10 bg-black"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
