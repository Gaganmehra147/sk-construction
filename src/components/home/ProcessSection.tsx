"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    subtitle: "Vision, Program & Lifestyle Alignment",
    description: "In-depth preliminary dialogue to understand your spatial aspirations, daily rituals, functional requirements, and investment parameters.",
    deliverables: ["Initial Design Brief", "Feasibility Assessment", "Scope Parameter Matrix"],
  },
  {
    number: "02",
    title: "Site Visit",
    subtitle: "Topographical & Structural Diagnostics",
    description: "Our principal architect and structural engineer perform a laser-accurate physical audit: sun path analysis, structural load checks, and plumbing stack verification.",
    deliverables: ["Digital As-Built Survey", "Solar & Wind Orientation Audit", "Structural Constraints Log"],
  },
  {
    number: "03",
    title: "Design & Planning",
    subtitle: "Zoning, Circulation & Architectural Schematics",
    description: "We translate programmatic needs into fluid spatial arrangements. We iterate floor plans, sightlines, furniture geometry, and architectural transitions.",
    deliverables: ["2D Master Floor Plans", "Circulation Schematics", "Initial Elevation Concepts"],
  },
  {
    number: "04",
    title: "3D Visualization",
    subtitle: "Photorealistic Spatial Rendering",
    description: "Full 3D modeling and lighting simulations. Experience your future home with exact daylight angles, textures, and custom millwork proportions.",
    deliverables: ["3D Virtual Spatial Walkthrough", "Photorealistic Still Renders", "Day & Night Lighting Studies"],
  },
  {
    number: "05",
    title: "Material Selection",
    subtitle: "Sensory Curation & Physical Sampling",
    description: "Touch physical slabs of Italian marble, hand-selected oak veneers, brushed brass hardware, and acoustic wallcoverings in our materials studio.",
    deliverables: ["Curated Tactile Mood Boards", "Specific Stone & Timber Batch Tagging", "Hardware & Fabric Schedule"],
  },
  {
    number: "06",
    title: "Estimation",
    subtitle: "Itemized Bill of Quantities (BOQ)",
    description: "Complete transparency with zero hidden escalations. An exhaustive line-item estimate detailing quantities, unit rates, brand specifications, and payment milestones.",
    deliverables: ["Itemized Architectural BOQ", "Material Brand Specifications", "Master Phase Gantt Schedule"],
  },
  {
    number: "07",
    title: "Execution",
    subtitle: "Single-Source Turnkey Construction",
    description: "Site mobilization under a dedicated project director. Civil RCC framing, concealed electrical/plumbing conduits, precision plastering, and custom carpentry.",
    deliverables: ["Dedicated Project Director On-Site", "Weekly High-Resolution Photo Logs", "Milestone Quality Inspections"],
  },
  {
    number: "08",
    title: "Quality Check",
    subtitle: "180-Point Engineering Audit",
    description: "Rigorous snagging and testing: laser level checks on flooring, pressure tests on plumbing, thermal imaging for insulation, and acoustic sound-leak measurements.",
    deliverables: ["180-Point Quality Certificate", "Laser Alignment Verification", "MEP Pressure Test Reports"],
  },
  {
    number: "09",
    title: "Handover",
    subtitle: "Key Handover & Life-Cycle Warranty",
    description: "Deep chemical cleaning, final styling, and formal presentation of your completed space with as-built drawings and warranty documentation.",
    deliverables: ["Keys & Architectural Dossier", "Digital As-Built Drawings", "Comprehensive Maintenance Warranty"],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#141414] text-[#FBF9F5] relative overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-2">
              [ 06 // ROADMAP & EXECUTION ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-white">
              From First Idea to Final Detail.
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md">
            Our nine-stage architectural discipline eliminates guesswork, delays, and friction.
          </p>
        </div>

        {/* Vertical Timeline & Step Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 relative space-y-3">
            {/* Connecting Vertical Progress Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-white/10 hidden sm:block pointer-events-none" />

            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-center gap-4 p-4 transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-[#1F1E1D] border-[#C5A880] text-white shadow-lg translate-x-2"
                      : "bg-[#171717] border-white/5 text-stone-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {/* Step Badge */}
                  <div
                    className={`w-8 h-8 shrink-0 flex items-center justify-center font-mono-tech text-xs transition-colors ${
                      isActive
                        ? "bg-[#C5A880] text-[#141414] font-bold"
                        : "bg-white/5 text-stone-400"
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <div className="font-serif-heading text-base font-medium">
                      {step.title}
                    </div>
                    <div className="text-[11px] font-light text-stone-400 truncate max-w-[240px]">
                      {step.subtitle}
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-[#C5A880] translate-x-1" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Stage Architectural Dossier Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 w-full">
            <div className="border border-white/15 bg-[#1B1B1B] p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 sm:pb-6">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
                    PHASE SPECIFICATION
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-mono-tech text-3xl sm:text-4xl font-bold text-[#C5A880]">
                      {STEPS[activeStep].number}
                    </span>
                    <h3 className="font-serif-heading text-xl sm:text-2xl md:text-3xl text-white font-semibold">
                      {STEPS[activeStep].title}
                    </h3>
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono-tech text-stone-400 border border-white/10 px-2.5 sm:px-3 py-1 shrink-0">
                  STAGE {activeStep + 1} OF 9
                </span>
              </div>

              {/* Subtitle & Description */}
              <div className="space-y-4">
                <div className="text-xs font-mono-tech uppercase tracking-widest text-stone-300">
                  {STEPS[activeStep].subtitle}
                </div>
                <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                  {STEPS[activeStep].description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
                  [ VERIFIED DELIVERABLES ]
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-200">
                  {STEPS[activeStep].deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono-tech">
                  Turnkey Transparency Protocol
                </span>
                <Link
                  href="/process"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-white transition-colors"
                >
                  <span>Detailed Process Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
