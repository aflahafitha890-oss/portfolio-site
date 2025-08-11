import React, { useEffect, useRef, useState } from "react";
import "./index.css";

/* ---------- Dot cursor (hidden on touch via CSS) ---------- */
function DotCursor() {
  const ref = useRef(null);
  useEffect(() => {
    let tx=0, ty=0, x=0, y=0, raf=null;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      const c = ref.current;
      if (c) c.style.transform = `translate3d(${x-7}px, ${y-7}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = e => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); };
    document.addEventListener("pointermove", move, { passive:true });
    return () => { document.removeEventListener("pointermove", move); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      className="dot"
      ref={ref}
      aria-hidden="true"
      style={{
        position:"fixed", left:0, top:0, width:14, height:14, borderRadius:9999,
        background:"var(--accent)", boxShadow:"0 0 14px var(--accent), 0 0 28px rgba(224,175,160,.7)",
        pointerEvents:"none", zIndex:2147483647
      }}
    />
  );
}

export default function App(){
  const [open, setOpen] = useState(false); // mobile menu

  return (
    <div style={{ cursor:"none" }}>
      {/* ===== Header ===== */}
      <header className="header">
        <div className="container nav">
          {/* left: logo */}
          <div className="logo">
            <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 14v36l28-18z" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>M. aflah</span>
          </div>

          {/* center: links (hidden on mobile via CSS) */}
          <div className="links">
            <a href="#work">Work</a>
            <a href="#testimonials">Feedback</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          {/* right: CTA + hamburger */}
          <div className="actions">
            <a href="#contact" className="btn btn--accent cta">Get in touch</a>
            <button
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={()=>setOpen(true)}
            >
              <span/>
              <span/>
              <span/>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Mobile Menu Overlay ===== */}
      {open && (
        <div className="menu" role="dialog" aria-modal="true">
          <div className="menu__panel">
            <div className="menu__head">
              <div className="logo">
                <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M18 14v36l28-18z" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>M. aflah</span>
              </div>
              <button className="menu__close" aria-label="Close menu" onClick={()=>setOpen(false)}>✕</button>
            </div>
            <nav className="menu__links" onClick={()=>setOpen(false)}>
              <a href="#work">Work</a>
              <a href="#testimonials">Feedback</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <a href="#contact" className="btn btn--accent" onClick={()=>setOpen(false)}>Get in touch</a>
          </div>
          <div className="menu__backdrop" onClick={()=>setOpen(false)} />
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="section hero">
        <div className="container">
          <div className="kicker">The #1 remote video editing partner</div>

          <h1 className="h1">
            Stop wasting time on <i className="accent">mediocre edits</i>. Get videos that actually convert.
          </h1>

          <p className="copy">
            Before: average editing that costs time & results. After: a smooth, story-first edit focused on retention & performance.
          </p>

          <div className="actions">
            <a href="#contact" className="btn btn--accent">Claim a free spot</a>
            <a href="#work" className="btn btn--outline secondary">See work</a>
            <span className="copy hint">↓ Scroll down</span>
          </div>
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="section">
        <div className="container">
          <h2 className="h2 section-title">Selected Work</h2>
          <div className="card video">
            <iframe
              title="Work video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="h2 section-title">Client Feedback</h2>

          <div className="card" style={{marginBottom:14}}>
            <div style={{padding:24}}>
              <p className="copy" style={{margin:"0 0 12px"}}>“Clear comms and fast delivery. Strong sense of pacing.”</p>
              <strong>John Doe</strong><div className="copy" style={{fontSize:13}}>Marketing Manager</div>
            </div>
          </div>

          <div className="card" style={{marginBottom:14}}>
            <div style={{padding:24}}>
              <p className="copy" style={{margin:"0 0 12px"}}>“Retention jumped. Edits felt tight and professional.”</p>
              <strong>Sarah Khan</strong><div className="copy" style={{fontSize:13}}>YouTube Creator</div>
            </div>
          </div>

          <div className="card">
            <div style={{padding:24}}>
              <p className="copy" style={{margin:"0 0 12px"}}>“Reliable and easy to work with.”</p>
              <strong>Ali Reza</strong><div className="copy" style={{fontSize:13}}>Business Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="h2 section-title">About</h2>
          <p className="copy" style={{maxWidth:820, lineHeight:1.7}}>
            I edit with a story-first mindset: keep viewers engaged, respect their time, and make the message land.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="h2 section-title">Contact</h2>
          <div className="card" style={{padding:28}}>
            <div style={{display:"grid", gap:16}}>
              <div>
                <h3 className="h2" style={{fontSize:22, margin:0}}>Let’s build something that performs.</h3>
                <p className="copy" style={{fontSize:14, marginTop:6}}>Send your goal, format, deadline, and refs.</p>
              </div>
              <div style={{display:"flex", flexWrap:"wrap", gap:12}}>
                <a href="mailto:you@example.com" className="btn btn--accent">Email</a>
                <a href="#" className="btn btn--outline">LinkedIn</a>
                <a href="#" className="btn btn--outline">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container foot">
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      <DotCursor/>
    </div>
  );
}
