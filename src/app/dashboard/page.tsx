import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Your submitted reports</p>
          </div>
          <Link
            href="/reports/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            New report
          </Link>
        </div>

        {!reports || reports.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No reports yet.</p>
            <Link
              href="/reports/new"
              className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
            >
              Submit your first report →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Link key={report.id} href={`/reports/${report.id}`}>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      {report.report_type}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          report.severity === "high"
                            ? "bg-red-900 text-red-300"
                            : report.severity === "medium"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-green-900 text-green-300"
                        }`}
                      >
                        {report.severity}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {report.risk_score} pts
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm truncate">
                    {report.raw_input}
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
