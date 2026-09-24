"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Users,
  Quote,
  Layers,
  BarChart3,
  Settings,
  Globe,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

interface AdminShellClientProps {
  session: {
    name: string;
    role: string;
    email: string;
  };
  children: React.ReactNode;
}

export default function AdminShellClient({
  session,
  children,
}: AdminShellClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on path change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Enquiries / CRM", href: "/admin/leads", icon: Users },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Materials", href: "/admin/materials", icon: Layers },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
    { name: "Trust Metrics", href: "/admin/stats", icon: BarChart3 },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
    { name: "SEO Settings", href: "/admin/seo", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#FBF9F5] flex flex-col lg:flex-row">
      {/* Mobile & Tablet Header Bar */}
      <header className="lg:hidden h-16 bg-[#141414] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle admin navigation"
            className="p-2 -ml-2 text-stone-300 hover:text-white transition-colors"
          >
            {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-[#C5A880] flex items-center justify-center bg-[#1A1A1A] text-[#C5A880]">
              <span className="font-serif-heading text-[10px] font-semibold">SK</span>
            </div>
            <span className="font-serif-heading text-sm font-bold tracking-wider text-white">
              SK CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 text-stone-400 hover:text-white"
            title="Open Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-[#141414] border-r border-white/15 p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4">
                <Link href="/admin" className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center bg-[#1A1A1A] text-[#C5A880]">
                    <span className="font-serif-heading text-xs font-semibold">SK</span>
                  </div>
                  <div>
                    <div className="font-serif-heading text-sm font-bold tracking-wider text-white">
                      SK CMS
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono-tech">
                      Studio Admin
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 transition-colors uppercase tracking-wider text-[11px] ${
                        isActive
                          ? "bg-[#C5A880]/15 text-[#C5A880] font-semibold border-l-2 border-[#C5A880]"
                          : "text-stone-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#C5A880]" : "text-stone-400"}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom User Info & Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="px-3 py-2 bg-[#1A1A1A] border border-white/5 text-xs">
                <div className="font-medium text-white text-[11px] truncate">
                  {session.name}
                </div>
                <div className="text-[9px] font-mono-tech text-[#C5A880] uppercase">
                  {session.role}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] uppercase tracking-wider border border-white/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Site</span>
                </Link>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#141414] border-r border-white/10 flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen">
        <div>
          {/* Studio Brand Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center bg-[#1A1A1A] text-[#C5A880]">
                <span className="font-serif-heading text-xs font-semibold">SK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-sm font-bold tracking-wider text-white">
                  SK CMS
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono-tech">
                  Studio Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 transition-colors uppercase tracking-wider text-[11px] ${
                    isActive
                      ? "bg-[#C5A880]/15 text-[#C5A880] font-semibold border-l-2 border-[#C5A880]"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C5A880]" : "text-[#C5A880]/80"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Badge & Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between px-3 py-2 bg-[#1A1A1A] border border-white/5 text-xs">
            <div className="truncate">
              <div className="font-medium text-white text-[11px] truncate">
                {session.name}
              </div>
              <div className="text-[9px] font-mono-tech text-[#C5A880] uppercase">
                {session.role}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] uppercase tracking-wider"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>

            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F0F10] overflow-y-auto">
        {/* Top Desktop Header */}
        <header className="hidden lg:flex h-16 border-b border-white/10 bg-[#141414]/60 backdrop-blur-md px-6 sm:px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-stone-400">
            <span className="text-[#C5A880] font-semibold">[ CONTROL DESK ]</span>
            <span>SK Construction Management</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-tech">
            <span className="text-stone-500">
              STATUS: SECURE_SESSION
            </span>
          </div>
        </header>

        {/* Child Pages */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
