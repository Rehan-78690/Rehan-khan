"use client";
import React, { useMemo, useId } from "react";

/**
 * NeonDivider
 * - variant: "curve" | "wave" | "saw"
 * - position: "top" | "bottom"   (rotates the SVG)
 * - height: px height of the SVG box
 * - thickness: stroke width
 * - colors: gradient stops
 * - amplitude: how tall the curve/teeth are (0..50 in viewBox units)
 * - teeth: number of teeth for "saw"
 * - periods: wave cycles across the width for "wave"
 */
export default function NeonDivider({
  variant = "saw",
  position = "bottom",
  height = 80,
  thickness = 3,
  colors = ["#00F0FF", "#A78BFA", "#FF4D9D"],
  amplitude = 33,
  teeth = 5,
  periods = 3,
  className = "",
 fillBelow, 
}) {
  const gradId = useId();

  const d = useMemo(() => {
    if (variant === "saw") {
      // Zig-zag centered at y=50 with peak at 50-amplitude
      const step = 100 / teeth;
      let path = `M 0 50`;
      for (let i = 0; i < teeth; i++) {
        const x1 = (i + 0.5) * step;
        const x2 = (i + 1) * step;
        path += ` L ${x1} ${50 - amplitude} L ${x2} 50`;
      }
      return path;
    }

    if (variant === "wave" || variant === "curve") {
      // Smooth sine-like using cubic beziers
      const seg = 100 / periods;
      let path = `M 0 50`;
      for (let i = 0; i < periods; i++) {
        const x0 = i * seg;
        const xMid = x0 + seg / 2;
        const x1 = x0 + seg * 0.25;
        const x2 = x0 + seg * 0.75;
        // up half
        path += ` C ${x1} ${50 - amplitude}, ${xMid - seg * 0.25} ${50 - amplitude}, ${xMid} 50`;
        // down half
        path += ` C ${xMid + seg * 0.25} ${50 + amplitude}, ${x2} ${50 + amplitude}, ${x0 + seg} 50`;
      }
      return path;
    }

    return "M 0 50 L 100 50";
  }, [variant, amplitude, teeth, periods]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`block w-full ${position === "top" ? "rotate-180" : ""} ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          {colors.map((c, i) => (
            <stop key={i} offset={`${(i / (colors.length - 1 || 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      {/* Fill BELOW the curve to hide the hero with the next section's bg */}
      {fillBelow && (
        <path d={`${d} L 100 100 L 0 100 Z`} fill={fillBelow} />
      )}

      {/* Neon line with glow */}
      <path
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={thickness}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(0,240,255,.7)) drop-shadow(0 0 12px rgba(167,139,250,.6)) drop-shadow(0 0 18px rgba(255,77,157,.5))",
        }}
      />
    </svg>
  );
}
