export type CardTheme = "obsidian" | "frosted" | "prism" | "custom";
export type CardPattern = "none" | "carbon" | "topo" | "mesh";

export interface Card {
  id: string;
  theme: CardTheme;
  pattern: CardPattern;
  customColor?: string; // Hex code for the custom theme
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
  setActiveCard: (id: string) => void;
  updateActiveCard: (field: keyof Card, value: string) => void;
  setFocusedField: (field: keyof Card | null) => void;
  addNewCard: (initialTheme: CardTheme) => void;
}