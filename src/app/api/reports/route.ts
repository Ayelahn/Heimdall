import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { scoreInput } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { reportType, rawInput } = body;

  if (!reportType || !rawInput) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const { score, severity, findings } = scoreInput(reportType, rawInput);

  const { data: report, error } = await supabase
    .from("reports")
    .insert({
      user_id: user.id,
      report_type: reportType,
      raw_input: rawInput,
      risk_score: score,
      severity: severity,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (findings.length > 0) {
    await supabase.from("findings").insert(
      findings.map((f) => ({
        report_id: report.id,
        category: f.category,
        severity_weight: f.severity_weight,
        reason: f.reason,
      })),
    );
  }

  return NextResponse.json({ id: report.id }, { status: 201 });
}
