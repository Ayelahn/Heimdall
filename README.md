# Heimdall — All-Seeing Security

A full-stack cybersecurity triage web application that scores URLs, emails, and messages for scam and phishing indicators.

**Live:** [heimdall.aelanv.com](https://heimdall.aelanv.com)

## What it does

Paste a suspicious URL, email, or message. Heimdall runs it through a custom rules engine checking for known phishing indicators, then sends it to the Claude AI for a structured threat assessment. Returns a 0–100 risk score, severity rating, findings breakdown, and plain-language recommendation. Every report is saved to your account.

## Stack

Next.js · React · TypeScript · Tailwind CSS · Supabase (PostgreSQL + Auth + RLS) · Anthropic Claude API · Framer Motion · Docker · GitHub Actions CI/CD · Vercel

## Built by

Aelan Valdez — [LinkedIn](https://linkedin.com/in/aelanv) · [heimdall.aelanv.com](https://heimdall.aelanv.com)
