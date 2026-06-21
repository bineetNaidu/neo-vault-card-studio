import type { CardPattern } from "../../types/card";

// 1. Physical "Matte" Grain Overlay — softer, more tactile frequency
export const CardNoise = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.22] mix-blend-overlay pointer-events-none z-10">
    <filter id="physical-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#physical-noise)" />
  </svg>
);

// 2. Hyper-Realistic Woven Carbon Fiber — deeper contrast, mid-tone thread body
const CarbonFiber = () => (
  <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-70 z-0">
    <defs>
      <pattern id="carbon-weave" width="8" height="8" patternUnits="userSpaceOnUse">
        {/* Base cell — deep shadow */}
        <rect width="8" height="8" fill="rgba(0,0,0,0.55)" />

        {/* Thread body — top-left bundle */}
        <path d="M0 0h4v4H0z" fill="rgba(255,255,255,0.045)" />
        {/* Thread body — bottom-right bundle */}
        <path d="M4 4h4v4H4z" fill="rgba(255,255,255,0.045)" />

        {/* Highlight edge — top-left bundle (light catches top) */}
        <path d="M0 0l4 1.5L0 3z" fill="rgba(255,255,255,0.13)" />
        {/* Highlight edge — bottom-right bundle */}
        <path d="M4 4l4 1.5L4 7z" fill="rgba(255,255,255,0.13)" />

        {/* Shadow edge — bottom of top-left bundle */}
        <path d="M0 4l4-1.5v1.5H0z" fill="rgba(0,0,0,0.7)" />
        {/* Shadow edge — bottom of bottom-right bundle */}
        <path d="M4 8l4-1.5v1.5H4z" fill="rgba(0,0,0,0.7)" />

        {/* Inter-weave gap — horizontal seam */}
        <rect x="0" y="3.5" width="8" height="1" fill="rgba(0,0,0,0.85)" />
        {/* Inter-weave gap — vertical seam */}
        <rect x="3.5" y="0" width="1" height="8" fill="rgba(0,0,0,0.85)" />

        {/* Micro specular — thread peak shimmer */}
        <rect x="0.5" y="0.5" width="2.5" height="0.75" fill="rgba(255,255,255,0.09)" rx="0.3" />
        <rect x="4.5" y="4.5" width="2.5" height="0.75" fill="rgba(255,255,255,0.09)" rx="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#carbon-weave)" />
  </svg>
);

// 3. Machined Hexagonal Metal Mesh — stronger stroke, metallic inner fill
const HexMesh = () => (
  <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-60 z-0">
    <defs>
      <radialGradient id="hex-inner" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
      </radialGradient>

      <pattern id="hex-mesh" width="24" height="41.56" patternUnits="userSpaceOnUse">
        {/* Hex 1 */}
        <path
          d="M12 0l12 6.92v13.85L12 27.71 0 20.78V6.92z"
          fill="url(#hex-inner)"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.75"
        />
        {/* Hex 1 — inner bevel highlight (top-left edge) */}
        <path
          d="M12 0l12 6.92"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.6"
        />
        <path
          d="M0 6.92l12-6.92"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.6"
        />

        {/* Hex 2 (interlocking) */}
        <path
          d="M12 41.56l12-6.92V20.78l-12 6.92L0 20.78v13.86z"
          fill="url(#hex-inner)"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.75"
        />
        {/* Hex 2 — inner bevel highlight */}
        <path
          d="M0 34.64l12 6.92"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.6"
        />
        <path
          d="M24 34.64l-12 6.92"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.6"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex-mesh)" />
  </svg>
);

// 4. Laser-Etched Topographic Map — varied line weights, higher opacity
const Topographic = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-40 z-0 mix-blend-overlay"
    viewBox="0 0 460 290"
    preserveAspectRatio="none"
  >
    {/* Minor contour lines — thin */}
    <path
      d="M-50,65 Q100,165 200,-35 T450,165 T600,-35
         M-50,95 Q100,195 200,-5 T450,195 T600,-5
         M-50,125 Q100,225 200,25 T450,225 T600,25
         M-50,155 Q100,255 200,55 T450,255 T600,55
         M-50,215 Q100,315 200,115 T450,315 T600,115
         M-50,245 Q100,345 200,145 T450,345 T600,145"
      fill="none"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="0.75"
    />
    {/* Major contour lines — thicker, brighter */}
    <path
      d="M-50,50 Q100,150 200,-50 T450,150 T600,-50
         M-50,185 Q100,285 200,85 T450,285 T600,85
         M-50,275 Q100,375 200,175 T450,375 T600,175"
      fill="none"
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="1.5"
    />
  </svg>
);

// Router Component
export const PatternRenderer = ({ pattern }: { pattern: CardPattern }) => {
  switch (pattern) {
    case "carbon": return <CarbonFiber />;
    case "mesh":   return <HexMesh />;
    case "topo":   return <Topographic />;
    default:       return null;
  }
};