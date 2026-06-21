# Neo-Vault Card Studio

## 1. Project Overview

A highly interactive, premium digital card customizer and wallet interface. Users can interactively customize card materials, banking details, patterns, and custom hex paints. The experience is elevated by a master-class implementation of DOM-based physics, featuring motion-blurred 3D flips, inverse-parallax ambient lighting, tactile audio, and a material interaction engine that mimics real-world substances. Finally, an Ultra-HD snapshot engine allows for sharing production-ready, pixel-perfect exports.

**Core Path:** `/app/playground`

## 2. Tech Stack & Libraries

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript (Strict typing for Card State & Physics Constants)
* **Styling:** Tailwind CSS (with arbitrary values for 3D perspective and dynamic viewport heights `100dvh`)
* **Animation & Physics:** Framer Motion (`useSpring`, `useVelocity`, `useTransform` for 3D tilt, velocity blur, and material parallax)
* **State Management:** React Context API (`CardContext` handling live updates and global studio lighting state)
* **Export Engine:** `html-to-image` (with a custom 2D-Flattening Protocol for high-res canvas rendering)
* **Audio Layer:** `use-sound` (for tactile, physical UI feedback)
* **Assets:** Curated monochrome SVG bank logos and custom CSS/SVG noise overlays (`CardPatterns.tsx`).

---

## 3. Architecture & Directory Structure

```text
src/
├── app/
│   └── playground/
│       ├── page.tsx               # Main entry point for the studio
│       └── layout.tsx             # Locks viewport to h-[100dvh] for mobile stability
├── components/
│   └── playground/
│       ├── CardStudio.tsx         # The main UI wrapper
│       ├── CardDeck.tsx           # The bottom stack of stored wallet cards
│       ├── ActiveCard.tsx         # The master physics & render engine for the 3D card
│       ├── CardPatterns.tsx       # SVG noise and material texture definitions
│       └── SidebarCustomizer.tsx  # The sliding/expanding right panel with InputWrappers
├── context/
│   └── CardContext.tsx            # Global state for wallet arrays, active IDs, and studio lighting
├── types/
│   └── card.d.ts                  # TypeScript interfaces for precise data modeling
└── public/
    ├── logos/                     # Curated SVG bank logos
    └── whoosh.mp3                 # Tactile audio file for flip mechanics

```

---

## 4. State Management (`CardContext`)

The Context drives the entire application synchronously, ensuring the customizer UI and the 3D render engine are always in perfect harmony without prop drilling.

```typescript
export type CardTheme = "obsidian" | "frosted" | "prism" | "custom";
export type CardPattern = "none" | "carbon" | "topo" | "mesh";

export interface Card {
  id: string;
  theme: CardTheme;
  pattern: CardPattern;
  customColor?: string; // Applied only when theme is 'custom'
  bankLogo: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface CardContextType {
  cards: Card[];
  activeCardId: string;
  focusedField: keyof Card | null;
  studioLighting: boolean; // Global toggle for Ambient Glow
  
  // Actions
  setStudioLighting: (val: boolean) => void;
  setActiveCard: (id: string) => void;
  updateActiveCard: (field: keyof Card, value: string) => void;
  setFocusedField: (field: keyof Card | null) => void;
  addNewCard: (initialTheme: CardTheme) => void;
}

```

---

## 5. Core Mechanics & UI Flow

### A. The Master Physics & Ambient Engine

* **Master Scaling:** Dimensions are locked to constants (`CARD_WIDTH: 540`, `CARD_HEIGHT: 340`), allowing mathematical interpolation to auto-scale the 3D tilt limits without breaking interactions.
* **Ambient Glow:** A dynamic, colored drop-shadow layer sits behind the card, matching the card's material color. It uses `useTransform` to move *inversely* to the mouse, simulating a fixed physical spotlight shining from behind the monitor.

### B. The Material Interaction Engine (Haptics)

The DOM reacts physically to mouse tracking to simulate real-world materials:

* **Carbon Fiber:** Sweeping diagonal gradient masks track across the card to simulate anisotropic thread shimmer.
* **Frosted Glass:** Dynamic inset box-shadows gather light around the edge of the card closest to the cursor, simulating acrylic refraction.
* **Hex Mesh:** A multiplied radial gradient tracks opposite to the mouse, casting deep shadows into the metallic honeycombs to create parallax depth.

### C. Cinematic Motion & Audio

* **Velocity Blur:** The card flip uses Framer Motion's `useVelocity` tied to a `useSpring`. As the rotation speed peaks in the middle of the spin, a CSS `blur()` filter is dynamically applied and removed, creating realistic motion blur streaks.
* **Tactile Audio:** Triggering interactions (like flipping the card) plays subtle, premium sound effects via `use-sound`.

### D. The Snapshot Engine

* **2D-Flattening Protocol:** Because standard canvas renderers crash on nested `preserve-3d` elements, the `ActiveCard` listens for an `isExporting` state.
* **Sequence:** On export, the engine resets the mouse coordinates, strips all 3D CSS, hides the backface, waits 150ms for a DOM repaint, captures a 4x-scaled UltraHD PNG, and instantly restores the 3D physics before triggering the download.

### E. The Sidebar Studio

* **Input Extraction:** Reusable `<InputWrapper>` components link animated focus states and Lucide React icons for a clean, accessible form layout.
* **Dynamic Menus:** The "Custom Hex Paint" color picker smoothly unrolls via Framer Motion only when the "Bespoke Custom" base material is selected.

---

## 6. Implementation Milestones (Completed)

* **Phase 1: Foundation.** Framed the `100dvh` layout, initialized the `CardContext`, and built the reusable `SidebarCustomizer` inputs.
* **Phase 2: Base 3D Mechanics.** Constructed the absolute-positioned front and back card faces, implemented the mouse-tracking tilt equations, and mapped the layout bounds.
* **Phase 3: The Polish Engine.** Added the Motion Blur flip physics, hoisted hooks for stability, and integrated the Material Interaction haptics (Carbon, Glass, Mesh).
* **Phase 4: The Studio Environment.** Implemented the reactive Ambient Glow lighting and the global toggle system.
* **Phase 5: The Export Protocol.** Engineered the 2D-Flattening state machine to successfully bypass canvas limitations, ensuring flawless, high-resolution `.png` downloads of complex CSS compositions.
