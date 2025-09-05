"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  // ---- leaning-circle physics (same vibe as your footer) ----
  const sectionRef = useRef(null);
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  const [lineY, setLineY] = useState(0);
  const [anchorX, setAnchorX] = useState(0);
  const [toX, setToX] = useState(0);
  const [toY, setToY] = useState(0);
  const [offX, setOffX] = useState(0);
  const [offY, setOffY] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setBounds({ w: r.width, h: r.height });
      setLineY(Math.max(260, Math.min(r.height - 140, 520))); // where the hairline sits
      setAnchorX(r.width * 0.62); // rest position for the circle
      setToX(0); setToY(0); setOffX(0); setOffY(0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => {
      const update = () => {
        const d = new Date();
        setTime(d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }));
        const off = -d.getTimezoneOffset() / 60;
        setGmt(`GMT${off >= 0 ? "+" : "-"}${Math.abs(off)}`);
      };
      update();
      const id = setInterval(update, 30000);
      return () => clearInterval(id);
    }, []);

  const MAX_DRIFT = 55;
  const VERTICAL_FACTOR = 0.18;
  const onMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    let dx = e.clientX - rect.left - anchorX;
    let dy = (e.clientY - rect.top - lineY) * VERTICAL_FACTOR;
    const mag = Math.hypot(dx, dy);
    if (mag > MAX_DRIFT && mag > 0) {
      const s = MAX_DRIFT / mag;
      dx *= s; dy *= s;
    }
    setToX(dx); setToY(dy);
  };
  const onMouseLeave = () => { setToX(0); setToY(0); };

  useEffect(() => {
    let raf;
    const tick = () => {
      const nx = offX + (toX - offX) * 0.14;
      const ny = offY + (toY - offY) * 0.14;
      if (Math.abs(nx - offX) > 0.1 || Math.abs(ny - offY) > 0.1) {
        setOffX(nx); setOffY(ny);
        raf = requestAnimationFrame(tick);
      } else {
        setOffX(toX); setOffY(toY);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [toX, toY, offX, offY]);

  const circleSize = Math.min(200, Math.max(160, bounds.w * 0.18));
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    transform: `translate(${anchorX - circleSize / 2 + offX}px, ${lineY - circleSize / 2 + offY}px)`,
  };
 const [time, setTime] = useState("");
  const [gmt, setGmt] = useState("");
  // ---- form state ----
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err"

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // bot
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "err", msg: "Please fill the required fields." });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setStatus({ type: "ok", msg: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      setStatus({ type: "err", msg: "Something went wrong. Try again later." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#121316] text-white py-12 md:py-6"
    >
      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        {/* Top header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
              <span className="text-white/90">Let’s start a</span><br />
              <span className="bg-gradient-to-r from-[#00ffcc] via-[#6D5DF6] to-[#00F0FF] bg-clip-text text-transparent">
                project together
              </span>
            </h1>
          </div>

          {/* Right column details */}
          <aside className="lg:col-span-4 space-y-6 lg:pt-4">
            <div className="flex items-center gap-4">
              <img src="/DP.jpg" alt="Rehan face Picture" className="h-14 w-14 rounded-full ring-1 ring-white/10 object-cover" />
              <div className="text-white/80">
                <div className="text-sm uppercase tracking-widest text-white/50">Contact</div>
                <a href="mailto:rehan10crkt@gmail.com" className="block hover:text-white">
                  mail@gmail.com
                </a>
                <a href="tel:+923488891995" className="block hover:text-white">
                  +92 348 8891 995
                </a>
              </div>
            </div>

            <div className="text-sm">
              <div className="text-white/50 uppercase tracking-widest mb-2">Socials</div>
              <div className="flex flex-wrap gap-4 text-white/80">
                <a href="https://github.com/Rehan-78690" className="hover:text-white">GitHub</a>
                <a href="https://www.linkedin.com/in/rehan-khan-205a54310/" className="hover:text-white">LinkedIn</a>
                <a href="https://wa.me/923488891995" className="hover:text-white">Whatsapp</a>
              </div>
            </div>
          </aside>
        </div>

        {/* hairline where the circle sits */}
        <div
          className="absolute left-6 right-6 md:left-10 md:right-10 h-px bg-white/10"
          style={{ top: lineY }}
        />

        {/* FORM */}
        <form onSubmit={onSubmit} className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {/* 01 Name */}
            <div className="pb-6 border-b border-white/10">
              <div className="text-xs text-white/40 mb-2">01</div>
              <label className="block text-lg md:text-xl text-white/90 mb-2">What’s your name?</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="John Doe *"
                required
                className="w-full bg-transparent placeholder:text-white/30 text-white/90 outline-none"
              />
            </div>

            {/* 02 Email */}
            <div className="py-6 border-b border-white/10">
              <div className="text-xs text-white/40 mb-2">02</div>
              <label className="block text-lg md:text-xl text-white/90 mb-2">What’s your email?</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="john@doe.com *"
                required
                className="w-full bg-transparent placeholder:text-white/30 text-white/90 outline-none"
              />
            </div>

            {/* 03 Subject */}
            <div className="py-6 border-b border-white/10">
              <div className="text-xs text-white/40 mb-2">03</div>
              <label className="block text-lg md:text-xl text-white/90 mb-2">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="e.g., Portfolio site, AI feature, etc."
                className="w-full bg-transparent placeholder:text-white/30 text-white/90 outline-none"
              />
            </div>

            {/* 04 Message */}
            <div className="py-6 border-b border-white/10">
              <div className="text-xs text-white/40 mb-2">04</div>
              <label className="block text-lg md:text-xl text-white/90 mb-2">Your message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Hello, can you help me with … *"
                required
                rows={6}
                className="w-full resize-y bg-transparent placeholder:text-white/30 text-white/90 outline-none"
              />
            </div>

            {/* honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* status */}
            {status && (
              <div
                className={`mt-4 text-sm ${status.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}
                role="status"
              >
                {status.msg}
              </div>
            )}
          </div>

          {/* Right spacer keeps details aligned; nothing needed here */}
          <div className="lg:col-span-4" />
        </form>
      </div>

      {/* SEND circle CTA */}
      <button
        type="submit"
        formAction="/api/contact"
        onClick={(e) => {
          // delegate to form submit
          const formEl = sectionRef.current?.querySelector("form");
          if (formEl) formEl.requestSubmit();
        }}
        disabled={sending}
        className="absolute left-0 top-0 block group"
        aria-label="Send message"
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative rounded-full flex items-center justify-center
                      text-base md:text-lg font-semibold select-none
                      ${sending ? "opacity-70" : ""}`}
          style={circleStyle}
        >
          <span className="relative z-10"> {sending ? "Sending…" : "Send it!"} </span>

          {/* circle core + ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "#a00000",
              boxShadow:
                "0 0 10px rgba(160,0,0,.30), 0 0 24px rgba(160,0,0,.20), 0 0 40px rgba(109,93,246,.18)",
            }}
          />
          <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />

          {/* neon aura (same colors as FAQ hover) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-full blur-2xl opacity-80
                       transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `
                radial-gradient(260px circle at 30% 30%, rgba(160,0,0,.22), transparent 40%),
                radial-gradient(340px circle at 70% 30%, rgba(99,102,241,.22), transparent 45%)
              `,
            }}
          />
        </div>
      </button>
<div className="py-6 px-6 mt-14 mb-10 grid grid-cols-2 md:grid-cols-3 items-end">
          <div className="space-y-2 text-xs uppercase tracking-widest text-white/50">
            <div>Version</div><div className="text-white/70">2025 © Edition</div>
          </div>
          <div className="space-y-2 text-xs uppercase tracking-widest text-white/50">
            <div>Local time</div><div className="text-white/70">{time} {gmt}</div>
          </div>
          <div className="mt-10 md:mt-0 md:justify-self-end text-xs uppercase tracking-widest text-white/50">
            <div className="mb-2">Socials</div>
            <div className="flex gap-6 text-white/80">
            
              <Link href="https://github.com/Rehan-78690" className="hover:text-white">Github</Link>
              <Link href="https://wa.me/923488891995" className="hover:text-white">Whatsapp</Link>
              <Link href="https://www.linkedin.com/in/rehan-khan-205a54310/" className="hover:text-white">LinkedIn</Link>
            </div>
          </div>
        </div>
      
      
    </section>
    
  );
}
