// src/App.jsx
import React, { useEffect, useRef, useState } from "react";

/** Palette (tweaked to your Coolors set) */
const COLORS = {
  dark: "#1c1b1a",
  paper: "#2a2726",
  light: "#f4f3ee",
  accent: "#e0afa0",
  muted: "#bcb8b1",
  soft: "#8a817c",
};

function cn(...a) {
  return a.filter(Boolean).join(" ");
}

/** Small reveal-on-scroll helper (no external libs) */
function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, show };
}

function Reveal({ children, className }) {
  const { ref, show } = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Tiny button */
function Button({ as = "a", href = "#", children, variant = "accent", className }) {
  const Comp = as;
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 h-11 text-sm font-medium transition-transform active:translate-y-[1px]";
  const hover = "hover:scale-[1.04] hover:shadow-[0_0_18px_rgba(224,175,160,.45)]";
  const style =
    variant === "accent"
      ? { backgroundColor: COLORS.accent, color: "#2b211c" }
      : { border: `1px solid ${COLORS.accent}`, color: COLORS.light, background: "transparent" };
  return (
    <Comp href={href} className={cn(base, hover, className)} style={style}>
      {children}
    </Comp>
  );
}

function BrandLogo({ showText = true, size = 42 }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M18 14v36l28-18z"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span
          className="font-extrabold tracking-tight"
          style={{ color: COLORS.accent, fontSize: "1.125rem" }}
        >
          M. aflah
        </span>
      )}
    </div>
  );
}

export default function App() {
  const videoId = "S841m3RpkFo"; // your project video
  const testimonials = [
    {
      name: "John Doe",
      role: "Marketing Manager",
      quote: "Clear comms and fast delivery. Strong sense of pacing.",
    },
    {
      name: "Sarah Khan",
      role: "YouTube Creator",
      quote: "Retention jumped. Edits felt tight and professional.",
    },
    { name: "Ali Reza", role: "Business Owner", quote: "Reliable and easy to work with." },
  ];

  return (
    <div className="min-h-screen" style={{ background: COLORS.dark, color: COLORS.light }}>
      {/* sticky header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(32,30,29,.7)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,.08)",
        }}
      >
        <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
          <BrandLogo />
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#work" className="hover:underline" style={{ color: COLORS.muted }}>
              Work
            </a>
            <a href="#testimonials" className="hover:underline" style={{ color: COLORS.muted }}>
              Feedback
            </a>
            <a href="#about" className="hover:underline" style={{ color: COLORS.muted }}>
              About
            </a>
            <a href="#contact" className="hover:underline" style={{ color: COLORS.muted }}>
              Contact
            </a>
          </nav>
          <Button href="#contact" variant="accent">
            Get in touch
          </Button>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          style={{
            background: `linear-gradient(90deg, ${COLORS.light}, ${COLORS.accent})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          I edit videos that keep people watching.
        </h1>
        <Reveal className="mt-4">
          <p className="max-w-prose" style={{ color: COLORS.muted }}>
            Straight edits, clean sound, tight pacing. Real impact, no fluff.
          </p>
        </Reveal>
        <Reveal className="mt-6">
          <div className="flex flex-wrap gap-3">
            <Button href="#work">See my work</Button>
            <Button href="mailto:you@example.com" variant="outline">
              Email me
            </Button>
          </div>
        </Reveal>
      </section>

      {/* work / video */}
      <section id="work" className="mx-auto max-w-6xl px-4 pb-10">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Selected Work</h2>
        </Reveal>
        <Reveal>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,.35)", background: COLORS.paper }}
          >
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                title="Video preview"
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Client Feedback</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i}>
              <div
                className="rounded-2xl p-5"
                style={{
                  background: COLORS.paper,
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <p className="mb-4" style={{ color: COLORS.muted }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm" style={{ color: COLORS.soft }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* about */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About</h2>
        </Reveal>
        <Reveal>
          <p className="max-w-prose" style={{ color: COLORS.muted }}>
            I’m M. aflah — video editor focused on story-first edits that keep viewers engaged and
            deliver the message cleanly. Tight pacing, clean audio, and an eye for retention.
          </p>
        </Reveal>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact</h2>
        </Reveal>
        <Reveal>
          <div
            className="rounded-2xl p-6"
            style={{
              background: COLORS.paper,
              border: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div className="grid gap-4 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">
                  Let’s build something that performs.
                </h3>
                <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
                  Share the goal, format, deadline, and any reference links.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button href="mailto:you@example.com">Email</Button>
                <Button href="https://www.linkedin.com/" variant="outline">
                  LinkedIn
                </Button>
                <Button href="https://github.com/" variant="outline">
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer
        className="border-t"
        style={{ background: "rgba(32,30,29,.7)", borderColor: "rgba(255,255,255,.08)" }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 text-xs flex items-center justify-between">
          <span style={{ color: COLORS.soft }}>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top" className="hover:underline" style={{ color: COLORS.accent }}>
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
