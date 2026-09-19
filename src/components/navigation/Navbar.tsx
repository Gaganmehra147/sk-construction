"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from "lucide-react";

interface NavbarProps {
  phone?: string;
  whatsapp?: string;
}

export default function Navbar({ phone = "+91 98765 43210", whatsapp = "+91 98765 43210" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileNavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-3"
            : "bg-gradient-to-b from-[#141414]/95 via-[#141414]/60 to-transparent py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Brand Identity Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#C5A880] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 bg-[#1C1B1A] text-[#C5A880] shadow-sm shrink-0">
              <span className="font-serif-heading text-sm font-bold tracking-wider transition-transform duration-500 group-hover:-rotate-45">
                V
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-[0.2em] leading-none text-white group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
                VIJAY
              </span>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.24em] text-[#C5A880] font-medium leading-none mt-1 whitespace-nowrap">
                Interior & Construction
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] font-medium transition-colors relative py-1.5 whitespace-nowrap ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Architectural Phone & Start Project CTA - Perfectly aligned and guaranteed not to truncate */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
            {/* Phone Link with Architectural Icon Badge */}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="group/phone inline-flex items-center gap-2.5 text-stone-200 hover:text-[#C5A880] transition-colors py-1 whitespace-nowrap"
              title={`Call Studio: ${phone}`}
              aria-label={`Call Studio: ${phone}`}
            >
              <span className="w-7 h-7 border border-white/20 flex items-center justify-center bg-white/5 group-hover/phone:border-[#C5A880] group-hover/phone:bg-[#C5A880]/10 transition-colors shrink-0">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              </span>
              <span className="font-mono-tech text-[11px] xl:text-xs tracking-wider text-stone-200 group-hover/phone:text-white transition-colors">
                {phone}
              </span>
            </a>

            {/* Architectural Hairline Divider */}
            <div className="h-4 w-px bg-white/20 shrink-0 hidden xl:block" />

            {/* CTA Button */}
            <Link
              href="/#enquire"
              className="group inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-2 bg-[#C5A880] text-[#121212] text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.16em] font-bold transition-all duration-300 hover:bg-white hover:text-black border border-[#C5A880] shadow-sm whitespace-nowrap shrink-0"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-white hover:text-[#C5A880] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Architectural Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full max-w-md h-full bg-[#121212] border-l border-white/10 flex flex-col justify-between p-6 sm:p-8 text-[#FBF9F5] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2 sm:pt-4">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center bg-[#1C1B1A] text-[#C5A880]">
                    <span className="font-serif-heading text-sm font-bold">V</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif-heading text-lg font-bold tracking-[0.2em] text-white">
                      VIJAY
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.26em] text-[#C5A880]">
                      Interior & Construction
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-mono-tech mb-4">
                [ NAVIGATION INDEX ]
              </div>
              <nav className="flex flex-col space-y-2">
                {mobileNavLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between group py-2.5 border-b border-white/5 transition-colors"
                  >
                    <span className="font-serif-heading text-xl sm:text-2xl tracking-wide text-white group-hover:text-[#C5A880] transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs font-mono-tech text-[#C5A880]">
                      0{idx + 1}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10 mt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <Link
                href="/#enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 py-2.5 border border-white/20 text-xs tracking-wider text-white hover:border-[#C5A880] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Studio</span>
                </a>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Vijay%20Interior,%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 border border-[#25D366]/40 text-[#25D366] text-xs tracking-wider hover:bg-[#25D366]/10 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
