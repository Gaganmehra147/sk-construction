"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  shortDesc: string;
  coverImage: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  // Fallback if empty
  const displayServices = services && services.length > 0 ? services : [
    {
      id: "1",
      number: "01",
      name: "Interior Design",
      slug: "interior-design",
      shortDesc: "Bespoke spatial planning, custom boiserie, and tailored furnishings.",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#141414] text-[#FBF9F5] relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-2">
              [ 02 // DISCIPLINES & SCOPE ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-white">
              Architectural Services
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Ten integrated disciplines covering every phase of high-end interior architecture and structural execution.
          </p>
        </div>

        {/* Desktop: Interactive Horizontal Panels (Hover to Expand & Switch) */}
        <div className="hidden lg:flex min-h-[560px] border border-white/10 overflow-hidden relative bg-[#1A1A1A]">
          {/* Dynamic Active Background with Smooth Transition */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out opacity-25"
            style={{
              backgroundImage: `url('${displayServices[activeIdx]?.coverImage || displayServices[0]?.coverImage}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent pointer-events-none" />

          {/* Service Column Panels */}
          {displayServices.map((service, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={service.slug}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative z-10 flex flex-col justify-between p-6 border-r border-white/10 transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "flex-[3.5] bg-[#141414]/85 backdrop-blur-sm"
                    : "flex-1 hover:bg-white/5"
                }`}
              >
                {/* Top: Service Number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono-tech transition-all duration-300 ${
                      isActive
                        ? "text-2xl text-[#C5A880] font-semibold"
                        : "text-sm text-stone-500"
                    }`}
                  >
                    {service.number}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-mono-tech uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30 px-2 py-0.5">
                      ACTIVE DISCIPLINE
                    </span>
                  )}
                </div>

                {/* Middle / Bottom Content */}
                <div className="space-y-4 pt-12">
                  {/* Service Title */}
                  <h3
                    className={`font-serif-heading transition-all duration-300 leading-tight ${
                      isActive
                        ? "text-2xl xl:text-3xl text-white font-semibold"
                        : "text-lg text-stone-400 rotate-0 [writing-mode:vertical-rl] tracking-wider my-6"
                    }`}
                  >
                    {service.name}
                  </h3>

                  {/* Expanded Information */}
                  {isActive && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                      <div className="w-16 h-[1.5px] bg-[#C5A880]" />
                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                        {service.shortDesc}
                      </p>

                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C5A880] text-[#141414] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-white transition-colors"
                      >
                        <span>Explore Discipline</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Subtle vertical accent line on active */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A880]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet: Stacked Accordion Layout */}
        <div className="lg:hidden space-y-3">
          {displayServices.map((service, idx) => {
            const isExpanded = mobileExpanded === idx;
            return (
              <div
                key={service.slug}
                className="border border-white/10 bg-[#1A1A1A] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                  aria-expanded={isExpanded}
                  className="w-full p-4 sm:p-5 min-h-[52px] flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono-tech text-xs sm:text-sm text-[#C5A880] font-semibold">
                      {service.number}
                    </span>
                    <span className="font-serif-heading text-base sm:text-lg text-white font-medium">
                      {service.name}
                    </span>
                  </div>
                  <div className="text-stone-400 shrink-0 ml-2">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-[#C5A880]" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-6 space-y-4 border-t border-white/5 pt-4 animate-in fade-in duration-300">
                    <div
                      className="w-full aspect-[16/9] sm:aspect-[21/9] bg-cover bg-center border border-white/10"
                      style={{ backgroundImage: `url('${service.coverImage}')` }}
                    />
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>
                    <div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-[#141414] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors min-h-[44px]"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
