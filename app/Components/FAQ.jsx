"use client";
import React, { useEffect, useRef, useState } from "react";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (!panelRef.current) return;
    setH(panelRef.current.scrollHeight);
  }, [a]);

  return (
    <article
      className="group relative rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition
                 hover:ring-white/20"
    >
      {/* neon aura on hover */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition
                   blur-xl"
        style={{
          background:
            "radial-gradient(600px circle at 0% 0%, rgba(160,0,0,.20), transparent 35%), radial-gradient(800px circle at 100% 0%, rgba(99,102,241,.22), transparent 40%)",
        }}
      />
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-start gap-4"
        aria-expanded={open}
      >
        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-br from-[#a00000] to-[#6D5DF6] shadow-[0_0_6px_rgba(160,0,0,.65)]" />
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-white/90">{q}</h3>
        </div>
        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* collapsible answer */}
      <div
        className="relative z-10 overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: open ? h : 0 }}
      >
        <div ref={panelRef} className="px-11 md:px-12 pb-5 md:pb-6 text-white/80">
          <p className="leading-relaxed">{a}</p>
        </div>
      </div>
    </article>
  );
}

export default function FAQSection() {
  const faqs = [
    {
      q: "Who are you in one line?",
      a: "Introvert by nature, brave by choice—full-stack developer learning AI. Quiet builder, consistent shipper.",
    },
    {
      q: "What are you focused on right now?",
      a: "Polishing my web fundamentals while diving into LLMs, Retrieval-Augmented Generation (RAG), and practical AI integrations.",
    },
    {
      q: "What tech do you use?",
      a: "Next.js, React, Tailwind, Node.js, Python, PostgreSQL. On the AI side: LangChain/RAG patterns, vector search basics, and model APIs.",
    },
    {
      q: "Are you available for freelance or internships?",
      a: "Yes—remote-first. Small projects, MVPs, or AI feature spikes are ideal.",
    },
    {
      q: "How should I contact you?",
      a: "Email works best. There’s a ‘Get in touch’ button in the footer; you can also reach me via WhatsApp or LinkedIn.",
    },
    {
      q: "Do you work on AI projects?",
      a: "I’m learning in public—experimenting with prompts, RAG, small fine-tunes, and connecting AI features to clean UIs.",
    },
    {
      q: "Can I see your code?",
      a: "Yes, GitHub is linked in the footer. I keep small, readable repos and notes so it’s easy to review.",
    },
    {
      q: "How do you approach performance & SEO?",
      a: "Ship lean: image optimization, route-level code splitting, metadata basics, prefetch where it helps—measure with Lighthouse/Profilers.",
    },
   
    {
      q: "Messi or Ronaldo?",
      a: "Messi since 2014. I love the calm control and late-game belief—also why I keep a ‘stoppage-time’ mindset in projects.",
    },
  ];

  const first = faqs.slice(0, 5);
  const rest = faqs.slice(5);

  // show more animation
  const [showAll, setShowAll] = useState(false);
  const restRef = useRef(null);
  const [restHeight, setRestHeight] = useState(0);

  useEffect(() => {
    if (restRef.current) setRestHeight(restRef.current.scrollHeight);
  }, [rest.length]);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-white/60">
            Short answers about my work, stack, and how to reach me.
          </p>
        </div>

        <div className="space-y-4">
          {first.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}

          {/* the “rest” with a smooth height transition */}
          <div
  className="overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out will-change-[max-height]"
  style={{
    maxHeight: showAll ? restHeight + 16 : 0,   // buffer avoids clipping the last card
    opacity: showAll ? 1 : 0,
    transform: `translateY(${showAll ? "0px" : "6px"})`,
  }}
>
  <div ref={restRef} className="space-y-4 pb-6">

              {rest.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
                         bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white/85 transition"
            >
              {showAll ? "Show less" : "Show more"}
              <svg
                className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
