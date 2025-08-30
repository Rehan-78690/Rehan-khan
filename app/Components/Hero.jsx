"use client";
import React, { useRef, useState, useEffect } from 'react';

export default function HeroSplit() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Start in center
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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

  // Calculate clip paths based on mouse position
  const getClipPaths = () => {
    // The split point follows the mouse x-position
    const splitPoint = Math.max(10, Math.min(90, mousePosition.x));
    
    return {
      left: `polygon(0% 0%, ${splitPoint}% 0%, ${splitPoint}% 100%, 0% 100%)`,
      right: `polygon(${splitPoint}% 0%, 100% 0%, 100% 100%, ${splitPoint}% 100%)`
    };
  };

  const clipPaths = getClipPaths();
  const splitPoint = Math.max(10, Math.min(90, mousePosition.x));

  // Calculate text opacities based on mouse position
  const leftTextOpacity = Math.max(0, Math.min(1, (splitPoint - 50) / 40));
  const rightTextOpacity = Math.max(0, Math.min(1, (50 - splitPoint) / 40));

  return (
    <section className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-ew-resize"
        onMouseMove={handleMouseMove}
      >
        {/* Designer Image (Left) */}
        <div className="absolute inset-0">
          <img
            src="/rehan.png"
            alt="Rehan Khan - Designer"
            className="w-full h-full object-cover"
            style={{ clipPath: clipPaths.left }}
          />
        </div>

        {/* Coder Image (Right) */}
        <div className="absolute inset-0">
          <img
            src="/rehan-ai.png"
            alt="Rehan Khan - Coder"
            className="w-full h-full object-cover"
            style={{ clipPath: clipPaths.right }}
          />
        </div>

        {/* Left Side Text (Designer) */}
        <div 
          className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-300 pointer-events-none"
          style={{ opacity: leftTextOpacity }}
        >
          <p className="drop-shadow-lg">I am a Designer</p>
        </div>

        {/* Right Side Text (Coder) */}
        <div 
          className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-300 pointer-events-none"
          style={{ opacity: rightTextOpacity }}
        >
          <p className="drop-shadow-lg">I am a Coder</p>
        </div>

        {/* Visual Divider */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white transform -translate-x-1/2 shadow-lg opacity-80"
          style={{ left: `${clipPaths.left.split('%')[0]}%` }}
        ></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-purple-400">Designer</span> 
              <span className="mx-3 text-white">/</span> 
              <span className="text-blue-400">Developer</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Creating beautiful designs and clean code
            </p>
          </div>
        </div>

        {/* Hover Indicator */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg transition-opacity duration-300 pointer-events-none"
          style={{ 
            opacity: Math.abs(mousePosition.x - 50) < 5 ? 1 : 0,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`
          }}
        >
          Move left or right
        </div>
      </div>
    </section>
  );
}