"use client";

import Link from "next/link";
import { useState } from "react";
 
// ── Material swatch data ──────────────────────────────────────────────────────
const materials = [
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Deep zinc gradient. Matte luxury.",
    bg: "linear-gradient(135deg, #3f3f46 0%, #18181b 50%, #000000 100%)",
    accent: "rgba(255,255,255,0.08)",
    pattern: null,
  },
  {
    id: "frosted",
    name: "Frosted",
    description: "Acrylic glass. Dynamic light refraction.",
    bg: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
    border: "rgba(255,255,255,0.25)",
    accent: "rgba(255,255,255,0.15)",
    pattern: null,
  },
  {
    id: "prism",
    name: "Prism",
    description: "Shifting indigo-to-pink spectrum.",
    bg: "linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #ec4899 100%)",
    accent: "rgba(255,255,255,0.15)",
    pattern: null,
  },
  {
    id: "carbon",
    name: "Carbon",
    description: "Woven carbon fiber. Anisotropic shimmer.",
    bg: "linear-gradient(135deg, #1c1c1e 0%, #0a0a0a 100%)",
    accent: "rgba(255,255,255,0.05)",
    patternType: "carbon",
  },
  {
    id: "mesh",
    name: "Hex Mesh",
    description: "Machined honeycomb. Metallic parallax.",
    bg: "linear-gradient(135deg, #1a0e22 0%, #0d0810 100%)",
    accent: "rgba(255,255,255,0.05)",
    patternType: "mesh",
  },
  {
    id: "topo",
    name: "Topographic",
    description: "Laser-etched contour lines.",
    bg: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
    accent: "rgba(255,255,255,0.05)",
    patternType: "topo",
  },
];
 
// ── Mini SVG patterns (inline, no import needed on landing page) ──────────────
const MiniPattern = ({ type }: { type: string }) => {
  if (type === "carbon") return (
    <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-60">
      <defs>
        <pattern id="lp-carbon" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="rgba(0,0,0,0.55)" />
          <path d="M0 0h4v4H0z" fill="rgba(255,255,255,0.045)" />
          <path d="M4 4h4v4H4z" fill="rgba(255,255,255,0.045)" />
          <path d="M0 0l4 1.5L0 3z" fill="rgba(255,255,255,0.13)" />
          <path d="M4 4l4 1.5L4 7z" fill="rgba(255,255,255,0.13)" />
          <rect x="0" y="3.5" width="8" height="1" fill="rgba(0,0,0,0.85)" />
          <rect x="3.5" y="0" width="1" height="8" fill="rgba(0,0,0,0.85)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lp-carbon)" />
    </svg>
  );
 
  if (type === "mesh") return (
    <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-50">
      <defs>
        <pattern id="lp-mesh" width="24" height="41.56" patternUnits="userSpaceOnUse">
          <path d="M12 0l12 6.92v13.85L12 27.71 0 20.78V6.92z" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.28)" strokeWidth="0.75" />
          <path d="M12 41.56l12-6.92V20.78l-12 6.92L0 20.78v13.86z" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.28)" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lp-mesh)" />
    </svg>
  );
 
  if (type === "topo") return (
    <svg className="absolute inset-0 w-full h-full opacity-35 mix-blend-overlay" viewBox="0 0 200 126" preserveAspectRatio="none">
      <path d="M-20,25 Q40,65 80,-15 T180,65 T260,-15" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
      <path d="M-20,45 Q40,85 80,5 T180,85 T260,5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.75" />
      <path d="M-20,20 Q40,60 80,-20 T180,60 T260,-20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
      <path d="M-20,80 Q40,120 80,40 T180,120 T260,40" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
    </svg>
  );
 
  return null;
};
 
// ── Mini card preview ─────────────────────────────────────────────────────────
const MaterialCard = ({ material, isActive, onClick }: {
  material: typeof materials[0];
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{ cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
    className={`relative rounded-xl overflow-hidden select-none ${isActive ? "scale-105" : "hover:scale-102 opacity-70 hover:opacity-100"}`}
  >
    {/* Card face */}
    <div
      style={{
        width: "100%",
        aspectRatio: "1.586 / 1",
        background: material.bg,
        border: `1px solid ${(material as any).border || "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
        boxShadow: isActive ? "0 0 0 1px rgba(201,168,76,0.6), 0 20px 40px rgba(0,0,0,0.6)" : "0 8px 24px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Pattern */}
      {(material as any).patternType && <MiniPattern type={(material as any).patternType} />}
 
      {/* Sheen */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
 
      {/* Mini card content */}
      <div style={{ position: "absolute", inset: 0, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Logo placeholder */}
          <div style={{ width: 28, height: 20, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 16, height: 11 }}>
              <div style={{ position: "absolute", left: 0, width: 11, height: 11, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
              <div style={{ position: "absolute", right: 0, width: 11, height: 11, borderRadius: "50%", background: "rgba(201,168,76,0.65)", mixBlendMode: "screen" }} />
            </div>
          </div>
          {/* Chip */}
          <div style={{ width: 22, height: 16, background: "linear-gradient(135deg, #E8C94A, #A07A28)", borderRadius: 3, boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)" }} />
        </div>
        <div>
          <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", marginBottom: 5 }}>•••• •••• •••• 9021</div>
          <div style={{ fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Alexander Newman</div>
        </div>
      </div>
    </div>
 
    {/* Label below card */}
    <div style={{ marginTop: 10, textAlign: "center" }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", color: isActive ? "#C9A84C" : "rgba(255,255,255,0.5)", textTransform: "uppercase", transition: "color 0.3s ease" }}>
        {material.name}
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginTop: 3 }}>
        {material.description}
      </div>
    </div>
  </div>
);
 
// ── Materials Modal ───────────────────────────────────────────────────────────
const MaterialsModal = ({ onClose }: { onClose: () => void }) => {
  const [active, setActive] = useState("obsidian");
 
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(5,3,10,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.3s ease",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
 
      {/* Modal panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,10,22,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "40px",
          maxWidth: 780,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "slideUp 0.35s ease",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(201,168,76,0.7)", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 24, height: 1, background: "rgba(201,168,76,0.5)" }} />
              Material Library
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 300, color: "rgba(255,255,255,0.92)", lineHeight: 1 }}>
              Choose your <em style={{ fontStyle: "italic", color: "#C9A84C" }}>finish.</em>
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "white"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            ✕
          </button>
        </div>
 
        {/* Gold rule */}
        <div style={{ height: 1, background: "linear-gradient(to right, rgba(201,168,76,0.5), transparent)", marginBottom: 32 }} />
 
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24, marginBottom: 36 }}>
          {materials.map((m) => (
            <MaterialCard key={m.id} material={m} isActive={active === m.id} onClick={() => setActive(m.id)} />
          ))}
        </div>
 
        {/* Footer CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            All materials available with live physics inside the studio
          </p>
          <Link
            href="/playground"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 28px",
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.45)",
              color: "#C9A84C",
              fontSize: 10, fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 0,
              transition: "border-color 0.3s ease",
            }}
          >
            Enter Studio →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showMaterials, setShowMaterials] = useState(false);
 
  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden"
      style={{ background: "#0A0810", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,600&family=Inter:wght@300;400;500&display=swap');

        @keyframes floatCard {
          0%   { transform: rotateX(6deg) rotateY(-14deg) translateY(0px); }
          25%  { transform: rotateX(8deg) rotateY(-10deg) translateY(-10px); }
          50%  { transform: rotateX(5deg) rotateY(-18deg) translateY(-6px); }
          75%  { transform: rotateX(9deg) rotateY(-12deg) translateY(-14px); }
          100% { transform: rotateX(6deg) rotateY(-14deg) translateY(0px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes shadowPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 0.9; transform: translateX(-50%) scaleX(0.85); }
        }

        .card-3d     { animation: floatCard   7s ease-in-out infinite; }
        .bg-glow     { animation: glowPulse   6s ease-in-out infinite; }
        .card-shadow { animation: shadowPulse 7s ease-in-out infinite; }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0.08);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover         { border-color: rgba(201,168,76,0.8) !important; }
        .btn-primary:hover .arrow  { transform: translateX(4px); }
        .btn-ghost:hover           { color: rgba(255,255,255,0.6) !important; }

        /* Responsive headline clamp */
        .headline-line { font-family: 'Cormorant Garamond', serif; display: block; line-height: 0.92; }

        /* Card scales with viewport */
        .card-wrapper {
          width: min(420px, 88vw);
          height: min(264px, calc(88vw * 0.629));
        }
      `}</style>

      {/* Materials modal */}
      {showMaterials && <MaterialsModal onClose={() => setShowMaterials(false)} />}


      {/* Ambient glow */}
      <div
        className="bg-glow pointer-events-none absolute"
        style={{
          width: "min(600px, 90vw)",
          height: "min(400px, 60vw)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(45,20,70,0.55) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
        }}
      />

      {/* Corner accents — hidden on small screens */}
      <div
        className="pointer-events-none absolute hidden sm:block"
        style={{
          top: 32, right: 40, width: 50, height: 50,
          borderTop: "1px solid rgba(201,168,76,0.5)",
          borderRight: "1px solid rgba(201,168,76,0.5)",
        }}
      />
      <div
        className="pointer-events-none absolute hidden sm:block"
        style={{
          bottom: 32, left: 40, width: 50, height: 50,
          borderBottom: "1px solid rgba(201,168,76,0.18)",
          borderLeft: "1px solid rgba(201,168,76,0.18)",
        }}
      />

      {/* Main layout — stacks on mobile, side-by-side on lg */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 sm:px-12 lg:px-16 py-16 lg:py-0
                      flex flex-col items-center gap-14
                      lg:grid lg:grid-cols-2 lg:items-center lg:gap-0">

        {/* ── TEXT (order-2 on mobile so card shows first) ── */}
        <div className="flex flex-col order-2 lg:order-1 lg:pr-10 w-full items-center lg:items-start text-center lg:text-left">

          {/* Eyebrow */}
          <div
            className="mb-6 flex items-center gap-3"
            style={{
              fontSize: 10, fontWeight: 400, letterSpacing: "0.3em",
              color: "rgba(201,168,76,0.8)", textTransform: "uppercase",
            }}
          >
            <span style={{ display: "block", width: 32, height: 1, background: "rgba(201,168,76,0.6)" }} />
            Card Studio
          </div>

          {/* Headline */}
          <h1 style={{ marginBottom: 28 }}>
            <span
              className="headline-line"
              style={{
                fontSize: "clamp(52px, 9vw, 80px)",
                fontWeight: 300, 
                fontStyle: "italic",
                color: "rgba(255,255,255,0.9)", 
                letterSpacing: "-0.01em",
                lineHeight: 0.9,
              }}
            >
              Craft your
            </span>
            <span
              className="headline-line"
              style={{
                fontSize: "clamp(52px, 9vw, 80px)",
                fontWeight: 600, 
                fontStyle: "italic",
                color: "#C9A84C", 
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              card.
            </span>
          </h1>

          {/* Gold rule */}
          <div
            className="mb-6 w-full max-w-[320px] lg:max-w-none"
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(201,168,76,0.7), rgba(201,168,76,0.05))",
            }}
          />

          {/* Descriptor */}
          <p
            className="mb-10"
            style={{
              fontSize: 11, fontWeight: 300,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.2em", lineHeight: 2,
              textTransform: "uppercase",
            }}
          >
            Infinite material textures.
            <br />
            Fluid, tactile response.
            <br />
            Cinema-grade fidelity.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href="/playground"
              className="btn-primary relative inline-flex items-center gap-3 overflow-hidden"
              style={{
                padding: "13px 28px",
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.45)",
                color: "#C9A84C",
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.25em", textTransform: "uppercase",
                textDecoration: "none", transition: "border-color 0.4s ease",
              }}
            >
              Enter Studio
              <span className="arrow" style={{ fontSize: 14, transition: "transform 0.3s ease" }}>→</span>
            </Link>

            <button
              className="btn-ghost"
              onClick={() => setShowMaterials(true)}
              style={{ fontSize: 10, fontWeight: 300, letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s ease" }}
            >
              View Materials
            </button>
          </div>
        </div>

        {/* ── CARD (order-1 on mobile so it shows above text) ── */}
        <div className="flex items-center justify-center order-1 lg:order-2">
          <div className="relative card-wrapper">
            <div className="card-wrapper" style={{ perspective: 1200 }}>
              <div
                className="card-3d relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.07)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Mesh grid bg */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "#1A0E22",
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,3,10,0.65) 100%)" }}
                  />
                  {/* Sheen */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(201,168,76,0.04) 100%)" }}
                  />

                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div
                        style={{
                          width: 48, height: 34,
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 7, background: "rgba(255,255,255,0.06)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <div style={{ position: "relative", width: 26, height: 17 }}>
                          <div style={{ position: "absolute", left: 0, width: 17, height: 17, borderRadius: "50%", background: "rgba(255,255,255,0.75)" }} />
                          <div style={{ position: "absolute", right: 0, width: 17, height: 17, borderRadius: "50%", background: "rgba(201,168,76,0.7)", mixBlendMode: "screen" }} />
                        </div>
                      </div>
                      <div
                        style={{
                          width: 38, height: 28,
                          background: "linear-gradient(135deg, #E8C94A 0%, #C9A84C 40%, #A07A28 70%, #C9A84C 100%)",
                          borderRadius: 5, position: "relative", overflow: "hidden",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        <div style={{ position: "absolute", left: 5, right: 5, top: 0, bottom: 0, borderLeft: "1px solid rgba(0,0,0,0.18)", borderRight: "1px solid rgba(0,0,0,0.18)" }} />
                        <div style={{ position: "absolute", top: 5, bottom: 5, left: 0, right: 0, borderTop: "1px solid rgba(0,0,0,0.18)", borderBottom: "1px solid rgba(0,0,0,0.18)" }} />
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col gap-2">
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 3.5vw, 18px)", fontWeight: 300, letterSpacing: "0.22em", color: "rgba(255,255,255,0.9)" }}>
                        •••• &nbsp;•••• &nbsp;•••• &nbsp;9021
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div style={{ fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Cardholder</div>
                          <div style={{ fontSize: "clamp(8px, 2vw, 11px)", letterSpacing: "0.15em", fontWeight: 400, color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>Alexander Newman</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Expires</div>
                          <div style={{ fontSize: "clamp(8px, 2vw, 11px)", letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)" }}>12/28</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadow */}
            <div
              className="card-shadow pointer-events-none absolute"
              style={{
                bottom: -24, left: "50%",
                width: "70%", height: 36,
                background: "radial-gradient(ellipse, rgba(45,15,70,0.7) 0%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Version tag — hidden on mobile */}
      <div
        className="pointer-events-none absolute hidden sm:block"
        style={{
          bottom: 40, right: 52,
          fontSize: 9, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.15)", textTransform: "uppercase",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}
      >
        Neo-Vault &nbsp;v1.0
      </div>
    </main>
  );
}