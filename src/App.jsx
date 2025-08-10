import React, { useEffect, useRef, useState } from "react";

/* ====== Color System (same palette as before) ====== */
const COLORS = {
  dark: "#1c1b1a",
  paper: "#2a2726",
  light: "#f4f3ee",
  accent: "#e0afa0",
  muted: "#bcb8b1",
  soft: "#8a817c",
};

/* ====== tiny utility ====== */
function cn(...a) {
  return a.filter(Boolean).join(" ");
}

/* ====== Brand ====== */
function BrandLogo({ size = 44, showText = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="block">
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
          style={{ color: COLORS.accent, fontSize: "1.25rem" }}
        >
          M. aflah
        </span>
      )}
    </div>
  );
}

/* ====== Buttons (bigger) ====== */
function Button({
  children,
  variant = "accent",
  size = "lg",
  as = "a",
  href = "#",
  className,
  style,
  ...props
}) {
  const Comp = as;
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-base",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-7 text-lg",
  };
  let styles = { ...style };
  if (variant === "accent")
    styles = { backgroundColor: COLORS.accent, color: "#2b211c", ...styles };
  if (variant === "outline")
    styles = { border: `1px solid ${COLORS.accent}`, color: COLORS.light, background: "transparent", ...styles };
  if (variant === "ghost") styles = { color: COLORS.light, background: "transparent", ...styles };

  return (
    <Comp
      href={href}
      className={cn(
        "btn-interactive inline-flex items-center justify-center rounded-2xl font-semibold shadow-md active:translate-y-[1px] transition-transform",
        sizes[size],
        className
      )}
      style={styles}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* ====== Card bits ====== */
function Card({ className, children }) {
  return (
    <div
      className={cn("rounded-2xl border", className)}
      style={{ background: COLORS.paper, borderColor: "rgba(255,255,255,0.06)" }}
    >
      {children}
    </div>
  );
}
function CardContent({ className, children }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

/* ====== Simple reveal-on-scroll ====== */
function useReveal() {
  const [ok, setOk] = useState(false);
  const r = useRef(null);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOk(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { r, ok };
}
function Reveal({ children }) {
  const { r, ok } = useReveal();
  return (
    <div
      ref={r}
      className={cn(
        "transition-all duration-700 will-change-transform",
        ok ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {children}
    </div>
  );
}

/* ====== HERO ====== */
function Hero() {
  return (
    <section
      className="relative"
      style={{ background: `linear-gradient(135deg, ${COLORS.dark}, #1a1918)`, color: COLORS.light }}
    >
      <div className="mx-auto max-w-6xl px-4 py-28 md:py-40 grid md:grid-cols-2 gap-14 items-center min-h-screen">
        <div className="space-y-6">
          <p className="uppercase tracking-[0.2em] text-xs sm:text-sm" style={{ color: COLORS.soft }}>
            The #1 remote video editing partner
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
            style={{ color: COLORS.light }}
          >
            Stop wasting time on{" "}
            <span style={{ color: "#9a7cff" }}>mediocre edits</span>. Get videos that actually convert.
          </h1>

          <p className="text-base sm:text-lg max-w-prose" style={{ color: COLORS.muted }}>
            Before: average editing that costs time & results. After: a smooth, story-first edit focused on
            retention & performance.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#contact" size="xl">
              Claim a free spot
            </Button>
            <Button href="#work" variant="outline" size="xl">
              See work
            </Button>
          </div>
        </div>

        {/* Right column intentionally empty now (no images). */}
        <div className="hidden md:block" />
      </div>

      {/* scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm select-none"
        style={{ color: COLORS.muted }}
      >
        ↓ Scroll down
      </div>
    </section>
  );
}

/* ====== MAIN PAGE ====== */
export default function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // hide native cursor everywhere
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    // smooth dot follower
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0,
      raf = null;
    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      const c = cursorRef.current;
      if (c) {
        c.style.setProperty("--x", String(x));
        c.style.setProperty("--y", String(y));
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    // enlarge dot on interactive hover
    const selector = ".btn-interactive, a, button, [role='button'], iframe";
    const isInteractive = (el) => !!(el && el.closest && el.closest(selector));
    const onOver = (e) => {
      if (!isInteractive(e.target)) return;
      cursorRef.current?.classList.add("is-active");
      e.target.closest(".btn-interactive")?.classList.add("is-hover");
    };
    const onOut = (e) => {
      if (!isInteractive(e.target) || isInteractive(e.relatedTarget)) return;
      cursorRef.current?.classList.remove("is-active");
      e.target.closest(".btn-interactive")?.classList.remove("is-hover");
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: COLORS.dark, color: COLORS.light }}>
      <style>{`
        /* Only the dot cursor; hide underlines; keep it clean */
        * { cursor: none !important; }
        a { color: ${COLORS.accent}; text-decoration: none; }
        a:hover { text-decoration: none; opacity:.95; }

        .btn-interactive { transition: transform .18s ease, box-shadow .18s ease; }
        .btn-interactive.is-hover { transform: scale(1.1); box-shadow:0 0 12px ${COLORS.accent}; }

        /* dot cursor */
        @keyframes idlePulse {
          0%,100% { transform:translate3d(calc(var(--x,0)*1px - 50%), calc(var(--y,0)*1px - 50%), 0) scale(var(--s,1)); box-shadow:0 0 6px ${COLORS.accent}55 }
          50%     { transform:translate3d(calc(var(--x,0)*1px - 50%), calc(var(--y,0)*1px - 50%), 0) scale(var(--s,1)); box-shadow:0 0 14px ${COLORS.accent}AA }
        }
        .cursor-dot {
          position: fixed; left:0; top:0; width:10px; height:10px; border-radius:50%;
          pointer-events:none; will-change:transform; z-index:2147483647;
          background:${COLORS.accent};
          animation: idlePulse 2s ease-in-out infinite;
          transform: translate3d(-50%,-50%,0);
        }
        .cursor-dot.is-active { --s:1.6; box-shadow:0 0 12px ${COLORS.accent}, 0 0 24px ${COLORS.accent}AA }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(32,30,29,0.7)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <BrandLogo />
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#work">Work</a>
            <a href="#testimonials">Feedback</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <Button href="#contact" variant="accent" size="lg">
            Get in touch
          </Button>
        </div>
      </header>

      {/* Big, scrollable hero */}
      <Hero />

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Selected Work</h2>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
            {/* Replace with your actual video link when ready */}
            <iframe
              className="w-full h-[315px] sm:h-[480px]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Client Feedback</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "John Doe",
              role: "Marketing Manager",
              feedback: "Clear comms and fast delivery. Strong sense of pacing.",
            },
            {
              name: "Sarah Khan",
              role: "YouTube Creator",
              feedback: "Retention jumped. Edits felt tight and professional.",
            },
            { name: "Ali Reza", role: "Business Owner", feedback: "Reliable and easy to work with." },
          ].map((t, i) => (
            <Reveal key={i}>
              <Card>
                <CardContent>
                  <p className="mb-4" style={{ color: COLORS.muted }}>
                    &ldquo;{t.feedback}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm" style={{ color: COLORS.soft }}>
                      {t.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About</h2>
        </Reveal>
        <Reveal>
          <p className="max-w-prose" style={{ color: COLORS.muted }}>
            I edit videos with a story-first approach: keep viewers engaged, respect their time, and make the
            message land.
          </p>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Contact</h2>
        </Reveal>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Let’s build something that performs.</h3>
                <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
                  Share the goal, format, deadline, and reference links.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button href="mailto:you@example.com" variant="accent" size="lg">
                  Email
                </Button>
                <Button href="#" variant="outline" size="lg">
                  LinkedIn
                </Button>
                <Button href="#" variant="outline" size="lg">
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ background: "rgba(32,30,29,0.7)", borderColor: "rgba(255,255,255,0.08)", color: COLORS.soft }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-xs">
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      {/* dot cursor on top */}
      <div ref={cursorRef} className="cursor-dot" />
    </div>
  );
}
