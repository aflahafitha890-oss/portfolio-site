import React from "react";

// Light theme brand
const COLORS = {
  bg: "#F5F6F8",          // page background
  text: "#0F1115",        // primary text
  sub: "#3A3F47",         // secondary text
  accent: "#6A5BFF",      // purple accent
  card: "#FFFFFF",        // cards
  stroke: "#E6E8EE",      // subtle borders
};

function Button({ href = "#", children, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center h-11 px-5 rounded-xl text-sm font-semibold transition-transform active:translate-y-[1px]";
  const styles =
    variant === "primary"
      ? { class: "text-white", style: { backgroundColor: COLORS.accent } }
      : { class: "text-" , style: { backgroundColor: "#fff", border: `1px solid ${COLORS.stroke}`, color: COLORS.text } };

  return (
    <a href={href} className={`${base} ${styles.class}`} style={styles.style}>
      {children}
    </a>
  );
}

function Nav() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ borderColor: COLORS.stroke, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
    >
      <div className="mx-auto max-w-6xl h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M18 14v36l28-18z" fill={COLORS.accent} />
          </svg>
          <span className="font-bold" style={{ color: COLORS.text }}>M. aflah</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: COLORS.sub }}>
          <a href="#work">Video Types</a>
          <a href="#about">Expertise</a>
          <a href="#results">Results</a>
          <a href="#pricing">Pricing</a>
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
      style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.stroke}` }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left copy */}
        <div>
          <p className="text-xs tracking-[0.18em] font-semibold mb-5" style={{ color: COLORS.sub }}>
            THE #1 REMOTE VIDEO EDITING PARTNER
          </p>
          <h1
            className="text-[34px] leading-[1.1] sm:text-5xl md:text-[56px] font-black"
            style={{ color: COLORS.text }}
          >
            Stop wasting time on{" "}
            <span style={{ color: COLORS.accent }}>mediocre edits</span>. Get videos
            that actually convert.
          </h1>

          <p className="mt-6 text-base sm:text-lg" style={{ color: COLORS.sub }}>
            Before: Average editing, your time, your effort. After: a smooth,
            fully-managed process focused on retention and results.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="#contact">Claim a free spot</Button>
            <Button href="#work" variant="secondary">See work</Button>
          </div>
        </div>

        {/* Right collage */}
        <div className="grid grid-cols-2 gap-4">
          {[
            "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526178611896-80f2b81aa5a2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl overflow-hidden border"
              style={{ borderColor: COLORS.stroke, background: COLORS.card }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: COLORS.text }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div style={{ background: COLORS.bg, color: COLORS.text }}>
      <Nav />
      <Hero />

      <Section id="work" title="Selected Work">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: COLORS.stroke, background: COLORS.card }}
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
        <p style={{ color: COLORS.sub }} className="max-w-prose">
          I edit with a story-first approach: hook early, keep the pace tight, and
          land the message. Clean sound, tasteful motion, and ruthless cuts.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <div
          className="rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ background: COLORS.card, borderColor: COLORS.stroke }}
        >
          <div>
            <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
              Let’s make videos that convert.
            </h3>
            <p style={{ color: COLORS.sub }} className="text-sm mt-1">
              Tell me your goal, deadline, and references.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="mailto:you@example.com">Email</Button>
            <Button href="#" variant="secondary">WhatsApp</Button>
          </div>
        </div>
      </Section>

      <footer
        className="border-t"
        style={{ borderColor: COLORS.stroke, background: "#fff" }}
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-xs" style={{ color: COLORS.sub }}>
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top" style={{ color: COLORS.text }}>Back to top</a>
        </div>
      </footer>
    </div>
  );
}
