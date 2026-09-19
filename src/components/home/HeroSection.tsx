"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 18;
      const y = (clientY / innerHeight - 0.5) * 18;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 overflow-hidden bg-[#141414] text-[#FBF9F5]"
    >
      {/* Background Architectural Photography with subtle parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 opacity-35"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90')`,
          transform: `scale(1.05) translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
        }}
      />

      {/* Blueprint Grid Overlay & Vignette */}
      <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-[#141414]/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full space-y-8 sm:space-y-12">
        {/* Precision Blueprint Coordinates & Ticks Bar - Cleanly aligned at top */}
        <div className="hidden md:flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#C5A880]/85 border-b border-white/10 pb-3.5">
          <span>PROJECT STUDIO • LAT 28°36&apos;N / LONG 77°12&apos;E</span>
          <span>ELEVATION +0.00 • TURNKEY & CIVIL ARCHITECTURE</span>
          <span>SPEC: ARCH-2026-VIJAY</span>
        </div>

        {/* Main Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-8 space-y-7">
            {/* Eyebrow Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#C5A880]/50 bg-[#1A1A1A]/90 text-[#C5A880] text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.24em] font-semibold backdrop-blur-md shadow-sm max-w-full">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse shrink-0" />
                <span className="truncate sm:overflow-visible">
                  INTERIOR DESIGN • ARCHITECTURE • CONSTRUCTION
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.04] text-white">
              Spaces Designed <br />
              <span className="italic font-editorial-quote font-normal text-[#F4EFEA]/90">
                To Be Lived In.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-stone-300 text-sm sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              From thoughtful interiors to complete civil construction,{" "}
              <strong className="text-white font-medium">
                Vijay Interior & Construction
              </strong>{" "}
              creates refined spaces built around the way you live. Single-source
              accountability from concept sketches to turnkey handover.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 sm:pt-3">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#FBF9F5] text-[#141414] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[#C5A880] hover:text-[#141414] min-h-[48px]"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
              </Link>

              <Link
                href="/#enquire"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-white/10 hover:border-white min-h-[48px]"
              >
                <span>Start Your Project</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Architectural Spec Card */}
          <div className="lg:col-span-4 flex justify-end w-full">
            <div
              className="w-full max-w-full lg:max-w-sm border border-white/15 bg-[#1F1E1D]/80 backdrop-blur-xl p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-2xl transition-transform duration-500 hover:border-[#C5A880]/50"
              style={{
                transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#C5A880]">
                  DISCIPLINE MATRIX
                </span>
                <span className="text-[10px] font-mono-tech text-stone-400">
                  REF 01-A
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium uppercase tracking-wider text-[11px]">
                      Spatial Architecture
                    </div>
                    <div className="text-stone-400 text-[11px] leading-relaxed">
                      Micro-climatic planning, natural ventilation & monolithic layouts.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium uppercase tracking-wider text-[11px]">
                      Bespoke Interiors
                    </div>
                    <div className="text-stone-400 text-[11px] leading-relaxed">
                      Italian marble bookmatching, fumed oak millwork & tailored lighting.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium uppercase tracking-wider text-[11px]">
                      Turnkey Civil Execution
                    </div>
                    <div className="text-stone-400 text-[11px] leading-relaxed">
                      Rigorous laboratory-tested concrete, structural framing & zero-leakage guarantee.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-stone-400">
                <span>EST. 2012</span>
                <span className="text-[#C5A880]">180+ HOMES & HUBS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.25em] font-mono-tech text-stone-300">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#C5A880] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
