"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Shield, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@vijayinterior.com");
  const [password, setPassword] = useState("admin@vijay2026");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to authenticate.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#FBF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 architectural-grid-dark opacity-35 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-2 border-[#C5A880] flex items-center justify-center bg-[#1A1A1A]">
            <span className="font-serif-heading text-lg font-bold text-[#C5A880]">V</span>
          </div>
        </div>

        <h2 className="text-center font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Studio Control Center
        </h2>
        <p className="mt-1 text-center text-xs font-mono-tech uppercase tracking-[0.2em] text-[#C5A880]">
          Vijay Interior & Construction • Admin
        </p>

        {/* Credentials Notice Box */}
        <div className="mt-4 p-3 bg-[#1A1A1A] border border-white/10 text-stone-300 text-xs font-mono-tech flex items-center justify-between">
          <span>DEFAULT: admin@vijayinterior.com</span>
          <span className="text-[#C5A880]">admin@vijay2026</span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#181818] py-8 px-6 shadow-2xl border border-white/15 sm:px-10 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
                Administrator Email
              </label>
              <div className="mt-1.5 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121212] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <Mail className="w-4 h-4 text-stone-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-stone-300">
                Security Password
              </label>
              <div className="mt-1.5 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121212] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <Lock className="w-4 h-4 text-stone-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:bg-white disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Access Studio Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono-tech text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
