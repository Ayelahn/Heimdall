"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";

type Report = {
  id: string;
  report_type: string;
  raw_input: string;
  risk_score: number;
  severity: string;
  status: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setReports(data || []);
      setLoading(false);
    };
    fetchReports();
  }, [router]);

  const filtered = useMemo(() => {
    let result = [...reports];
    if (filter !== "all")
      result = result.filter(
        (r) => r.report_type === filter || r.severity === filter,
      );
    if (sort === "newest")
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    if (sort === "oldest")
      result.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    if (sort === "highest") result.sort((a, b) => b.risk_score - a.risk_score);
    if (sort === "lowest") result.sort((a, b) => a.risk_score - b.risk_score);
    return result;
  }, [filter, sort, reports]);

  const handleDelete = async (id: string) => {
    await supabase.from("reports").delete().eq("id", id);
    setReports((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const handleBulkDelete = async () => {
    for (const id of selected) {
      await supabase.from("reports").delete().eq("id", id);
    }
    setReports((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
    setShowBulkDelete(false);
    setSelectMode(false);
  };

  const handleCardClick = (id: string) => {
    if (selectMode) {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else {
      router.push(`/reports/${id}`);
    }
  };

  const urlCount = reports.filter((r) => r.report_type === "url").length;
  const emailCount = reports.filter((r) => r.report_type === "email").length;
  const messageCount = reports.filter(
    (r) => r.report_type === "message",
  ).length;
  const highCount = reports.filter((r) => r.severity === "high").length;

  return (
    <main className="min-h-screen bg-[#0A0E17] bg-grid-pattern p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-white text-2xl tracking-widest mb-1">
              DASHBOARD
            </h1>
            <p className="text-[#64748B] text-sm">Threat analysis history</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelected(new Set());
                setSelectMode((prev) => !prev);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-display tracking-widest transition-all border"
              style={{
                background: selectMode ? "rgba(239,68,68,0.05)" : "transparent",
                borderColor: selectMode ? "rgba(239,68,68,0.2)" : "#1E293B",
                color: selectMode ? "#EF4444" : "#64748B",
              }}
            >
              {selectMode ? "CANCEL" : "SELECT"}
            </button>
            <Link
              href="/reports/new"
              className="px-5 py-2.5 rounded-xl text-xs font-display tracking-widest transition-all border"
              style={{
                background: "rgba(0,240,255,0.1)",
                borderColor: "rgba(0,240,255,0.3)",
                color: "#00F0FF",
              }}
            >
              + NEW REPORT
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {[
            { label: "URL reports", value: urlCount, color: "#00F0FF" },
            { label: "Email reports", value: emailCount, color: "#8A2BE2" },
            { label: "Message reports", value: messageCount, color: "#64748B" },
            { label: "High severity", value: highCount, color: "#EF4444" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0D131F] border border-[#1E293B] rounded-xl p-4"
            >
              <div
                className="text-2xl font-mono font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-[#64748B] text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {selected.size > 0 && (
          <div className="flex items-center justify-between bg-[#0D131F] border border-red-500/20 rounded-xl px-5 py-3 mb-4">
            <span className="text-xs font-display tracking-widest text-red-400">
              {selected.size} REPORT{selected.size > 1 ? "S" : ""} SELECTED
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs font-display tracking-widest text-[#64748B] hover:text-white transition-colors"
              >
                CLEAR
              </button>
              <button
                onClick={() => setShowBulkDelete(true)}
                className="px-4 py-2 rounded-xl text-xs font-display tracking-widest transition-all border"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  borderColor: "rgba(239,68,68,0.3)",
                  color: "#EF4444",
                }}
              >
                DELETE SELECTED
              </button>
            </div>
          </div>
        )}

        <motion.div
          className="flex items-center gap-3 mb-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="text-[#64748B] text-xs uppercase tracking-widest">
            Filter
          </span>
          {["all", "url", "email", "message", "high", "medium", "low"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest transition-all border"
                style={{
                  background:
                    filter === f ? "rgba(0,240,255,0.1)" : "transparent",
                  borderColor: filter === f ? "rgba(0,240,255,0.4)" : "#1E293B",
                  color: filter === f ? "#00F0FF" : "#64748B",
                }}
              >
                {f}
              </button>
            ),
          )}
          <span className="text-[#64748B] text-xs uppercase tracking-widest ml-4">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#0D131F] border border-[#1E293B] text-[#CBD5E1] text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#00F0FF]/50"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest severity</option>
            <option value="lowest">Lowest severity</option>
          </select>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-[#64748B]">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-[#1E293B] rounded-2xl">
            <p className="text-[#64748B] text-lg mb-3">No reports found.</p>
            <Link
              href="/reports/new"
              className="text-[#00F0FF] hover:underline text-sm"
            >
              Submit a report →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((report) => (
              <motion.div
                key={report.id}
                onClick={() => handleCardClick(report.id)}
                className="bg-[#0D131F] border rounded-xl p-5 transition-all cursor-pointer group relative"
                style={{
                  borderColor: selected.has(report.id)
                    ? "rgba(0,240,255,0.4)"
                    : "#1E293B",
                  background: selected.has(report.id)
                    ? "rgba(0,240,255,0.03)"
                    : "#0D131F",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={
                  !selectMode ? { borderColor: "rgba(0,240,255,0.2)" } : {}
                }
              >
                <div className="flex items-start gap-4">
                  {selectMode && (
                    <div
                      className="mt-1 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all"
                      style={{
                        borderColor: selected.has(report.id)
                          ? "#00F0FF"
                          : "#1E293B",
                        background: selected.has(report.id)
                          ? "rgba(0,240,255,0.2)"
                          : "transparent",
                      }}
                    >
                      {selected.has(report.id) && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="#00F0FF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-widest text-[#64748B] font-medium">
                        {report.report_type}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide ${
                            report.severity === "high"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : report.severity === "medium"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-green-500/10 text-green-400 border border-green-500/20"
                          }`}
                        >
                          {report.severity.toUpperCase()}
                        </span>
                        <span className="text-[#00F0FF] text-sm font-mono">
                          {report.risk_score}
                          <span className="text-[#64748B] text-xs">/100</span>
                        </span>
                        {!selectMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(report.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-[#64748B] hover:text-red-400 transition-all text-xs px-2 py-1 rounded border border-transparent hover:border-red-500/20 font-display tracking-widest"
                          >
                            DELETE
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-[#CBD5E1] text-sm truncate mb-2 group-hover:text-white transition-colors">
                      {report.raw_input}
                    </p>
                    <p className="text-[#64748B] text-xs font-mono">
                      {new Date(report.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <Modal
          title="DELETE REPORT"
          message="This report and all its findings will be permanently deleted. This cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          danger={true}
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
      {showBulkDelete && (
        <Modal
          title="DELETE REPORTS"
          message={`Permanently delete ${selected.size} report${selected.size > 1 ? "s" : ""}? This cannot be undone.`}
          confirmLabel="Delete all"
          cancelLabel="Cancel"
          danger={true}
          onConfirm={handleBulkDelete}
          onCancel={() => setShowBulkDelete(false)}
        />
      )}
    </main>
  );
}
