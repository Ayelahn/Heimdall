"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
    <nav className="border-b border-gray-800 bg-gray-950 px-8 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-white font-bold text-lg tracking-wide"
        >
          Heimdall
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm transition-colors ${pathname === "/dashboard" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/reports/new"
            className={`text-sm transition-colors ${pathname === "/reports/new" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            New report
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
