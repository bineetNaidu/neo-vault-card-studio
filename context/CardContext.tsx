"use client";

import React, { createContext, useContext, useState } from "react";
import { Card, CardContextType, CardTheme } from "../types/card";

const defaultCards: Card[] = [
  {
    id: "card-1",
    theme: "obsidian",
    bankLogo: "apple",
    pattern: "none",
    cardNumber: "•••• •••• •••• 9021",
    cardHolder: "ALEXANDER NEWMAN",
    expiry: "12/28",
    cvv: "123",
  },
  {
    id: "card-2",
    theme: "frosted",
    bankLogo: "chase",
    pattern: "none",
    cardNumber: "•••• •••• •••• 4432",
    cardHolder: "ALEXANDER NEWMAN",
    expiry: "09/29",
    cvv: "456",
  },
  {
    id: "card-3",
    theme: "prism",
    bankLogo: "amex",
    pattern: "none",
    cardNumber: "•••• •••• •••• 8888",
    cardHolder: "ALEXANDER NEWMAN",
    expiry: "01/30",
    cvv: "789",
  }
];

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[]>(defaultCards);
  const [activeCardId, setActiveCardId] = useState<string>(defaultCards[0].id);
  const [focusedField, setFocusedField] = useState<keyof Card | null>(null);
  const [studioLighting, setStudioLighting] = useState(true); // Default to true because it looks amazing

  const setActiveCard = (id: string) => setActiveCardId(id);

  const updateActiveCard = (field: keyof Card, value: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === activeCardId ? { ...card, [field]: value } : card
      )
    );
  };

  const addNewCard = (initialTheme: CardTheme) => {
    const newCard: Card = {
      id: `card-${Date.now()}`,
      theme: initialTheme,
      bankLogo: "generic",
      pattern: "none",
      cardNumber: "•••• •••• •••• 0000",
      cardHolder: "NEW CARDHOLDER",
      expiry: "MM/YY",
      cvv: "000",
    };
    setCards((prev) => [...prev, newCard]);
    setActiveCardId(newCard.id); // Auto-focus the new card
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        activeCardId,
        focusedField,
        setActiveCard,
        updateActiveCard,
        setFocusedField,
        addNewCard,
        studioLighting,
        setStudioLighting,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
}