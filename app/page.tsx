"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

// ─── Links — fill these in ──────────────────────────────────
const GITHUB_URL = "#";
const LINKEDIN_URL = "#";

const fontDisplay = "var(--font-archivo)";
const fontBody = "var(--font-instrument-sans)";
const fontMono = "var(--font-jetbrains-mono)";

const gradientText: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, var(--accent-violet), var(--accent-blue) 55%, var(--accent-lime))",
};

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
    url: "",
  },
  {
    name: "Ticketbase",
    tag: "Internal ticketing system",
    stack: "Laravel · Livewire",
    desc: "Internal helpdesk/support system for creating, tracking and resolving support tickets — contributed to as part of the ITM engineering team.",
    url: "https://itm.ticketbase.net/login",
  },
];

const EXPERIENCE_HIGHLIGHTS = [
  "Designed and shipped REST APIs for a multi-tenant invoicing platform — tenants, customers, VAT, subscriptions and real-time document updates via SignalR.",
  "Architected the backend for a mobile-first reservation & ordering platform with separate customer, waiter and admin roles.",
  "Integrated Stripe billing and JWT/OAuth2 auth flows across multiple production systems.",
  "Owned deployments and production debugging end-to-end, from database schema to release.",
];

const LANGUAGES = [
  { name: "Serbian", level: "native", pct: 100 },
  { name: "English", level: "fluent", pct: 90 },
  { name: "German", level: "beginner", pct: 30 },
];

const JSON_LINES = [
  "{",
  '  "name": "Miljan Milojkovic",',
  '  "role": "Full-Stack Developer",',
  '  "experience_years": 5,',
  '  "backend": [".NET", "C#", "Laravel"],',
  '  "frontend": ["React", "Vue", "Next.js"],',
  '  "location": "Leskovac, Serbia (Remote)",',
  '  "status": "open_to_work",',
  '  "response_time_ms": 42',
  "}",
];

// ─── Scroll progress bar ─────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
      style={{
        scaleX,
        backgroundImage:
          "linear-gradient(90deg, var(--accent-violet), var(--accent-blue), var(--accent-lime))",
      }}
    />
  );
}

// ─── Cursor glow ──────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 });

  const ringX = useMotionValue(-40);
  const ringY = useMotionValue(-40);
  const sRingX = useSpring(ringX, { stiffness: 400, damping: 30 });
  const sRingY = useSpring(ringY, { stiffness: 400, damping: 30 });
  const ringScale = useMotionValue(1);
  const sRingScale = useSpring(ringScale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - 210);
      y.set(e.clientY - 210);
      ringX.set(e.clientX - 12);
      ringY.set(e.clientY - 12);
    };
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) ringScale.set(1.8);
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) ringScale.set(1);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [x, y, ringX, ringY, ringScale]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(8,145,178,0.18), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block rounded-full"
        style={{
          x: sRingX,
          y: sRingY,
          width: 24,
          height: 24,
          scale: sRingScale,
          border: "1.5px solid var(--accent-blue)",
        }}
      />
    </>
  );
}

// ─── Aurora background ───────────────────────────────────────
function AuroraBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1200], [0, -180]);
  const y2 = useTransform(scrollY, [0, 1200], [0, 140]);
  const y3 = useTransform(scrollY, [0, 1200], [0, -100]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "var(--bg)" }}>
      <motion.div
        className="absolute w-[520px] h-[520px]"
        style={{ y: y1, top: "-10%", left: "-5%" }}
      >
        <div
          className="w-full h-full rounded-full blur-[120px] opacity-40 animate-float1"
          style={{ background: "var(--accent-violet)" }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[480px] h-[480px]"
        style={{ y: y2, top: "20%", right: "-10%" }}
      >
        <div
          className="w-full h-full rounded-full blur-[120px] opacity-30 animate-float2"
          style={{ background: "var(--accent-blue)" }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[420px] h-[420px]"
        style={{ y: y3, bottom: "-5%", left: "30%" }}
      >
        <div
          className="w-full h-full rounded-full blur-[130px] opacity-20 animate-float1"
          style={{ background: "var(--accent-lime)" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

// ─── Magnetic wrapper ─────────────────────────────────────────
function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll reveal wrapper ────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Tilt card (3D hover) ─────────────────────────────────────
function TiltCard({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    <div className="h-full flex flex-col">
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-xs" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
          GET /api/developer — 200 OK
        </span>
      </div>
      <pre
        className="flex-1 p-5 text-xs md:text-sm leading-relaxed overflow-auto m-0"
        style={{ fontFamily: fontMono, color: "var(--accent-lime)" }}
      >
        {full.slice(0, typed)}
        <span className="animate-pulse">▌</span>
      </pre>
    </div>
  );
}

// ─── Nav ────────────────────────────────────────────────────
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="relative group py-1 hover:text-[var(--ink)] transition-colors">
      {children}
      <span
        className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ background: "var(--accent-blue)" }}
      />
    </a>
  );
}

function Nav() {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-md"
      style={{ background: "rgba(7,7,11,0.55)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-sm font-medium" style={{ fontFamily: fontMono, color: "var(--ink)" }}>
          Miljan Milojkovic
        </a>
        <div className="hidden sm:flex items-center gap-8 text-sm" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
          <NavLink href="#work">work</NavLink>
          <NavLink href="#experience">experience</NavLink>
          <NavLink href="#contact">contact</NavLink>
        </div>
        <Magnetic>
          <a
            href="mailto:miljan.milojkovic22@gmail.com"
            className="text-sm px-4 py-2 rounded-full font-medium inline-block"
            style={{ background: "var(--ink)", color: "var(--bg)" }}
          >
            Say hi
          </a>
        </Magnetic>
      </div>
    </motion.div>
  );
}

// ─── Word-reveal headline ─────────────────────────────────────
const headlineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const wordVariant: Variants = {
  hidden: { y: 90, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Hero ───────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-14 items-center w-full">
        <div>
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="text-6xl sm:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[0.95] mb-6"
            style={{ fontFamily: fontDisplay }}
          >
            <motion.span variants={wordVariant} className="block bg-clip-text text-transparent" style={gradientText}>
              Miljan
            </motion.span>
            <motion.span variants={wordVariant} className="block" style={{ color: "var(--ink)" }}>
              Milojkovic
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base md:text-lg max-w-md mb-8"
            style={{ color: "var(--muted)", fontFamily: fontBody }}
          >
            Full-stack developer. Nearly 5 years building APIs, multi-tenant
            business systems and web apps — from database to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ background: "var(--ink)", color: "var(--bg)" }}
              >
                See my work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-10">
            {[".NET / C#", "Laravel", "React / Vue", "Next.js"].map((s, i) => (
              <motion.span
                key={s}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--line)",
                  fontFamily: fontMono,
                  color: "var(--muted)",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-[1px]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--accent-violet), var(--accent-blue), var(--accent-lime))",
          }}
        >
          <TiltCard className="rounded-[27px] overflow-hidden h-96 md:h-[440px]" style={{ background: "var(--bg-elevated)" }}>
            <Terminal />
          </TiltCard>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
          scroll
        </span>
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
      </motion.div>
    </section>
  );
}

// ─── Marquee skills ticker ──────────────────────────────────
function Marquee() {
  const doubled = [...SKILLS, ...SKILLS];
  return (
    <div
      className="relative py-6 overflow-hidden -rotate-1"
      style={{ background: "var(--accent-lime)" }}
    >
      <div className="marquee-track flex gap-4 w-max">
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="text-sm md:text-base font-semibold px-5 py-2 rounded-full whitespace-nowrap"
            style={{ fontFamily: fontMono, color: "#07070b", border: "1px solid rgba(7,7,11,0.15)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Experience timeline ─────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
      <Reveal>
        <div className="text-xs uppercase mb-3" style={{ fontFamily: fontMono, letterSpacing: "0.12em", color: "var(--accent-violet)" }}>
          Where I&apos;ve worked
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-16" style={{ fontFamily: fontDisplay, color: "var(--ink)" }}>
          Experience
        </h2>
      </Reveal>

      <div className="relative pl-8 md:pl-12">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 md:left-1 top-2 bottom-2 w-px origin-top"
          style={{ background: "linear-gradient(to bottom, var(--accent-violet), var(--accent-lime))" }}
        />
        <Reveal delay={0.1}>
          <div className="relative pb-4">
            <motion.span
              animate={{ boxShadow: ["0 0 0 0 rgba(94,234,212,0.4)", "0 0 0 10px rgba(94,234,212,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -left-8 md:-left-12 top-2 w-3 h-3 rounded-full"
              style={{ background: "var(--accent-lime)" }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <div className="font-bold text-2xl" style={{ fontFamily: fontDisplay, color: "var(--ink)" }}>
                ITM GmbH
              </div>
              <div className="text-xs" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
                2021 — now
              </div>
            </div>
            <div className="text-sm mb-6" style={{ fontFamily: fontMono, color: "var(--accent-lime)" }}>
              Software Engineer / Web Developer
            </div>
            <ul className="space-y-4 max-w-2xl">
              {EXPERIENCE_HIGHLIGHTS.map((item, i) => (
                <Reveal key={item} delay={0.15 + i * 0.08}>
                  <li className="flex gap-3 text-sm md:text-base" style={{ color: "var(--muted)" }}>
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--accent-blue)" }}
                    />
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Project card with spotlight ─────────────────────────────
function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current!.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <Reveal delay={index * 0.1}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="group relative overflow-hidden rounded-3xl p-8 h-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--line)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, rgba(8,145,178,0.18), transparent 70%)`,
          }}
        />
        <div className="relative">
          <div className="text-xs uppercase mb-3" style={{ fontFamily: fontMono, letterSpacing: "0.1em", color: "var(--accent-blue)" }}>
            {project.tag}
          </div>
          <div className="font-bold text-2xl mb-3 flex items-center gap-2" style={{ fontFamily: fontDisplay, color: "var(--ink)" }}>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {project.name}
                <span aria-hidden style={{ color: "var(--accent-lime)" }}>↗</span>
              </a>
            ) : (
              project.name
            )}
          </div>
          <p className="text-sm mb-6 flex-1" style={{ color: "var(--muted)" }}>
            {project.desc}
          </p>
          <div className="text-xs" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
            {project.stack}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-16 md:pb-20">
      <Reveal>
        <div className="text-xs uppercase mb-3" style={{ fontFamily: fontMono, letterSpacing: "0.12em", color: "var(--accent-violet)" }}>
          Portfolio
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-16" style={{ fontFamily: fontDisplay, color: "var(--ink)" }}>
          Work
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Languages ────────────────────────────────────────────────
function Languages() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 pt-4 pb-16 md:pb-20">
      <Reveal>
        <div className="text-xs uppercase mb-3" style={{ fontFamily: fontMono, letterSpacing: "0.12em", color: "var(--accent-violet)" }}>
          Languages
        </div>
      </Reveal>
      <div className="space-y-5 max-w-lg">
        {LANGUAGES.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.08}>
            <div>
              <div className="flex justify-between text-sm mb-2" style={{ color: "var(--ink)" }}>
                <span className="font-medium">{l.name}</span>
                <span style={{ fontFamily: fontMono, color: "var(--muted)" }}>{l.level}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--accent-violet), var(--accent-lime))" }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 md:px-8 pb-28 md:pb-36">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[32px] p-10 md:p-16 text-center animate-gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(120deg, var(--accent-violet), var(--accent-blue), var(--accent-lime), var(--accent-violet))",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: fontDisplay, color: "#07070b" }}>
            Let&apos;s build something.
          </h2>
          <p className="text-sm md:text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(7,7,11,0.75)" }}>
            Open to full-time roles and freelance projects.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a
                href="mailto:miljan.milojkovic22@gmail.com"
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ background: "#07070b", color: "#f3f2ec" }}
              >
                miljan.milojkovic22@gmail.com
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={GITHUB_URL}
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ border: "1px solid rgba(7,7,11,0.35)", color: "#07070b" }}
              >
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKEDIN_URL}
                className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
                style={{ border: "1px solid rgba(7,7,11,0.35)", color: "#07070b" }}
              >
                LinkedIn
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Main ────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div className="relative min-h-screen" style={{ fontFamily: fontBody, color: "var(--ink)" }}>
      <ScrollProgress />
      <CursorGlow />
      <AuroraBackground />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
        <Languages />
        <Contact />
      </main>
      <div className="text-center pb-12 text-xs" style={{ fontFamily: fontMono, color: "var(--muted)" }}>
        © {new Date().getFullYear()} Miljan Milojkovic — built with Next.js &amp; Framer Motion
      </div>
    </div>
  );
}
