"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-white/5 hover:bg-red-950/40 hover:text-red-300 text-stone-400 transition-colors"
      title="Log out"
      aria-label="Log out"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
