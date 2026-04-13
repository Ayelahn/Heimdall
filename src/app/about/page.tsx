"use client";

import { motion } from "framer-motion";
import HeimdallLogo from "@/components/HeimdallLogo";

export default function About() {
  const steps = [
    {
      step: "01",
      title: "SUBMIT A THREAT",
      desc: "Paste a suspicious URL, email, or message into the report form. Heimdall accepts all three input types and analyzes them differently based on context.",
      color: "#00F0FF",
    },
    {
      step: "02",
      title: "RULES ENGINE FIRES",
      desc: "A custom-built pattern detection engine checks the input against known phishing indicators — raw IPs, suspicious TLDs, shortened URLs, urgency language, credential requests, and financial scam phrases.",
      color: "#8A2BE2",
    },
    {
      step: "03",
      title: "AI ANALYSIS RUNS",
      desc: "The input is sent to Claude — an AI built by Anthropic — with a cybersecurity analyst prompt. Claude returns a structured threat assessment with risk level and a plain-language recommendation.",
      color: "#00F0FF",
    },
    {
      step: "04",
      title: "REPORT IS STORED",
      desc: "Every report is saved to your personal account with a 0-100 risk score, severity rating, individual findings, and the full AI analysis. Your history is yours alone.",
      color: "#8A2BE2",
    },
  ];

  const stack = [
    { name: "NEXT.JS", desc: "Full-stack React framework" },
    { name: "REACT", desc: "UI components and state" },
    { name: "TAILWIND CSS", desc: "Styling and design system" },
    { name: "SUPABASE", desc: "Database, auth, and storage" },
    { name: "POSTGRESQL", desc: "Relational data with RLS" },
    { name: "CLAUDE API", desc: "AI-powered threat analysis" },
    { name: "FRAMER MOTION", desc: "Page and component animations" },
    { name: "VERCEL", desc: "Deployment and hosting" },
    { name: "TYPESCRIPT", desc: "Type-safe JavaScript" },
    { name: "GITHUB ACTIONS", desc: "CI/CD pipeline" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0E17] bg-grid-pattern p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <HeimdallLogo size={100} />
          </div>
          <h1 className="font-display text-white text-3xl tracking-[0.2em] font-bold mb-3">
            HEIMDALL
          </h1>
          <p className="text-[#00F0FF] text-xs tracking-[0.4em] uppercase mb-4">
            All-seeing security
          </p>
          <p className="text-[#64748B] text-sm max-w-lg mx-auto leading-relaxed">
            The all-seeing watchman. A symbol of vigilance, precision, and
            impenetrable security.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="font-display text-white text-sm tracking-widest mb-4">
            THE STORY
          </h2>
          <div className="space-y-4 text-[#CBD5E1] text-sm leading-relaxed">
            <p>
              Hey guys, my name is{" "}
              <span className="text-white font-medium">Aelan Valdez</span>.
              currently im a Cybersecurity & Networking major working part-time
              as a Geek Squad Technician, thanks for checking out my project
            </p>
            <p>
              Heimdall is my first full-stack web application, built in
              preparation for <span className="text-[#00F0FF]">HackMesa</span> —
              my first hackathon. I built it in about two weeks, learning
              JavaScript, React, Next.js, SQL, and full-stack architecture from
              scratch simultaneously while building and deploying the product...
            </p>
            <p>
              No templates, no tutorials, just 2 laptops and a ton of coffee.
              (my thinkpad laptop motherboard fried doing this)
            </p>
            <p>
              The project name comes from Norse mythology, Heimdall the God of
              Vigilance, the all-seeing watchman of Asgard who guards the
              Bifrost bridge. That is what this app is. A watchman. Something
              that looks at what you hand it and tells you the truth.
            </p>
            <p>
              Ill be honest, I built this project for fun and to learn, not
              necessarily to solve a real problem. But if it can help even one
              person avoid a phishing scam, that would be absolutely awesome. I
              have some future plans of definitely adding more features, things
              like file uploads, password strength and leak checks, potentially
              even a browser extension. But for now, this is Heimdall. My first
              full-stack project, Thanks for reading :){" "}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h2 className="font-display text-white text-sm tracking-widest mb-6">
            HOW IT WORKS
          </h2>
          <div className="space-y-5">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <span
                  className="font-display text-xs tracking-widest mt-0.5"
                  style={{ color: item.color }}
                >
                  {item.step}
                </span>
                <div>
                  <p className="font-display text-white text-xs tracking-widest mb-2">
                    {item.title}
                  </p>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h2 className="font-display text-white text-sm tracking-widest mb-6">
            TECH STACK
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="bg-[#0A0E17] border border-[#1E293B] rounded-xl p-4"
              >
                <p className="font-display text-[#00F0FF] text-xs tracking-widest mb-1">
                  {tech.name}
                </p>
                <p className="text-[#64748B] text-xs">{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-[#0D131F] border border-[#1E293B] rounded-2xl p-8 mb-6"
          style={{ borderColor: "rgba(0,240,255,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <h2 className="font-display text-white text-sm tracking-widest mb-4">
            BUILT BY
          </h2>
          <p className="text-white font-medium text-lg mb-1">Aelan Valdez</p>
          <p className="text-[#64748B] text-sm mb-6">
            Cybersecurity & Networking Major · Part Time Technician · ThinkPad·
            Enthusiast · Soon to be HackMesa Champion
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/aelanv/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-display tracking-widest border"
              style={{
                background: "rgba(0,240,255,0.1)",
                borderColor: "rgba(0,240,255,0.3)",
                color: "#00F0FF",
              }}
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com/Ayelahn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-display tracking-widest border"
              style={{ borderColor: "#1E293B", color: "#64748B" }}
            >
              GITHUB
            </a>
          </div>
        </motion.div>

        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <p className="text-[#64748B] text-xs font-mono">
            Built for HackMesa 2026 · First full-stack project · Powered by a
            fried Thinkpad and too much coffee
          </p>
        </motion.div>
      </div>
    </main>
  );
}
