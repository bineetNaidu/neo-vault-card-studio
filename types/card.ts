export type CardTheme = "obsidian" | "frosted" | "prism";

export interface Card {
  id: string;
  theme: CardTheme;
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