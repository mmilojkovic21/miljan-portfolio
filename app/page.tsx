"use client";

import { useState, useEffect, type ReactNode, type CSSProperties } from "react";

// ─── Links — fill these in ──────────────────────────────────
const GITHUB_URL = "#";
const LINKEDIN_URL = "#";

// ─── Design tokens ───────────────────────────────────────────
const T = {
  paper: "#EFEFEA",
  ink: "#101418",
  card: "#FFFFFF",
  cobalt: "#2B4BF2",
  lime: "#D8F34E",
  muted: "#5F6672",
  line: "#D8D8D0",
};

const fontDisplay = "var(--font-archivo)";
const fontBody = "var(--font-instrument-sans)";
const fontMono = "var(--font-jetbrains-mono)";

// ─── Data (iz CV-a) ──────────────────────────────────────────
const SKILLS = [
  "C# / .NET 8", "ASP.NET Core", "EF Core", "REST APIs", "Laravel / PHP",
  "Vue.js", "React", "Next.js", "TypeScript", "SQL Server", "PostgreSQL",
  "MySQL", "SignalR", "JWT / OAuth2", "Stripe", "Docker", "Git",
];

const PROJECTS = [
  {
    name: "E-Rechnung 2Go",
    tag: "Multi-tenant invoicing API",
    stack: ".NET 8 · EF Core · SQL Server · SignalR · Stripe · Vue",
    desc: "APIs for a multi-tenant invoicing system: tenants, customers, VAT, subscriptions, CSV export and real-time document updates.",
  },
  {
    name: "Lightning Service",
    tag: "Restaurant platform",
    stack: "ASP.NET Core · SignalR · Stripe · React Native · Expo",
    desc: "Architecture for a mobile-first reservation & ordering platform with customer, waiter and admin roles.",
  },
  {
    name: "DJ Landing Page",
    tag: "Promo website",
    stack: "React · Tailwind · DaisyUI · EmailJS",
    desc: "Responsive promo site with video hero, gallery, YouTube embeds, contact form and lazy loading.",
  },
];

const JSON_LINES = [
  '{',
  '  "name": "Miljan Milojkovic",',
  '  "role": "Full-Stack Developer",',
  '  "experience_years": 5,',
  '  "backend": [".NET", "C#", "Laravel"],',
  '  "frontend": ["React", "Vue", "Next.js"],',
  '  "location": "Leskovac, Serbia (Remote)",',
  '  "status": "open_to_work",',
  '  "response_time_ms": 42',
  '}',
];

// ─── Typing terminal ─────────────────────────────────────────
function Terminal() {
  const [typed, setTyped] = useState(0);
  const full = JSON_LINES.join("\n");
  useEffect(() => {
    if (typed >= full.length) return;
    const t = setTimeout(() => setTyped((n) => n + 2), 18);
    return () => clearTimeout(t);
  }, [typed, full.length]);

  return (
    <div className="h-full flex flex-col rounded-2xl overflow-hidden" style={{ background: T.ink }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid #2A2F38` }}>
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-xs" style={{ fontFamily: fontMono, color: "#7A8494" }}>
          GET /api/developer — 200 OK
        </span>
      </div>
      <pre className="flex-1 p-4 text-xs md:text-sm leading-relaxed overflow-auto m-0"
        style={{ fontFamily: fontMono, color: T.lime }}>
        {full.slice(0, typed)}
        <span className="animate-pulse">▌</span>
      </pre>
    </div>
  );
}

// ─── Card wrapper ────────────────────────────────────────────
type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  dark?: boolean;
};

function Card({ children, className = "", style = {}, dark = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1 ${className}`}
      style={{
        background: dark ? T.ink : T.card,
        border: `1px solid ${dark ? T.ink : T.line}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type EyebrowProps = {
  children: ReactNode;
  color?: string;
};

function Eyebrow({ children, color = T.muted }: EyebrowProps) {
  return (
    <div className="text-xs uppercase mb-3" style={{ fontFamily: fontMono, letterSpacing: "0.12em", color }}>
      {children}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────
export default function Portfolio() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: T.paper, fontFamily: fontBody, color: T.ink }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-14">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div style={{ fontFamily: fontMono }} className="text-sm font-medium">
            miljan.dev
          </div>
          <a href="mailto:miljan.milojkovic22@gmail.com"
            className="text-sm px-4 py-2 rounded-full font-medium"
            style={{ background: T.ink, color: T.paper }}>
            Contact me
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">

          {/* Hero */}
          <Card className="md:col-span-4 md:row-span-2 flex flex-col justify-between min-h-96">
            <Eyebrow>Full-Stack Developer · .NET & JavaScript</Eyebrow>
            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-none mb-4"
                style={{ fontFamily: fontDisplay }}>
                Miljan<br />Milojkovic
              </h1>
              <p className="text-base md:text-lg max-w-md" style={{ color: T.muted }}>
                Nearly 5 years building APIs, multi-tenant business systems and
                web apps — from database to deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[".NET / C#", "Laravel", "React / Vue", "Next.js"].map((s) => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: T.paper, border: `1px solid ${T.line}`, fontFamily: fontMono }}>
                  {s}
                </span>
              ))}
            </div>
          </Card>

          {/* Terminal — signature */}
          <div className="md:col-span-2 md:row-span-2 min-h-96">
            <Terminal />
          </div>

          {/* Experience */}
          <Card className="md:col-span-3">
            <Eyebrow>Experience</Eyebrow>
            <div className="flex items-baseline justify-between mb-1">
              <div className="font-bold text-lg" style={{ fontFamily: fontDisplay }}>ITM GmbH</div>
              <div className="text-xs" style={{ fontFamily: fontMono, color: T.muted }}>2021 — now</div>
            </div>
            <p className="text-sm" style={{ color: T.muted }}>
              Software Engineer / Web Developer. Business web apps, REST APIs,
              auth flows, Stripe & SignalR integrations, deployments and
              production debugging.
            </p>
          </Card>

          {/* Location + clock */}
          <Card className="md:col-span-3 flex items-center justify-between">
            <div>
              <Eyebrow>Based in</Eyebrow>
              <div className="font-bold text-lg" style={{ fontFamily: fontDisplay }}>
                Leskovac, Serbia
              </div>
              <div className="text-sm" style={{ color: T.muted }}>Remote · CET timezone</div>
            </div>
            <div className="text-3xl font-medium" style={{ fontFamily: fontMono }}>
              {time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </Card>

          {/* Projects */}
          {PROJECTS.map((p) => (
            <Card key={p.name} className="md:col-span-2 flex flex-col">
              <Eyebrow color={T.cobalt}>{p.tag}</Eyebrow>
              <div className="font-bold text-xl mb-2" style={{ fontFamily: fontDisplay }}>{p.name}</div>
              <p className="text-sm mb-4 flex-1" style={{ color: T.muted }}>{p.desc}</p>
              <div className="text-xs" style={{ fontFamily: fontMono, color: T.muted }}>{p.stack}</div>
            </Card>
          ))}

          {/* Skills */}
          <Card className="md:col-span-4">
            <Eyebrow>Stack</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: T.paper, border: `1px solid ${T.line}`, fontFamily: fontMono }}>
                  {s}
                </span>
              ))}
            </div>
          </Card>

          {/* Languages */}
          <Card className="md:col-span-2" dark>
            <Eyebrow color="#7A8494">Languages</Eyebrow>
            <div className="space-y-2" style={{ color: T.paper }}>
              {([["Serbian", "native"], ["English", "fluent"], ["German", "beginner"]] as const).map(([l, lvl]) => (
                <div key={l} className="flex justify-between text-sm">
                  <span className="font-medium">{l}</span>
                  <span style={{ fontFamily: fontMono, color: "#7A8494" }}>{lvl}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact CTA */}
          <Card className="md:col-span-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ background: T.cobalt, border: `1px solid ${T.cobalt}` }}>
            <div>
              <div className="text-2xl md:text-3xl font-black mb-1"
                style={{ fontFamily: fontDisplay, color: "#FFFFFF" }}>
                Let&apos;s build something.
              </div>
              <div className="text-sm" style={{ color: "#C6D0FF" }}>
                Open to full-time roles (DACH / EU remote) and freelance projects.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:miljan.milojkovic22@gmail.com"
                className="px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: "#FFFFFF", color: T.cobalt }}>
                miljan.milojkovic22@gmail.com
              </a>
              <a href={GITHUB_URL} className="px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ border: "1px solid #C6D0FF", color: "#FFFFFF" }}>
                GitHub
              </a>
              <a href={LINKEDIN_URL} className="px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{ border: "1px solid #C6D0FF", color: "#FFFFFF" }}>
                LinkedIn
              </a>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-xs text-center" style={{ fontFamily: fontMono, color: T.muted }}>
          © {new Date().getFullYear()} Miljan Milojkovic — built with Next.js & Tailwind
        </div>
      </div>
    </div>
  );
}
