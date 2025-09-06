"use client";
import React, { useRef, useState, useEffect } from 'react';
import NeonDivider from './NeonDivider';

export default function HeroSplit() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const neonRedStyle = {
color: "#a00000", // dominant red body color
  textShadow: [
    "0 0 1px rgba(160,0,0,0.95)",   // tight red core
    "0 0 8px rgba(160,0,0,0.90)",
    "0 0 18px rgba(160,0,0,0.80)",
    "0 0 4px rgba(160,0,0,0.65)",  // largest red glow
    "0 0 20px rgba(167,139,250,0.45)", // purple fringe
    "0 0 12px rgba(59,91,255,0.35)",   // electric blue
    "0 0 14px rgba(0,240,255,0.30)"    // cyan halo
  ].join(", ")
};
const neonBlue = {
  color: "#3B5BFF", // neon-ish blue
  textShadow: [
    "0 0 1px rgba(160,0,0,0.95)",   // tight red core
    "0 0 8px rgba(160,0,0,0.90)",
    "0 0 18px rgba(160,0,0,0.80)",
    "0 0 10px rgba(59,91,255,0.65)",
    "0 0 12px rgba(167,139,250,0.35)", // purple accent
    "0 0 14px rgba(0,240,255,0.35)"    // cyan accent
  ].join(", "),
};
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    // e.preventDefault();
  };

  // Calculate clip paths based on mouse/touch position
  const getClipPaths = () => {
    const splitPoint = Math.max(10, Math.min(90, mousePosition.x));
    
    return {
      left: `polygon(0% 0%, ${splitPoint}% 0%, ${splitPoint}% 100%, 0% 100%)`,
      right: `polygon(${splitPoint}% 0%, 100% 0%, 100% 100%, ${splitPoint}% 100%)`
    };
  };

  const clipPaths = getClipPaths();
  const splitPoint = Math.max(10, Math.min(90, mousePosition.x));

  // Calculate text opacities based on position
  const leftTextOpacity = Math.max(0, Math.min(1, (splitPoint - 50) / 40));
  const rightTextOpacity = Math.max(0, Math.min(1, (50 - splitPoint) / 40));

  return (
    <section className="relative w-full h-screen bg-gray-900 overflow-hidden z-5">
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
      >
        {/* Designer Image (Left) */}
        <div className="absolute inset-0">
          <img
            src="/rehan.jpg"
            alt="Rehan Khan - Designer"
            className="w-full h-full object-cover md:object-center"
            style={{ clipPath: clipPaths.left }}
          />
        </div>

        {/* Coder Image (Right) */}
        <div className="absolute inset-0">
          <img
            src="/rehan-ai.jpg"
            alt="Rehan Khan - Coder"
            className="w-full h-full object-cover md:object-center"
            style={{ clipPath: clipPaths.right }}
          />
        </div>

        {/* Text Container - Different layout for mobile */}
        {isMobile ? (
          // Mobile layout - stacked vertically
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
            {/* Top text (Software Engineer) */}
            <div
              className="text-center mt-12 px-4 translate-y-20 "
              style={{ opacity: leftTextOpacity }}
            >
              <h2
  className="text-3xl font-extrabold leading-tight bg-gradient-to-r from-[#3B5BFF] via-[#6D5DF6] to-[#A78BFA] bg-clip-text text-transparent"  style={neonBlue}
>
  Software Engineer
</h2>
              <p className="mt-1 text-white/80 text-lg font-medium">
                Building reliable web apps and APIs
              </p>
            </div>

            {/* Bottom text (AI Enthusiast) */}
            <div
              className="text-center mt-8 px-4"
              style={{ opacity: rightTextOpacity }}
            >
              <h2
  className="text-3xl font-extrabold leading-tight"
  style={neonRedStyle}
>
  AI Enthusiast
</h2>
              <p className="mt-1 text-white/80 text-lg font-medium">
                Exploring ML, recommenders & RL
              </p>
            </div>
          </div>
        ) : (
          // Desktop layout - side by side
          <>
            {/* Left Side Text (Software Engineer) */}
            <div
              className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ opacity: leftTextOpacity }}
            >
              <h2
  className="text-3xl font-extrabold leading-tight bg-gradient-to-r from-[#3B5BFF] via-[#6D5DF6] to-[#A78BFA] bg-clip-text text-transparent"  style={neonBlue}
>
  Software Engineer
</h2>
              <p className="mt-2 text-white/80 text-lg md:text-xl font-medium">
                Building reliable web apps and APIs
              </p>
            </div>

            {/* Right Side Text (AI Enthusiast) */}
            <div
              className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 pointer-events-none text-right"
              style={{ opacity: rightTextOpacity }}
            >
             <h2
  className="text-3xl font-extrabold leading-tight"
  style={neonRedStyle}
>
  AI Enthusiast
</h2>
              <p className="mt-2 text-white/80 text-lg md:text-xl font-medium">
                Exploring ML, recommenders & RL
              </p>
            </div>
          </>
        )}

      
      </div>
        <div
              className="absolute left-0 right-0 bottom-[-5px] pointer-events-none z-20"
              aria-hidden="true"
            >
              <NeonDivider
                variant="wave"
                position="bottom"       // keeps the curve facing downward
                height="35"
                thickness={2}
                amplitude={28}
                colors={["#a00000", "#A78BFA", "#a00000"]}
                fillBelow="#121316" // same as footer bg
              />
            </div>
   
    </section>
    
  );

}
