"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// ─── Links ───────────────────────────────────────────────────
const EMAIL = "miljan.milojkovic22@gmail.com";
const LINKEDIN_URL = "https://linkedin.com/in/miljan-milojkovic-682878200";

// ─── Data (iz CV-a) ──────────────────────────────────────────
const HIGHLIGHTS = [
  "Warehouse management module on event-driven architecture",
  "EDI, ZUGFeRD & XRechnung parsing for automated invoicing",
  "GoBD-compliant e-invoicing systems for a German client",
  "Jira-like ticketing: boards, workflows, ticket lifecycle",
  "Schema design, migrations & query tuning on SQL Server / Postgres / MySQL",
  "Stripe, SMTP, JWT / OAuth2 and SignalR real-time",
];

const LANGUAGES = [
  { name: "Serbian", level: "native", pct: 100 },
  { name: "English", level: "fluent", pct: 90 },
  { name: "German", level: "beginner", pct: 25 },
];

const STACK = [
  { group: "backend", items: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "Minimal APIs", "SignalR", "Laravel"] },
  { group: "frontend", items: ["Vue.js", "React", "Next.js", "TypeScript"] },
  { group: "data", items: ["SQL Server", "PostgreSQL", "MySQL", "Event-driven", "Multi-tenant"] },
  { group: "integrations", items: ["Stripe", "JWT / OAuth2", "ZUGFeRD", "XRechnung", "Docker"] },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Scroll progress bar ─────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

// ─── Bento card ──────────────────────────────────────────────
function Card({
  children,
  className = "",
  id,
  delay = 0,
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={`rounded-[20px] ${
        accent ? "bg-accent text-bg" : "border border-line bg-surface"
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-xs uppercase tracking-[0.08em] ${className || "text-muted"}`}>
      {children}
    </span>
  );
}

// ─── Main ────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <ScrollProgress />
      <div className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-4 pt-6 pb-8 font-mono text-[13px]">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            miljanmilojkovic.com
          </a>
          <nav className="flex flex-wrap gap-6 text-muted">
            <a href="#work" className="transition-colors hover:text-ink">/work</a>
            <a href="#stack" className="transition-colors hover:text-ink">/stack</a>
            <a href="#contact" className="transition-colors hover:text-ink">/contact</a>
          </nav>
        </header>

        <main id="top" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Hero */}
          <Card className="col-span-full flex flex-wrap items-end justify-between gap-10 px-6 py-10 sm:px-12 sm:py-14">
            <div className="min-w-0 flex-[999_1_560px]">
              <p className="mb-5 font-mono text-[13px] text-accent">$ whoami</p>
              <h1 className="text-[clamp(48px,7vw,96px)] font-semibold leading-[0.95] tracking-[-0.04em]">
                Miljan
                <br />
                Milojković
              </h1>
              <p className="mt-7 max-w-[640px] text-lg leading-[1.45] text-body sm:text-[22px]">
                Full-stack software engineer. Deep backend on .NET 8 / C# / ASP.NET Core,
                practical frontend in Vue, React and Next.js.
              </p>
            </div>
            <div className="flex flex-[1_1_240px] flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex min-h-[52px] items-center justify-center rounded-xl bg-accent font-semibold text-bg transition-opacity hover:opacity-90"
              >
                Email me
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center rounded-xl border border-line-strong font-medium transition-colors hover:border-muted"
              >
                LinkedIn ↗
              </a>
            </div>
          </Card>

          {/* Stats */}
          <Card className="flex min-h-[200px] flex-col justify-between gap-6 p-8" delay={0.05}>
            <Label>Experience</Label>
            <div>
              <div className="text-[64px] font-semibold leading-none tracking-[-0.04em]">
                5<span className="text-accent">+</span>
              </div>
              <div className="mt-2 text-muted">years in production</div>
            </div>
          </Card>

          <Card className="flex min-h-[200px] flex-col justify-between gap-6 p-8" delay={0.1}>
            <Label>Based in</Label>
            <div>
              <div className="text-4xl font-semibold tracking-[-0.03em]">Niš, Serbia</div>
              <div className="mt-2 text-muted">Working with German-market clients</div>
            </div>
          </Card>

          <Card className="flex min-h-[200px] flex-col gap-4 p-8" delay={0.15}>
            <Label>Languages</Label>
            <div className="flex flex-col gap-3.5">
              {LANGUAGES.map((l, i) => (
                <div key={l.name}>
                  <div className="mb-1.5 flex justify-between text-[15px]">
                    <span>{l.name}</span>
                    <span className="text-muted">{l.level}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
                      className="h-1.5 rounded-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card id="work" className="col-span-full flex flex-wrap gap-10 px-6 py-10 sm:px-12">
            <div className="flex-[1_1_260px]">
              <Label>ITM GmbH · Sep 2021 — now</Label>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em]">
                Software Engineer / Web Developer
              </h2>
            </div>
            <ul className="grid min-w-0 flex-[999_1_560px] gap-x-8 gap-y-6 text-base leading-[1.55] text-body sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h}>
                  <span className="font-mono text-accent">→ </span>
                  {h}
                </li>
              ))}
            </ul>
          </Card>

          {/* Projects */}
          <Card accent className="flex min-h-[300px] flex-col gap-4 p-9">
            <Label className="text-bg">Project · SaaS API</Label>
            <h3 className="text-[34px] font-bold tracking-[-0.03em]">E-Rechnung 2Go</h3>
            <p className="leading-[1.55]">
              Multi-tenant invoicing APIs — tenants, customers, VAT, subscriptions, CSV export
              and real-time document updates.
            </p>
            <span className="mt-auto font-mono text-xs">.NET 8 · EF Core · SignalR · Stripe · Vue</span>
          </Card>

          <Card className="flex min-h-[300px] flex-col gap-4 p-9" delay={0.05}>
            <Label>Project · Internal tool</Label>
            <h3 className="text-[34px] font-bold tracking-[-0.03em]">Ticketbase</h3>
            <p className="leading-[1.55] text-body">
              Helpdesk for creating, tracking and resolving support tickets across the ITM team.
            </p>
            <div className="mt-auto flex justify-between gap-3 font-mono text-xs text-muted">
              <span>Laravel · Livewire</span>
              <a
                href="https://itm.ticketbase.net/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                open ↗
              </a>
            </div>
          </Card>

          <Card className="flex min-h-[300px] flex-col gap-3 p-9" delay={0.1}>
            <Label>Education</Label>
            <h3 className="mt-2 text-2xl font-semibold leading-[1.2] tracking-[-0.02em]">
              Faculty of Sciences and Mathematics, University of Niš
            </h3>
            <p className="text-muted">Computer Science — one exam remaining</p>
            <p className="mt-auto text-sm text-muted">Gymnasium Leskovac</p>
          </Card>

          {/* Stack */}
          <Card id="stack" className="col-span-full px-6 py-10 sm:px-12">
            <Label>Stack</Label>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STACK.map((s) => (
                <div key={s.group}>
                  <div className="mb-3 font-mono text-[13px] text-accent">{s.group}</div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <footer
            id="contact"
            className="col-span-full flex flex-wrap items-center justify-between gap-4 px-1 pt-6 font-mono text-[13px] text-muted"
          >
            <span>© {new Date().getFullYear()} Miljan Milojković</span>
            <a href={`mailto:${EMAIL}`} className="text-ink hover:text-accent">
              {EMAIL}
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
