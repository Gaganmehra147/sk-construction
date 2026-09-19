import { ShieldCheck, Ruler, Clock, Award } from "lucide-react";

export interface StatItemData {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix?: string | null;
}

interface WhyVijaySectionProps {
  stats: StatItemData[];
}

export default function WhyVijaySection({ stats }: WhyVijaySectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#121212] text-[#FBF9F5] relative overflow-hidden border-b border-white/10">
      {/* Blueprint grid */}
      <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-2">
              [ 08 // PROVEN CREDIBILITY ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-white">
              Why Vijay Interior & Construction
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md">
            The confluence of architectural vision, civil engineering mastery, and transparent single-source project execution.
          </p>
        </div>

        {/* Dynamic Trust Metrics Numbers - Editorial Large Typography */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 border-b border-white/10 pb-12 sm:pb-16">
          {stats.map((stat) => (
            <div key={stat.key} className="space-y-2">
              <div className="flex items-baseline gap-0.5">
                <span className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono-tech text-xl sm:text-2xl md:text-3xl text-[#C5A880]">
                  {stat.suffix || "+"}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider text-stone-400 font-mono-tech border-t border-white/10 pt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Pillars (Trust Statements) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
          <div className="border border-white/10 p-6 sm:p-8 bg-[#181818] space-y-4">
            <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif-heading text-xl text-white">
              Absolute Single-Source Accountability
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              No buck-passing between independent interior decorators and civil contractors. We manage foundation shoring, electrical conduits, stone masonry, and millwork under one unified contract.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-[#181818] space-y-4">
            <Ruler className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif-heading text-xl text-white">
              Micron-Level Tolerances
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              We employ precision laser levels, lab-tested M25 concrete, and CNC-cut modular cabinetry. Snag lists are addressed with zero tolerance before client handover.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-[#181818] space-y-4">
            <Clock className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif-heading text-xl text-white">
              Guaranteed Handover Timelines
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              Our Gantt master schedules are backed by clear milestone commitments. Weekly high-resolution photo reports keep you informed wherever you are in the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
