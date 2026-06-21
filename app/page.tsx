"use client";

import Link from "next/link";

export default function Home() {
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
                fontSize: "clamp(52px, 10vw, 86px)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em",
              }}
            >
              Craft
            </span>
            <span
              className="headline-line"
              style={{
                fontSize: "clamp(52px, 10vw, 86px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em",
              }}
            >
              your
            </span>
            <span
              className="headline-line"
              style={{
                fontSize: "clamp(52px, 10vw, 86px)",
                fontWeight: 600, fontStyle: "italic",
                color: "#C9A84C", letterSpacing: "-0.02em",
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
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.14em", lineHeight: 1.9,
              textTransform: "uppercase",
            }}
          >
            Material-grade customization.
            <br />
            Physics-driven interaction.
            <br />
            Ultra-HD export.
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
              style={{
                fontSize: 10, fontWeight: 300, letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                background: "none", border: "none", cursor: "pointer",
                transition: "color 0.3s ease",
              }}
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