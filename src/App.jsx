import React, { useEffect, useRef } from "react";

/** ====== Color palette (earlier one) ====== */
const COLORS = {
  dark: "#1c1b1a",
  paper: "#2a2726",
  light: "#f4f3ee",
  accent: "#e0afa0",
  muted: "#8c8b81",
  soft: "#8a817c",
};

function CursorDot() {
  const dotRef = useRef(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: COLORS.accent,
        pointerEvents: "none",
        transform: "translate3d(-20px, -20px, 0)",
        zIndex: 9999,
      }}
    />
  );
}

function Button({ href = "#", children, variant = "primary" }) {
  const base =
    "no-underline inline-flex items-center justify-center h-12 md:h-12 px-6 md:px-7 rounded-2xl text-base font-semibold transition-transform active:translate-y-[1px]";
  const styles =
    variant === "primary"
      ? {
          class: "text-[#1b1816]",
          style: { backgroundColor: COLORS.accent, color: "#1b1816" },
        }
      : {
          class: "text-white",
          style: {
            backgroundColor: "transparent",
            border: `1px solid ${COLORS.soft}`,
            color: COLORS.light,
          },
        };

  return (
    <a href={href} className={`${base} ${styles.class}`} style={styles.style}>
      {children}
    </a>
  );
}

function Nav() {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(28,27,26,0.7)",
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${COLORS.paper}`,
      }}
    >
      <div className="mx-auto max-w-6xl h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Brand mark + dot */}
          <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M18 14v36l28-18z" fill={COLORS.accent} />
          </svg>
          <span className="font-semibold" style={{ color: COLORS.light }}>
            M. aflah
          </span>
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: COLORS.accent,
              display: "inline-block",
              marginLeft: 6,
            }}
          />
        </div>

        <nav
          className="hidden md:flex items-center gap-8 text-sm"
          style={{ color: COLORS.muted }}
        >
          <a className="no-underline" href="#work">
            Work
          </a>
          <a className="no-underline" href="#about">
            Expertise
          </a>
          <a className="no-underline" href="#results">
            Results
          </a>
          <a className="no-underline" href="#pricing">
            Pricing
          </a>
        </nav>

        <Button href="#contact">Get in touch</Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="w-full"
      style={{ background: COLORS.dark, borderBottom: `1px solid ${COLORS.paper}` }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left column (copy) */}
        <div className="md:col-span-2">
          <p
            className="text-xs tracking-[0.18em] font-semibold mb-5"
            style={{ color: COLORS.muted }}
          >
            THE #1 REMOTE VIDEO EDITING PARTNER
          </p>

          <h1
            className="text-[32px] leading-[1.15] sm:text-5xl md:text-[56px] font-black"
            style={{ color: COLORS.light }}
          >
            Stop wasting time on{" "}
            <span style={{ color: COLORS.accent }}>mediocre edits</span>. Get
            videos that actually convert.
          </h1>

          <p className="mt-5 text-base sm:text-lg" style={{ color: COLORS.soft }}>
            Before: Average editing, your time, your effort. After: a smooth,
            fully-managed process focused on retention and results.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Button href="#contact">Claim a free spot</Button>
            <Button href="#work" variant="secondary">
              See work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl px-4 py-12 md:py-16"
      style={{ background: COLORS.dark }}
    >
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6"
        style={{ color: COLORS.light }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div style={{ background: COLORS.dark, color: COLORS.light }}>
      <CursorDot />
      <Nav />
      <Hero />

      <Section id="work" title="Selected Work">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: COLORS.paper,
            border: `1px solid ${COLORS.paper}`,
          }}
        >
          <iframe
            className="w-full h-[315px] sm:h-[450px]"
            src="https://www.youtube.com/embed/S841m3RpkFo"
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Section>

      <Section id="about" title="About">
        <p style={{ color: COLORS.soft }} className="max-w-prose">
          I edit with a story-first approach: hook early, keep the pace tight, and
          land the message. Clean sound, tasteful motion, and ruthless cuts.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{
            background: COLORS.paper,
            border: `1px solid ${COLORS.paper}`,
          }}
        >
          <div>
            <h3 className="text-xl font-bold" style={{ color: COLORS.light }}>
              Let’s make videos that convert.
            </h3>
            <p style={{ color: COLORS.muted }} className="text-sm mt-1">
              Tell me your goal, deadline, and references.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="mailto:you@example.com">Email</Button>
            <Button href="#" variant="secondary">
              WhatsApp
            </Button>
          </div>
        </div>
      </Section>

      <footer
        className="border-t"
        style={{ borderColor: COLORS.paper, background: COLORS.dark }}
      >
        <div
          className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-xs"
          style={{ color: COLORS.muted }}
        >
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top" className="no-underline" style={{ color: COLORS.light }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
