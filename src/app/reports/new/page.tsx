"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NewReport() {
  const router = useRouter();
  const [reportType, setReportType] = useState("url");
  const [rawInput, setRawInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rawInput.trim()) {
      setError("Please enter something to analyze.");
      return;
    }
    setLoading(true);
    setError("");

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportType, rawInput }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    router.push(`/reports/${data.id}`);
  };

  const typeDescriptions = {
    url: "Paste a suspicious link or domain for analysis.",
    email: "Paste the full email content including subject and body.",
    message: "Paste a suspicious SMS, chat message, or social media DM.",
  };

  const typePlaceholders = {
    url: "https://suspicious-site.xyz/verify-account",
    email: "Subject: Urgent: Your account has been compromised...",
    message: "Hey, you've been selected for a $1000 gift card...",
  };

  return (
    <main className="min-h-screen bg-[#0A0E17] bg-grid-pattern p-8">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="font-display text-white text-2xl tracking-widest mb-1">
            NEW THREAT REPORT
          </h1>
          <p className="text-[#64748B] text-sm">
            Submit suspicious content for AI-powered analysis
          </p>
        </div>

        <div className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-xs font-display tracking-widest text-[#64748B] mb-3">
              REPORT TYPE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["url", "email", "message"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className="py-3 rounded-xl border text-xs font-display tracking-widest transition-all"
                  style={{
                    background:
                      reportType === type
                        ? "rgba(0,240,255,0.1)"
                        : "transparent",
                    borderColor:
                      reportType === type ? "rgba(0,240,255,0.4)" : "#1E293B",
                    color: reportType === type ? "#00F0FF" : "#64748B",
                  }}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="text-[#64748B] text-xs mt-3">
              {typeDescriptions[reportType as keyof typeof typeDescriptions]}
            </p>
          </div>

          <div>
            <label className="block text-xs font-display tracking-widest text-[#64748B] mb-3">
              SUBMITTED INPUT
            </label>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              rows={7}
              className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-xl px-4 py-3 text-[#CBD5E1] text-sm font-mono focus:outline-none focus:border-[#00F0FF]/50 transition-colors resize-none"
              placeholder={
                typePlaceholders[reportType as keyof typeof typePlaceholders]
              }
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl text-sm font-display tracking-widest transition-all disabled:opacity-50 relative overflow-hidden"
            style={{
              background: loading
                ? "rgba(0,240,255,0.05)"
                : "rgba(0,240,255,0.1)",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "#00F0FF",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="inline-block w-3 h-3 border border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
                ANALYZING THREAT...
              </span>
            ) : (
              "ANALYZE THREAT"
            )}
          </button>

          {loading && (
            <p className="text-[#64748B] text-xs text-center">
              AI analysis in progress — this may take 10–20 seconds
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Rules engine", desc: "Pattern-based detection" },
            { label: "AI analysis", desc: "Claude threat assessment" },
            { label: "Threat score", desc: "0–100 risk rating" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#0D131F] border border-[#1E293B] rounded-xl p-4 text-center"
            >
              <p className="font-display text-[#00F0FF] text-xs tracking-widest mb-1">
                {item.label.toUpperCase()}
              </p>
              <p className="text-[#64748B] text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
