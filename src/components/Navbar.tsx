"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import HeimdallLogo from "./HeimdallLogo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const confirmed = window.confirm("Sign out of Heimdall?");
    if (!confirmed) return;
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (pathname === "/login") return null;

  return (
    <nav className="border-b border-[#1E293B] bg-[#0D131F] px-8 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <HeimdallLogo size={36} />
          <div className="flex flex-col">
            <span className="font-display text-white text-base tracking-[0.15em] font-bold leading-none">
              HEIMDALL
            </span>
            <span className="text-[#00F0FF] text-[9px] tracking-[0.3em] uppercase leading-none mt-0.5">
              All-seeing security
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`text-xs font-display tracking-[0.15em] transition-colors ${
              pathname === "/dashboard"
                ? "text-[#00F0FF]"
                : "text-[#64748B] hover:text-white"
            }`}
          >
            DASHBOARD
          </Link>
          <Link
            href="/reports/new"
            className={`text-xs font-display tracking-[0.15em] transition-colors ${
              pathname === "/reports/new"
                ? "text-[#00F0FF]"
                : "text-[#64748B] hover:text-white"
            }`}
          >
            NEW REPORT
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs font-display tracking-[0.15em] text-[#64748B] hover:text-white transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </nav>
  );
}
