"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import HeimdallLogo from "@/components/HeimdallLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setError(error.message);
      else setError("Check your email for a confirmation link.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else if (data.session) {
        router.refresh();
        router.push("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0A0E17] bg-grid-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <HeimdallLogo size={80} />
          </div>
          <h1 className="font-display text-white text-3xl tracking-[0.2em] font-bold mb-2">
            HEIMDALL
          </h1>
          <p className="text-[#64748B] text-sm tracking-widest uppercase">
            All-seeing security
          </p>
        </div>

        <div className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8">
          <h2 className="text-white font-medium mb-6">
            {isSignUp ? "Create account" : "Sign in"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#64748B] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                placeholder="analyst@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#64748B] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p
                className={`text-sm ${error.includes("Check your email") ? "text-[#00F0FF]" : "text-red-400"}`}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-all disabled:opacity-50"
              style={{
                background: "rgba(0, 240, 255, 0.1)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                color: "#00F0FF",
              }}
            >
              {loading
                ? "Authenticating..."
                : isSignUp
                  ? "Create account"
                  : "Sign in"}
            </button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-[#64748B] hover:text-white text-sm transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
