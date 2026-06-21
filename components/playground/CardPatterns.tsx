import type { CardPattern } from "../../types/card";

// 1. The Physical "Matte" Grain Overlay
export const CardNoise = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.25] mix-blend-overlay pointer-events-none z-10">
    <filter id="physical-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.4 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#physical-noise)" />
  </svg>
);

// 2. Hyper-Realistic Woven Carbon Fiber
const CarbonFiber = () => (
  <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-60 z-0">
    <defs>
      <pattern id="carbon-weave" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="rgba(0,0,0,0.4)" />
        {/* Top-Left to Bottom-Right Weave (Highlight) */}
        <path d="M0 0l4 4-4 4z" fill="rgba(255,255,255,0.07)" />
        {/* Top-Right to Bottom-Left Weave (Shadow) */}
        <path d="M8 0l-4 4 4 4z" fill="rgba(0,0,0,0.6)" />
        {/* Horizontal connect */}
        <path d="M4 4l4-4H0z" fill="rgba(255,255,255,0.03)" />
        <path d="M4 4l4 4H0z" fill="rgba(0,0,0,0.8)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#carbon-weave)" />
  </svg>
);

// 3. Machined Hexagonal Metal Mesh
const HexMesh = () => (
  <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-50 z-0">
    <defs>
      <pattern id="hex-mesh" width="24" height="41.56" patternUnits="userSpaceOnUse">
        {/* Hex 1 */}
        <path d="M12 0l12 6.92v13.85L12 27.71 0 20.78V6.92z" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Hex 2 (Interlocking) */}
        <path d="M12 41.56l12-6.92V20.78l-12 6.92L0 20.78v13.86z" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex-mesh)" />
  </svg>
);

// 4. Laser-Etched Topographic Map
const Topographic = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30 z-0 mix-blend-overlay" viewBox="0 0 460 290" preserveAspectRatio="none">
    <path 
      d="M-50,50 Q100,150 200,-50 T450,150 T600,-50 M-50,80 Q100,180 200,-20 T450,180 T600,-20 M-50,110 Q100,210 200,10 T450,210 T600,10 M-50,140 Q100,240 200,40 T450,240 T600,40 M-50,170 Q100,270 200,70 T450,270 T600,70 M-50,200 Q100,300 200,100 T450,300 T600,100 M-50,230 Q100,330 200,130 T450,330 T600,130 M-50,260 Q100,360 200,160 T450,360 T600,160 M-50,290 Q100,390 200,190 T450,390 T600,190" 
      fill="none" 
      stroke="rgba(255,255,255,0.6)" 
      strokeWidth="1.5" 
      className="drop-shadow-md"
    />
  </svg>
);

// Router Component
export const PatternRenderer = ({ pattern }: { pattern: CardPattern }) => {
  switch (pattern) {
    case "carbon": return <CarbonFiber />;
    case "mesh": return <HexMesh />;
    case "topo": return <Topographic />;
    default: return null;
  }
};