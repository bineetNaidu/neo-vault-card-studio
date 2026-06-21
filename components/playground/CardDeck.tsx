"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCardContext } from "../../context/CardContext";
import { CardTheme } from "../../types/card";

// Sleek mini-gradients to match the 3D materials without the heavy rendering
const miniThemes: Record<CardTheme, string> = {
  obsidian: "bg-gradient-to-br from-zinc-800 to-black border border-zinc-700",
  frosted: "bg-white/20 border border-white/20 backdrop-blur-md",
  prism: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border border-white/20",
};

export default function CardDeck() {
  const { cards, activeCardId, setActiveCard, addNewCard } = useCardContext();

  return (
    <div className="flex items-center justify-center h-full w-full max-w-4xl mx-auto px-8">
      {/* We use Framer Motion's layout prop so adding/removing cards smoothly shifts the others */}
      <motion.div layout className="flex items-center">
        {cards.map((card, index) => {
          const isActive = card.id === activeCardId;

          return (
            <motion.div
              layout
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              // The negative margin creates the overlapping "hand of cards" look
              style={{
                marginLeft: index === 0 ? "0px" : "-30px",
                zIndex: isActive ? 40 : cards.length - index,
              }}
              className={`relative cursor-pointer rounded-xl shrink-0 transition-all duration-500 ease-out group ${
                isActive
                  ? "w-48 h-28 scale-110 shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/40 -translate-y-4"
                  : "w-40 h-24 scale-90 opacity-40 hover:opacity-100 hover:-translate-y-6 hover:z-50 shadow-xl"
              } ${miniThemes[card.theme]}`}
            >
              {/* Mini Card Thumbnail Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  {/* Abstract Logo Dot */}
                  <div className="w-4 h-4 bg-white/40 rounded-full" /> 
                  {/* Abstract Chip */}
                  <div className="w-5 h-4 bg-linear-to-br from-yellow-200 to-amber-500 rounded opacity-80" />
                </div>
                
                <div className="mt-auto">
                  <p className="text-[10px] font-mono tracking-widest text-white/90">
                    •••• {card.cardNumber.slice(-4) || "0000"}
                  </p>
                  <p className="text-[8px] font-medium text-white/60 truncate uppercase tracking-wider mt-1">
                    {card.cardHolder || "HOLDER"}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add New Card Button */}
      <motion.button
        layout
        onClick={() => addNewCard("obsidian")} // Spawns a new obsidian card by default
        className="w-12 h-20 ml-8 shrink-0 rounded-xl border border-dashed border-zinc-700 text-zinc-500 flex items-center justify-center hover:border-white/50 hover:text-white transition-all duration-300 bg-black/20 hover:bg-white/5 backdrop-blur-sm group"
      >
        <Plus size={18} className="group-hover:scale-125 transition-transform duration-300" />
      </motion.button>
    </div>
  );
}