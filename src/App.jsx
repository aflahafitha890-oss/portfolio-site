import React from "react";

const COLORS = {
  dark: "#1c1b1a",
  paper: "#2a2726",
  light: "#f4f3ee",
  accent: "#e0afa0",
  muted: "#bcb8b1",
  soft: "#8a817c",
};

function cn(...a) { return a.filter(Boolean).join(" "); }

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
          style={{ color: COLORS.accent, fontSize: "1.1rem" }}
        >
          M. aflah
        </span>
      )}
    </div>
  );
}

function Button({ as = "a", href = "#", children, variant = "accent", className, style }) {
  const Comp = as;
  const styles = {
    accent: {
      backgroundColor: COLORS.accent,
      color: "#2b211c",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    outline: {
      border: `1px solid ${COLORS.accent}`,
      color: COLORS.light,
      background: "transparent",
    },
  }[variant];

  return (
    <Comp
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 h-10 text-sm font-medium transition-all",
        "hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(224,175,160,0.25)] active:scale-[0.99]",
        className
      )}
      style={{ ...styles, ...style }}
    >
      {children}
    </Comp>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={cn("rounded-2xl border", className)}
      style={{ background: COLORS.paper, borderColor: "rgba(255,255,255,0.06)" }}
    >
      {children}
    </div>
  );
}
function CardContent({ children, className }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(1200px 600px at 10% -10%, rgba(224,175,160,0.12), transparent), radial-gradient(900px 500px at 100% 0%, rgba(188,184,177,0.10), transparent), ${COLORS.dark}`,
        color: COLORS.light,
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(32,30,29,0.6)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <BrandLogo />
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#work" style={{ color: COLORS.muted }}>Work</a>
            <a href="#testimonials" style={{ color: COLORS.muted }}>Feedback</a>
            <a href="#about" style={{ color: COLORS.muted }}>About</a>
            <a href="#contact" style={{ color: COLORS.muted }}>Contact</a>
          </nav>
          <Button href="#contact" variant="accent">Get in touch</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
          style={{
            background: `linear-gradient(90deg, ${COLORS.light}, ${COLORS.accent})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          I edit videos that keep people watching.
        </h1>
        <p className="mt-4 max-w-prose" style={{ color: COLORS.muted }}>
          Straight edits, clean sound, tight pacing. Real impact, no fluff.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#work">See my work</Button>
          <Button href="mailto:you@example.com" variant="outline">Email me</Button>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Selected Work</h2>
        <Card>
          <CardContent className="p-0">
            <div className="rounded-2xl overflow-hidden">
              <iframe
                className="w-full h-[315px] sm:h-[450px]"
                src="https://www.youtube.com/embed/S841m3RpkFo"
                title="Video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "0" }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Client Feedback</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "John Doe",
              role: "Marketing Manager",
              feedback:
                "Clear comms and fast delivery. Strong sense of pacing.",
            },
            {
              name: "Sarah Khan",
              role: "YouTube Creator",
              feedback:
                "Retention jumped. Edits felt tight and professional.",
            },
            {
              name: "Ali Reza",
              role: "Business Owner",
              feedback: "Reliable and easy to work with.",
            },
          ].map((t, i) => (
            <Card key={i}>
              <CardContent>
                <p className="mb-4" style={{ color: COLORS.muted }}>
                  “{t.feedback}”
                </p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm" style={{ color: COLORS.soft }}>
                  {t.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">About</h2>
        <p className="max-w-prose" style={{ color: COLORS.muted }}>
          I edit videos with a story-first approach: keep viewers engaged, respect their time,
          and make the message land.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Let’s build something that performs.
                </h3>
                <p className="text-sm mt-1" style={{ color: COLORS.muted }}>
                  Share the goal, format, deadline, and reference links.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button href="mailto:you@example.com" variant="accent">
                  Email
                </Button>
                <Button href="#" variant="outline">
                  LinkedIn
                </Button>
                <Button href="#" variant="outline">
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
        style={{
          background: "rgba(32,30,29,0.6)",
          borderColor: "rgba(255,255,255,0.08)",
          color: COLORS.soft,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-xs">
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
