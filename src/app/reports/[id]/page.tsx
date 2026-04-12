import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteReportButton from "@/components/DeleteReportButton";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  if (!report) notFound();

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: findings } = await adminSupabase
    .from("findings")
    .select("*")
    .eq("report_id", id);

  const severityColor = {
    high: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#EF4444" },
    medium: { bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.3)", text: "#EAB308" },
    low: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", text: "#22C55E" },
  }[report.severity as "high" | "medium" | "low"] || {
    bg: "transparent",
    border: "#1E293B",
    text: "#64748B",
  };

  const formattedDate = new Date(report.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date(report.created_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#0A0E17] bg-grid-pattern p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                href="/dashboard"
                className="text-xs font-display tracking-widest text-[#64748B] hover:text-[#00F0FF] transition-colors"
              >
                ← DASHBOARD
              </Link>
            </div>
            <h1 className="font-display text-white text-2xl tracking-widest mb-1">
              THREAT REPORT
            </h1>
            <p className="text-[#64748B] text-xs font-mono">
              {formattedDate} · {formattedTime}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DeleteReportButton reportId={report.id} />
            <div
              className="px-4 py-2 rounded-lg border text-sm font-display tracking-widest"
              style={{
                background: severityColor.bg,
                borderColor: severityColor.border,
                color: severityColor.text,
              }}
            >
              {report.severity.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-widest mb-1">
                Report type
              </p>
              <p className="font-display text-white text-sm tracking-wider">
                {report.report_type.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-widest mb-1">
                Risk score
              </p>
              <p className="font-mono text-[#00F0FF] text-lg font-bold">
                {report.risk_score}
                <span className="text-[#64748B] text-xs">/100</span>
              </p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-widest mb-1">
                Status
              </p>
              <p className="font-display text-white text-sm tracking-wider">
                {report.status.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="border-t border-[#1E293B] pt-5">
            <p className="text-[#64748B] text-xs uppercase tracking-widest mb-3">
              Submitted input
            </p>
            <div className="bg-[#0A0E17] border border-[#1E293B] rounded-xl p-4">
              <p className="text-[#CBD5E1] text-sm font-mono break-all leading-relaxed">
                {report.raw_input}
              </p>
            </div>
          </div>
        </div>

        {findings && findings.length > 0 && (
          <div className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-6">
            <h2 className="font-display text-white text-sm tracking-widest mb-4">
              FINDINGS
            </h2>
            <div className="space-y-3">
              {findings.map(
                (
                  f: {
                    category: string;
                    reason: string;
                    severity_weight: number;
                  },
                  i: number,
                ) => (
                  <div
                    key={i}
                    className="bg-[#0A0E17] border border-[#1E293B] rounded-xl p-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-[#00F0FF] text-xs font-display tracking-widest mb-1">
                        {f.category.toUpperCase().replace(/_/g, " ")}
                      </p>
                      <p className="text-[#CBD5E1] text-sm">{f.reason}</p>
                    </div>
                    <span className="text-[#EF4444] text-xs font-mono whitespace-nowrap">
                      +{f.severity_weight} pts
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {report.ai_analysis && (
          <div className="bg-[#0D131F] border border-[#00F0FF]/20 rounded-2xl p-6">
            <h2 className="font-display text-[#00F0FF] text-sm tracking-widest mb-4">
              AI ANALYSIS
            </h2>
            <p className="text-[#CBD5E1] text-sm leading-relaxed whitespace-pre-wrap">
              {report.ai_analysis
                .replace(/#{1,6}\s/g, "")
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .replace(/\*(.*?)\*/g, "$1")}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
