import { createClient } from "@/lib/supabase/server";
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
    .select("*, findings(*), notes(*)")
    .eq("id", id)
    .single();

  if (!report) notFound();

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
      </div>
    </main>
  );
}
