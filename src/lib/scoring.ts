export interface Finding {
  category: string;
  severity_weight: number;
  reason: string;
}

export interface ScoreResult {
  score: number;
  severity: "low" | "medium" | "high";
  findings: Finding[];
}

export function scoreInput(reportType: string, rawInput: string): ScoreResult {
  let score = 0;
  const findings: Finding[] = [];
  const input = rawInput.toLowerCase();

  if (reportType === "url") {
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(input)) {
      score += 30;
      findings.push({
        category: "raw_ip",
        severity_weight: 30,
        reason: "URL uses a raw IP address instead of a domain name.",
      });
    }
    if (
      input.includes("bit.ly") ||
      input.includes("tinyurl") ||
      input.includes("t.co")
    ) {
      score += 20;
      findings.push({
        category: "shortened_url",
        severity_weight: 20,
        reason:
          "URL uses a shortening service which can hide the real destination.",
      });
    }
    if (
      input.includes("verify") ||
      input.includes("secure-login") ||
      input.includes("update-account") ||
      input.includes("confirm")
    ) {
      score += 25;
      findings.push({
        category: "suspicious_keywords",
        severity_weight: 25,
        reason: "URL contains keywords commonly used in phishing attacks.",
      });
    }
    const suspiciousTlds = [".xyz", ".tk", ".ml", ".ga", ".cf", ".gq"];
    if (suspiciousTlds.some((tld) => input.includes(tld))) {
      score += 20;
      findings.push({
        category: "suspicious_tld",
        severity_weight: 20,
        reason: "URL uses a domain extension commonly associated with abuse.",
      });
    }
  }

  if (reportType === "email" || reportType === "message") {
    const urgencyPhrases = [
      "act now",
      "urgent",
      "immediately",
      "expires today",
      "limited time",
      "last chance",
    ];
    if (urgencyPhrases.some((phrase) => input.includes(phrase))) {
      score += 25;
      findings.push({
        category: "urgent_language",
        severity_weight: 25,
        reason: "Message contains urgency phrases commonly used in scams.",
      });
    }
    const credentialPhrases = [
      "verify your account",
      "confirm your password",
      "enter your details",
      "login required",
      "update your information",
    ];
    if (credentialPhrases.some((phrase) => input.includes(phrase))) {
      score += 30;
      findings.push({
        category: "credential_request",
        severity_weight: 30,
        reason: "Message requests account credentials or personal information.",
      });
    }
    const moneyPhrases = [
      "gift card",
      "wire transfer",
      "western union",
      "you have won",
      "claim your prize",
      "send money",
    ];
    if (moneyPhrases.some((phrase) => input.includes(phrase))) {
      score += 35;
      findings.push({
        category: "financial_scam",
        severity_weight: 35,
        reason: "Message contains financial scam indicators.",
      });
    }
  }

  const severity = score >= 60 ? "high" : score >= 25 ? "medium" : "low";

  return { score, severity, findings };
}
