"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Award, ShieldCheck, CheckCircle2, HardHat, PhoneCall } from "lucide-react";

export default function HeroSection({
  whatsapp = "+91 98765 43210",
}: {
  whatsapp?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 12;
      const y = (clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Hello SK Construction, I would like to enquire about your turnkey construction and interior services."
  )}`;

  return (
    <div className="relative bg-[#FBF9F5] text-[#141414] overflow-hidden">
      {/* 1. HERO BANNER WITH ANGLE CUT & VIDEO BACKGROUND */}
      <section
        ref={containerRef}
        className="relative min-h-[82vh] sm:min-h-[88vh] flex items-center justify-center pt-32 sm:pt-40 pb-36 sm:pb-44 overflow-hidden bg-[#141414] text-white"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 60px), 50% 100%, 0 calc(100% - 60px))",
        }}
      >
        {/* Continuous Looping Construction Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-700"
            style={{
              transform: `scale(1.05) translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 0)`,
            }}
          >
            <source src="/videos/construction-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Cinematic Dark Tint & Vignette for Ultra-Clean Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/85 via-[#141414]/50 to-[#141414]/90 pointer-events-none" />
        <div className="absolute inset-0 architectural-grid-dark opacity-15 pointer-events-none" />

        {/* Centered Hero Content Matching Website Color Tokens */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          {/* Top Label / Heritage Badge in Champagne Bronze */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1A1A1A]/90 border border-[#C5A880]/60 text-[#C5A880] text-[11px] sm:text-xs font-mono-tech uppercase tracking-[0.28em] font-semibold mb-6 backdrop-blur-md shadow-lg">
            <HardHat className="w-4 h-4 text-[#C5A880]" />
            <span>SK CONSTRUCTION • SINCE 2012</span>
          </div>

          {/* Master Headline (Using Website's Signature Cinzel Architectural Serif & Bronze Accent) */}
          <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight uppercase leading-[1.06] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl">
            We Build <span className="text-[#C5A880] inline-block">The Trust</span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="mt-6 text-stone-200 text-sm sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Single-source turnkey civil engineering, luxury residences, and commercial infrastructure. Built on precision, transparency, and enduring quality.
          </p>

          {/* Centered Action Buttons Harmonized with Website Design */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 sm:pt-10">
            {/* Primary Champagne Bronze CTA Button */}
            <a
              href="#enquire"
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 bg-[#C5A880] hover:bg-[#B39366] text-[#141414] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#C5A880]/20 hover:scale-105 min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 text-[#141414]" />
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary Project Link */}
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 border border-white/30 hover:border-white hover:bg-white/10 text-white text-xs sm:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm min-h-[48px]"
            >
              <span>Our Projects</span>
            </Link>

            {/* WhatsApp VIP Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg shadow-emerald-900/30 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Decorative Angled Accent Line in Champagne Bronze */}
      <div className="relative -mt-14 sm:-mt-16 z-20 flex justify-center pointer-events-none">
        <div className="w-full max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent shadow-[0_0_15px_rgba(197,168,128,0.7)]" />
      </div>

      {/* 2. THREE-PILLAR TRUST BAR (Using Website's Alabaster Background & Stone Palette) */}
      <div className="relative z-20 pt-10 pb-16 sm:pb-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1: Top Rated */}
            <div className="flex items-start gap-4 p-6 bg-white border border-[#141414]/10 hover:border-[#C5A880] transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/40 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-[#C5A880]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif-heading font-semibold text-base sm:text-lg uppercase tracking-wide text-[#141414]">
                  Top Rated
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  180+ completed turnkey projects across luxury residences and commercial hubs with 5-star verified client satisfaction.
                </p>
              </div>
            </div>

            {/* Feature 2: Best Quality */}
            <div className="flex items-start gap-4 p-6 bg-white border border-[#141414]/10 hover:border-[#C5A880] transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/40 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-[#C5A880]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif-heading font-semibold text-base sm:text-lg uppercase tracking-wide text-[#141414]">
                  Best Quality
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  M25/M30 lab-tested concrete, certified structural steel framing, and comprehensive 10-year structural warranty.
                </p>
              </div>
            </div>

            {/* Feature 3: Low Cost / Fair Pricing */}
            <div className="flex items-start gap-4 p-6 bg-white border border-[#141414]/10 hover:border-[#C5A880] transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/40 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7 text-[#C5A880]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif-heading font-semibold text-base sm:text-lg uppercase tracking-wide text-[#141414]">
                  Low Cost & Fair Pricing
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  Guaranteed 0% cost overrun policy. Transparent itemized Bill of Quantities (BOQ) with strict on-time delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
