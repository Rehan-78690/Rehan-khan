"use client";
import React, { useEffect, useRef, useState } from "react";
import NeonDivider from "./NeonDivider";
import Link from "next/link";

export default function ContactFooter() {
  const sectionRef = useRef(null);

  // layout
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [lineY, setLineY] = useState(0);
  const [anchorX, setAnchorX] = useState(0); // fixed resting X of the circle

  // leaning offsets (animated)
  const [toX, setToX] = useState(0);
  const [toY, setToY] = useState(0);
  const [offX, setOffX] = useState(0);
  const [offY, setOffY] = useState(0);
   const DIVIDER_H = 40;

  // time
  const [time, setTime] = useState("");
  const [gmt, setGmt] = useState("");
  

  // measure
  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setBounds({ width: r.width, height: r.height });
      setLineY(r.height * 0.52);          // hairline position
      setAnchorX(r.width * 0.72);         // fixed circle anchor (right side)
      setOffX(0); setOffY(0); setToX(0); setToY(0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // mouse → target lean
  const MAX_DRIFT = 60;  // max px the circle may lean
  const VERTICAL_FACTOR = 0.25; // how much it may lean vertically (0 = only horizontal)

  const onMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let dx = mx - anchorX;
    let dy = (my - lineY) * VERTICAL_FACTOR; // small vertical lean (set to 0 to stay on the line)

    // clamp to a circle of radius MAX_DRIFT
    const mag = Math.hypot(dx, dy);
    if (mag > MAX_DRIFT && mag > 0) {
      const s = MAX_DRIFT / mag;
      dx *= s; dy *= s;
    }
    setToX(dx);
    setToY(dy);
  };
  const onMouseLeave = () => { setToX(0); setToY(0); };

  // rAF easing (lerp)
  useEffect(() => {
    let raf;
    const tick = () => {
      const nx = offX + (toX - offX) * 0.12;
      const ny = offY + (toY - offY) * 0.12;
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

  // local time
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

  // sizes & styles
  const circleSize = Math.min(280, Math.max(160, bounds.width * 0.18));
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    transform: `translate(${anchorX - circleSize / 2 + offX}px, ${lineY - circleSize / 2 + offY}px)`,
  };

  return (
     <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full bg-[#121316] text-white overflow-hidden"
      // overlap previous section by the divider height
      style={{ marginTop: -DIVIDER_H, paddingTop: DIVIDER_H }}
    >
      {/* Divider at the TOP of footer
      <div
        className="absolute left-0 right-0 top-[4px] pointer-events-none z-20"
        aria-hidden="true"
      >
        <NeonDivider
          variant="curve"
          position="bottom"       // keeps the curve facing downward
          height={DIVIDER_H}
          thickness={3}
          amplitude={28}
          colors={["#a00000", "#A78BFA", "#a00000"]}
          fillBelow="#121316" // same as footer bg
        />
      </div> */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-[18vh]">
        {/* Heading */}
        <div className="flex items-start gap-6">
          <div className="h-14 w-14 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
            <img src="/avatar.jpg" alt="" className="h-full w-full object-cover" />
          </div>
          <h2 className="leading-[0.95] text-[12vw] md:text-[8rem] font-extrabold tracking-tight">
            Let’s work<br/>together
          </h2>
        </div>

        {/* Hairline */}
        <div
          className="absolute left-6 right-6 md:left-10 md:right-10 h-px bg-white/10"
          style={{ top: lineY }}
        />

        {/* Pills */}
        <div className="mt-16 flex flex-wrap items-center gap-6">
          <a href="mailto:rehan10crkt@gmail.com.com" className="rounded-full border border-white/15 px-6 py-3 text-white/90 hover:bg-[#a00000] transition-colors">mail@gmail.com</a>
          <a href="tel:+923488891995" className="rounded-full border border-white/15 px-6 py-3 text-white/90 hover:bg-[#a00000] transition-colors">+92 3488891 995</a>
        </div>

        {/* Bottom meta */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 items-end">
          <div className="space-y-2 text-xs uppercase tracking-widest text-white/50">
            <div>Version</div><div className="text-white/70">2025 © Edition</div>
          </div>
          <div className="space-y-2 text-xs uppercase tracking-widest text-white/50">
            <div>Local time</div><div className="text-white/70">{time} {gmt}</div>
          </div>
          <div className="mt-10 md:mt-0 md:justify-self-end text-xs uppercase tracking-widest text-white/50">
            <div className="mb-2">Socials</div>
            <div className="flex gap-6 text-white/80">
              <Link href="#" className="hover:text-white">Certifications</Link>
              <Link href="#" className="hover:text-white">Instagram</Link>
              <Link href="#" className="hover:text-white">Whatsapp</Link>
              <Link href="#" className="hover:text-white">LinkedIn</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Anchored circle that "leans" toward the mouse */}
      <Link href="/contact" className="absolute left-0 top-0 block" aria-label="Get in touch" style={{ willChange: "transform" }}>
        <div
          className="rounded-full bg-[#a00000] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-center text-base md:text-lg font-semibold select-none"
          style={circleStyle}
        >
          Get in touch
        </div>
      </Link>
    </section>
  );
}
