import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

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

  const { data: findings, error: findingsError } = await adminSupabase
    .from("findings")
    .select("*")
    .eq("report_id", id);

  console.log("findings:", findings, "error:", findingsError, "id:", id);

  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Report detail</h1>
          <p className="text-gray-500 text-sm">ID: {report.id}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Type
            </span>
            <span className="text-white font-medium">{report.report_type}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Status
            </span>
            <span className="text-white font-medium">{report.status}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Risk score
            </span>
            <span className="text-white font-medium">{report.risk_score}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Severity
            </span>
            <span className="text-white font-medium">{report.severity}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-500 block mb-2">
              Input
            </span>
            <p className="text-gray-300 bg-gray-800 rounded-lg p-3 text-sm break-all">
              {report.raw_input}
            </p>
          </div>
        </div>

        {findings && findings.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-white font-semibold mb-4">Findings</h2>
            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 text-sm font-medium">
                      {f.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      +{f.severity_weight} pts
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{f.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {report.ai_analysis && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-white font-semibold mb-3">AI Analysis</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{report.ai_analysis}</p>
          </div>
        )}
      </div>
    </main>
  );
}
