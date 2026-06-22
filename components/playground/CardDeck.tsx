"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCardContext } from "../../context/CardContext";
import { CardTheme } from "../../types/card";

// Import the pattern engine we built for the main card
import { PatternRenderer } from "./CardPatterns";

// Updated to include the custom theme
const miniThemes: Record<CardTheme, string> = {
  obsidian: "bg-gradient-to-br from-zinc-800 to-black border border-zinc-700",
  frosted: "bg-white/20 border border-white/20 backdrop-blur-md",
  prism: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border border-white/20 animate-gradient-shift bg-[length:200%_200%]",
  custom: "border border-white/10 shadow-inner", // Background handled inline
};

export default function CardDeck() {
  const { cards, activeCardId, setActiveCard, addNewCard } = useCardContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the end when a new card is added
  const handleAddNewCard = () => {
    addNewCard("custom");
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100); // Small delay to let Framer Motion mount the new DOM node
  };

  return (
    <div className="relative flex items-center h-full w-full max-w-5xl mx-auto">
      
      {/* The Horizontal Scroll Track 
        - overflow-x-auto allows scrolling when cards exceed screen width
        - mask-image creates a premium fade-out effect on the left and right edges
      */}
      <div 
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar items-center py-10 px-6 md:px-12 mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        {/* min-w-max prevents flex children from being squished when the container gets full */}
        <motion.div layout className="flex items-center min-w-max pr-8">
          
          {cards.map((card, index) => {
            const isActive = card.id === activeCardId;

            // Apply custom hex color if they selected the Bespoke theme
            const baseBgStyle = card.theme === "custom" 
              ? { backgroundColor: card.customColor || "#0f172a" } 
              : {};

            return (
              <motion.div
                layout
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                style={{
                  ...baseBgStyle,
                  /* CHANGED: Slightly tighter overlap on mobile */
                  marginLeft: index === 0 ? "0px" : "-20px",
                  zIndex: isActive ? 40 : cards.length - index,
                }}
                /* CHANGED: Added responsive width/height classes to shrink inactive and active cards on mobile */
                className={`relative cursor-pointer rounded-xl shrink-0 transition-all duration-500 ease-out group overflow-hidden ${
                  isActive
                    ? "w-36 h-20 md:w-48 md:h-28 scale-110 shadow-[0_15px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/40 -translate-y-2 md:-translate-y-4"
                    : "w-28 h-16 md:w-40 md:h-24 scale-90 opacity-40 hover:opacity-100 hover:-translate-y-4 md:hover:-translate-y-6 hover:z-50 shadow-xl"
                } ${miniThemes[card.theme]}`}
              >
                {/* Background Pattern Sync */}
                <div className="absolute inset-0 z-0">
                   <PatternRenderer pattern={card.pattern} />
                   {/* Subtle dark gradient to ensure text readability on mini cards */}
                   <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Mini Card Thumbnail Content */}
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    {/* Abstract Logo Dot */}
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full" /> 
                    {/* Abstract Chip */}
                    <div className="w-4 h-3 md:w-5 md:h-4 bg-linear-to-br from-yellow-200 to-amber-500 rounded opacity-80" />
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-[8px] md:text-[10px] font-mono tracking-widest text-white/90 drop-shadow-md">
                      •••• {card.cardNumber.slice(-4) || "0000"}
                    </p>
                    <p className="text-[6px] md:text-[8px] font-medium text-white/60 truncate uppercase tracking-wider mt-1 drop-shadow-md">
                      {card.cardHolder || "HOLDER"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Add New Card Button */}
          <motion.button
            layout
            onClick={handleAddNewCard}
            className="w-10 h-16 md:w-12 md:h-20 ml-4 md:ml-8 shrink-0 rounded-xl border border-dashed border-zinc-700 text-zinc-500 flex items-center justify-center hover:border-white/50 hover:text-white transition-all duration-300 bg-black/40 hover:bg-white/10 backdrop-blur-sm group z-10 relative"
          >
            <Plus size={18} className="group-hover:scale-125 transition-transform duration-300" />
          </motion.button>

        </motion.div>
      </div>
    </div>
  );
}