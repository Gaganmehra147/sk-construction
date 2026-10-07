"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";

interface TransformationPair {
  title: string;
  location: string;
  scope: string;
  beforeImage: string;
  afterImage: string;
}

const TRANSFORMATIONS: TransformationPair[] = [
  {
    title: "Verdant Villa Renovation",
    location: "Koramangala, Bengaluru",
    scope: "Structural Demolition & Monolithic Glass Courtyard",
    beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Soma Penthouse Atrium",
    location: "Worli Sea Face, Mumbai",
    scope: "Raw Concrete Shell to Travertine Living Suite",
    beforeImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Aethel Monolith Kitchen",
    location: "Vasant Vihar, New Delhi",
    scope: "Outdated Utility to Seamless Quartz & Smoked Walnut Studio",
    beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPair = TRANSFORMATIONS[activeProjectIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#141414]/10 pb-8 mb-10 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#8C827A] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>[ 05 // ARCHITECTURAL TRANSFORMATION ]</span>
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-[#141414]">
              Before & After Revelations
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-light mt-2 max-w-lg leading-relaxed">
              Experience the power of structural civil interventions and bespoke interior execution. Drag the interactive divider horizontally to explore.
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {TRANSFORMATIONS.map((t, idx) => (
              <button
                key={t.title}
                type="button"
                onClick={() => {
                  setActiveProjectIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2.5 text-xs font-mono-tech uppercase tracking-[0.14em] transition-all border ${
                  activeProjectIdx === idx
                    ? "bg-[#141414] text-[#FBF9F5] border-[#141414] shadow-md"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#141414]"
                }`}
              >
                {t.title.split(" ")[0]} {t.title.split(" ")[1] || ""}
              </button>
            ))}
          </div>
        </div>

        {/* Project Meta Banner */}
        <div className="flex flex-wrap items-center justify-between pb-4 text-xs font-mono-tech uppercase tracking-wider text-stone-600">
          <div>
            <span className="font-semibold text-[#141414]">{currentPair.title}</span> • {currentPair.location}
          </div>
          <div className="text-[#8B6F57] font-medium">{currentPair.scope}</div>
        </div>

        {/* Interactive Draggable Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          style={{ touchAction: "none" }}
          className="relative w-full h-[340px] sm:h-[500px] md:h-[640px] overflow-hidden select-none cursor-ew-resize border border-[#141414]/15 shadow-2xl bg-[#121212] touch-none"
        >
          {/* AFTER Image (Full background) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${currentPair.afterImage}')` }}
          />
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 px-3 sm:px-4 py-1.5 bg-[#141414]/90 text-[#FBF9F5] backdrop-blur-md text-[10px] sm:text-xs font-mono-tech uppercase tracking-widest border border-white/20">
            AFTER • REFINED EXECUTION
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url('${currentPair.beforeImage}')`,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          />
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 px-3 sm:px-4 py-1.5 bg-[#141414]/90 text-[#C5A880] backdrop-blur-md text-[10px] sm:text-xs font-mono-tech uppercase tracking-widest border border-[#C5A880]/40">
            BEFORE • UNREFINED SITE
          </div>

          {/* Vertical Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-[2px] h-full bg-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.7)]" />

            {/* Circular Handle */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#141414] border-2 border-[#C5A880] text-white flex items-center justify-center shadow-2xl transition-transform active:scale-95 pointer-events-auto">
              <ArrowLeftRight className="w-4 h-4 text-[#C5A880]" />
            </div>
          </div>

          {/* Bottom Drag Prompt */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#141414]/85 backdrop-blur-md px-4 py-1.5 text-[10px] font-mono-tech uppercase tracking-[0.2em] text-stone-200 border border-white/10 whitespace-nowrap shadow-lg">
            DRAG DIVIDER TO REVEAL TRANSFORMATION
          </div>
        </div>
      </div>
    </section>
  );
}
