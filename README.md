# Neo-Vault Card Studio

## 1. Project Overview

A highly interactive, premium digital card customizer and wallet interface. Users can cycle through a bottom-stacked deck of cards, select one to bring it to center stage, and interactively customize its materials, banking details, and logos. The experience is elevated by a hybrid 3D rendering approach, ensuring a prestige aesthetic with fluid micro-interactions.

**Core Path:** `/app/playground`

## 2. Tech Stack & Libraries

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript (Strict typing for Card State)
* **Styling:** Tailwind CSS (with arbitrary values for 3D perspective)
* **Animation/Interactivity:** Framer Motion (Layout animations, spring physics, drag)
* **3D Environment:** Three.js + React Three Fiber / Drei (For the ambient, luxury background mesh/lighting)
* **State Management:** React Context API (`CardContext`)
* **Assets:** Curated monochrome SVG bank logos (Chase, Amex, Apple, Monzo, etc.)

---

## 3. Architecture & Directory Structure

```text
src/
├── app/
│   └── playground/
│       ├── page.tsx               # Main entry point & Three.js Canvas background
│       └── layout.tsx             # Playground specific layout wrapper
├── components/
│   └── playground/
│       ├── CardStudio.tsx         # The main UI wrapper (DOM overlay above Canvas)
│       ├── Environment3D.tsx      # React Three Fiber background scene
│       ├── CardDeck.tsx           # The bottom stack of cards
│       ├── ActiveCard.tsx         # The center-stage CSS3D/Framer Motion card
│       └── SidebarCustomizer.tsx  # The sliding/expanding right panel
├── context/
│   └── CardContext.tsx            # Global state for cards, active index, and edit focus
├── types/
│   └── card.d.ts                  # TypeScript interfaces for Card properties
└── public/
    └── logos/                     # Curated SVG bank logos

```

---

## 4. State Management (`CardContext`)

To ensure smooth data flow between the clicked card fields and the sidebar, the Context will store:

```typescript
interface Card {
  id: string;
  theme: "obsidian" | "frosted" | "prism";
  bankLogo: string; // path to SVG
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

interface CardContextType {
  cards: Card[];
  activeCardId: string;
  focusedField: keyof Card | null; // e.g., "cardNumber" or "cardHolder"
  
  // Actions
  setActiveCard: (id: string) => void;
  updateActiveCard: (field: keyof Card, value: string) => void;
  setFocusedField: (field: keyof Card | null) => void;
  addNewCard: (initialTheme: Card["theme"]) => void;
}

```

---

## 5. Core Mechanics & UI Flow

### A. The Hybrid Visuals

* **Background (Three.js):** A slow-moving, abstract particle or fluid mesh that reacts slightly to cursor movement. It provides dynamic lighting that makes the DOM-based cards look like they exist in a physical space.
* **Foreground (Next.js/DOM):** Absolute positioned over the canvas. Contains the wallet stack, the active card, and the sidebar.

### B. The Interactive Card (Center Stage)

* **Highlight to Edit:** Every text block and logo on the card is wrapped in a Framer Motion `<motion.div>`. When `focusedField` matches the element, it receives a glowing, pulsing border (e.g., `ring-2 ring-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]`).
* **3D Hover:** Uses Framer Motion's `useMotionValue` to map mouse coordinates to `rotateX` and `rotateY` for realistic tilting.

### C. The Wallet Stack (Bottom Deck)

* **Layout:** Positioned at the bottom center. Cards are mapped out with negative top margins so they overlap like a hand of playing cards.
* **Behavior:** Non-active cards are scaled down (`scale: 0.9`) and dimmed (`opacity: 0.5`).
* **Add New Flow:** A sleek `+` button next to the stack. Clicking it opens a modal or instantly spawns a new card with a default prestige template, immediately setting it as the `activeCardId`.

### D. The Sidebar Studio

* **Dynamic Expansion:** The sidebar listens to `focusedField`. If the user clicks the card's name field, the sidebar smoothly slides open (or expands the specific accordion section) revealing the text input for the name.
* **Logo Grid:** A highly polished grid of SVG icons. Clicking a logo updates the `bankLogo` state instantly on the card.
* **Material Swapper:** Three premium visual toggles to switch between the base CSS gradients/glassmorphism properties of the active card.

---

## 6. Implementation Milestones

* **Step 1: Scaffolding & Context.** Set up the App router, layout, and build out the `CardContext.tsx` with mock initial data.
* **Step 2: The Base Card Component.** Build the CSS 3D card layout using standard Tailwind. Ensure the front and back faces flip perfectly on click.
* **Step 3: The Wallet Mechanics.** Create the bottom stack. Implement Framer Motion `layout` IDs so when a card is clicked, it visually "flies" from the stack to the center of the screen.
* **Step 4: Interactive Editing Loop.** Wire up the `onClick` handlers on the card fields to update `focusedField`. Build the sidebar that conditionally renders inputs based on that focus state.
* **Step 5: Three.js Environment.** Layer the React Three Fiber canvas behind the main UI wrapper to add depth, luxury lighting, and atmosphere.
* **Step 6: Polish & Additions.** Add the "Add New Card" functionality, refine the glowing focus states, and perfect the spring animation dampening for maximum tactile satisfaction.