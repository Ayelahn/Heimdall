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
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(
              name,
              value,
              options as Parameters<typeof response.cookies.set>[2],
            ),
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

  let aiAnalysis = "";
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a cybersecurity analyst. Analyze this suspicious ${reportType} for scam or phishing indicators. Be concise and direct — 2-3 sentences maximum.

Input: ${rawInput}

Rules-based score: ${score}/100 (${severity} severity)

Provide your threat assessment:`,
        },
      ],
    });

    aiAnalysis =
      message.content[0].type === "text" ? message.content[0].text : "";
  } catch (err) {
    console.error("AI analysis failed:", err);
    aiAnalysis = "AI analysis unavailable.";
  }

  const { data: report, error } = await supabase
    .from("reports")
    .insert({
      user_id: user.id,
      report_type: reportType,
      raw_input: rawInput,
      risk_score: score,
      severity: severity,
      status: "new",
      ai_analysis: aiAnalysis,
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
