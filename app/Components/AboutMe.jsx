"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AboutMe() {
  // ---- EDIT THESE ----
const storyParts = useMemo(() => [
  "Quiet in rooms, loud in curiosity. That’s been me since day one.",
  "I did well in school, fell hard for tech, and committed to software engineering.",
 "since(2014): watch(football), idol('Messi'); now -> explore('AI') // where patterns become products"], []);
  // Ensure these exist in /public
  const media = { study: "/rehan.jpg", grad: "/rehan-ai.jpg", football: "/rehan.jpg" };
  // --------------------

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const [inView, setInView] = useState(false);
  const [typed, setTyped] = useState(["", "", ""]);
  const [mediaLive, setMediaLive] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const startedRef = useRef(false); // guard against re-run in Strict Mode

  // Fire when heading area enters viewport
  useEffect(() => {
    if (!triggerRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // fire once
        }
      },
      { root: null, rootMargin: "0px 0px -40% 0px", threshold: 0.01 }
    );
    io.observe(triggerRef.current);
    return () => io.disconnect();
  }, []);

  // Typewriter (no cleanup to avoid Strict Mode cancel)
  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    let p = 0, c = 0;
    const speed = 35;   // ms/char
    const pause = 600;  // between paragraphs

    const tick = () => {
      setTyped(prev => {
        const next = [...prev];
        next[p] = storyParts[p].slice(0, c + 1);
        return next;
      });
      setCurrentParagraph(p);

      if (!mediaLive && (p > 0 || c > 10)) setMediaLive(true);

      c++;
      if (c < storyParts[p].length) {
        setTimeout(tick, speed);
      } else if (p < storyParts.length - 1) {
        p++; c = 0;
        setTimeout(tick, pause);
      }
    };

    setTimeout(tick, 400);
    // intentionally no cleanup; Strict Mode would cancel the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]); // <-- only depends on inView

  // Parallax tilt (disabled on touch)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  const onMouseMove = (e) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top) / r.height;
    setTilt({ x: (cx - 0.5) * 6, y: (0.5 - cy) * 6 });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#121316]  py-12 md:py-24">
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10 text-white">
        {/* Header */}
        <div className="mb-10 md:mb-14 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-white/60">About me</span>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
  <span className="text-white/90">Curiosity first</span>
  <span className="mx-2">→</span>
  <span className="bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(99,102,241,0.35)]">
    code second
  </span>
  <span className="mx-2">→</span>
  <span className="text-white/90">AI  -next</span>
</h2>
          <div ref={triggerRef} className="absolute -bottom-10 left-0 h-2 w-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left: Typewriter narrative */}
          <div className="order-2 md:order-1">
            {storyParts.map((full, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-white/90 mb-6 min-h-[1.6em]"
                style={{ opacity: currentParagraph >= i ? 1 : 0.5, transition: "opacity .3s ease" }}
              >
                <span>{typed[i]}</span>
                {typed[i].length > 0 && typed[i].length < full.length && (
                  <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse" />
                )}
              </p>
            ))}
            <div
              className={`mt-8 h-[2px] bg-gradient-to-r from-fuchsia-400/70 via-indigo-400 to-cyan-400/70 transition-all duration-700
                         ${startedRef.current ? "w-full opacity-100" : "w-8 opacity-0"}`}
            />
          </div>

          {/* Right: Media collage (reveals after typing begins) */}
          <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative min-h-[300px] md:min-h-[420px] perspective-1000 order-1 md:order-2"
          >
            <div
              className={`absolute inset-0 transition duration-700 ${mediaLive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <figure
                className="absolute left-0 top-0 w-[58%] rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-lg md:shadow-xl bg-white/5"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(14px)`,
                  animation: "floatY 8s ease-in-out infinite",
                }}
              >
                <img src={media.study} alt="Late-night study sessions" className="h-40 md:h-56 w-full object-cover" />
                <figcaption className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white/75 bg-black/30">
                  Sleepless study sprints
                </figcaption>
              </figure>

              <figure
                className="absolute right-0 top-12 md:top-16 w-[56%] rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-lg md:shadow-xl bg-white/5"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(8px)`,
                  animation: "floatY 10s ease-in-out -2s infinite",
                }}
              >
                <img src={media.grad} alt="Graduation day" className="h-44 md:h-64 w-full object-cover" />
                <figcaption className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white/75 bg-black/30">
                  Graduated—kept building
                </figcaption>
              </figure>

              <figure
                className="absolute left-4 md:left-6 bottom-0 w-[58%] rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-lg md:shadow-xl bg-white/5"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(4px)`,
                  animation: "floatY 9s ease-in-out -4s infinite",
                }}
              >
                <img src={media.football} alt="Football nights" className="h-40 md:h-56 w-full object-cover" />
                <figcaption className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white/75 bg-black/30">
                  Football & tactics nerd
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}
