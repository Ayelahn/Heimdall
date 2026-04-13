"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeimdallLogo from "./HeimdallLogo";
import Modal from "./Modal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSignOut = async () => {
    setShowSignOut(false);
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  if (pathname === "/login") return null;

  return (
    <>
      {showSignOut && (
        <Modal
          title="SIGN OUT"
          message="Are you sure you want to sign out of Heimdall?"
          confirmLabel="Sign out"
          cancelLabel="Cancel"
          onConfirm={handleSignOut}
          onCancel={() => setShowSignOut(false)}
        />
      )}
      <nav className="border-b border-[#1E293B] bg-[#0D131F] px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <HeimdallLogo size={44} />
            <div className="flex flex-col">
              <span className="font-display text-white text-lg tracking-[0.15em] font-bold leading-none">
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
            <Link
              href="/about"
              className={`text-xs font-display tracking-[0.15em] transition-colors ${
                pathname === "/about"
                  ? "text-[#00F0FF]"
                  : "text-[#64748B] hover:text-white"
              }`}
            >
              ABOUT
            </Link>
            <button
              onClick={() => setShowSignOut(true)}
              className="text-xs font-display tracking-[0.15em] text-[#64748B] hover:text-white transition-colors"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
