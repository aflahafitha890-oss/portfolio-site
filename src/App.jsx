import React, { useEffect, useRef } from "react";
import "./index.css";

/* Small dot cursor that follows the mouse */
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
    return () => {
      document.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position:"fixed", left:0, top:0, width:14, height:14, borderRadius:9999,
        background:"var(--accent)", boxShadow:"0 0 14px var(--accent), 0 0 28px rgba(224,175,160,.7)",
        pointerEvents:"none", zIndex:2147483647
      }}
    />
  );
}

export default function App(){
  return (
    <div style={{ cursor:"none" }}>
      {/* ===== Header ===== */}
      <header className="header">
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 14v36l28-18z" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <strong style={{color:"var(--accent)",fontSize:20}}>M. aflah</strong>
          </div>
          <nav className="nav" style={{display:"flex",alignItems:"center"}}>
            <a href="#work">Work</a>
            <a href="#testimonials">Feedback</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="btn btn--accent">Get in touch</a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="section">
        <div className="container">
          <div style={{color:"var(--soft)",letterSpacing:".14em",textTransform:"uppercase",fontWeight:700,fontSize:13,marginBottom:18}}>
            The #1 remote video editing partner
          </div>

          <h1 className="h1" style={{fontSize:"clamp(36px,6vw,56px)",margin:"0 0 14px"}}>
            Stop wasting time on <i style={{color:"var(--accent)"}}>mediocre edits</i>. Get videos that actually convert.
          </h1>

          <p className="copy" style={{maxWidth:840, fontSize:18, lineHeight:1.65, margin:"0 0 26px"}}>
            Before: average editing that costs time & results. After: a smooth, story-first edit focused on retention & performance.
          </p>

          <div style={{display:"flex",flexWrap:"wrap",gap:14,alignItems:"center"}}>
            <a href="#contact" className="btn btn--accent">Claim a free spot</a>
            <a href="#work" className="btn btn--outline">See work</a>
            <span className="copy" style={{marginLeft:8,fontSize:14}}>↓ Scroll down</span>
          </div>
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="section">
        <div className="container">
          <h2 className="h2" style={{fontSize:"clamp(22px,3vw,30px)", margin:"0 0 18px"}}>Selected Work</h2>
          <div className="vid">
            <iframe
              title="Work video"
              width="100%"
              height="480"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{display:"block", border:0}}
            />
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="h2" style={{fontSize:"clamp(22px,3vw,30px)", margin:"0 0 18px"}}>Client Feedback</h2>

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
          <h2 className="h2" style={{fontSize:"clamp(22px,3vw,30px)", margin:"0 0 18px"}}>About</h2>
        <p className="copy" style={{maxWidth:820, fontSize:17, lineHeight:1.7}}>
            I edit with a story-first mindset: keep viewers engaged, respect their time, and make the message land.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="h2" style={{fontSize:"clamp(22px,3vw,30px)", margin:"0 0 18px"}}>Contact</h2>
          <div className="card">
            <div style={{padding:28, display:"grid", gap:16}}>
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
      <footer style={{borderTop:"1px solid rgba(255,255,255,.08)", background:"rgba(32,30,29,.72)"}}>
        <div className="container" style={{height:56, display:"flex", alignItems:"center", justifyContent:"space-between", color:"var(--soft)", fontSize:12}}>
          <span>© {new Date().getFullYear()} • M. aflah</span>
          <a href="#top" style={{color:"var(--accent)"}}>Back to top</a>
        </div>
      </footer>

      <DotCursor/>
    </div>
  );
}
