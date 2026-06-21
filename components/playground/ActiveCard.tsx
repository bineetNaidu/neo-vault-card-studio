"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCardContext } from "../../context/CardContext";
import { Card, CardTheme } from "../../types/card";
import { RefreshCw, ShieldCheck } from "lucide-react";

// Curated Bank Logo Renderer
const BankLogo = ({ type }: { type: string }) => {
  switch (type) {
    case "apple":
      return (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.36-6.12-3.43-2.8-7.42-7.57-11.95-14.33C25.6 131.18 17.51 112.5 15.28 94.1c-1.39-11.45.69-21.72 6.24-30.8 4.39-7.14 10.15-11.39 17.29-12.72 4.47-.83 9.76.5 15.87 3.01 5.02 2.07 8.92 3.1 11.67 3.1 2.5 0 6.13-.93 10.89-2.78 6.24-2.42 11.13-3.49 14.69-3.23 11.59.83 20.35 4.96 26.3 12.39-11.2 6.8-16.58 16.07-16.12 27.84.47 9.4 4.14 17.15 11.02 23.23 6.87 6.08 14.9 9.23 24.08 9.45.62 2.37 1.45 4.7 2.47 7.01h.06zM119.22 19.11c0 6.64-2.52 12.71-7.56 18.22-5.04 5.51-11.09 9.17-18.15 10.97-1.12.32-2.14.47-3.07.47-1.03 0-1.28-.29-1.28-.47.16-7.39 2.87-13.91 8.12-19.56 5.25-5.65 11.72-9.52 19.4-11.6 1.44-.33 2.32-.49 2.64-.49.16 0 .34.29.34.84.16.51.16.1.16 1.62z"/>
        </svg>
      );
    case "chase":
      return (
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L2.1 4.5v5.4c0 6.1 4.2 11.8 9.9 14.1 5.7-2.3 9.9-8 9.9-14.1V4.5L12 0zm0 2.2l7.7 3.5v4.2c0 4.8-3.3 9.3-7.7 11.2-4.4-1.9-7.7-6.4-7.7-11.2V5.7l7.7-3.5zm0 4.5l-5 2.2v2.8c0 3.1 2.1 6 5 7.2 2.9-1.2 5-4.1 5-7.2V8.9l-5-2.2z"/>
        </svg>
      );
    case "amex":
      return (
        <span className="font-black text-xs tracking-tighter uppercase border border-current px-1 py-0.5 rounded">AMEX</span>
      );
    default:
      return (
        <div className="w-3 h-3 rounded-full bg-current opacity-80 animate-pulse" />
      );
  }
};

// Map card styles dynamically using semantic utilities
const themeStyles: Record<CardTheme, string> = {
  obsidian: "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-800 text-zinc-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] shadow-black/80",
  frosted: "bg-white/10 border border-white/20 text-white backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(255,255,255,0.05)]",
  prism: "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 border border-indigo-400 text-white shadow-[0_25px_60px_-15px_rgba(99,102,241,0.3)]",
};

export default function ActiveCard() {
  const { cards, activeCardId, focusedField, setFocusedField } = useCardContext();
  const [isFlipped, setIsFlipped] = useState(false);

  // Find current working dataset
  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];

  // Motion setup for smooth perspective tracking
  const x = useMotionValue(200);
  const y = useMotionValue(125);
  const rotateX = useTransform(y, [0, 250], [14, -14]);
  const rotateY = useTransform(x, [0, 400], [-14, 14]);

  // Track light sheen overlay
  const sheenX = useTransform(x, [0, 400], ["0%", "100%"]);
  const sheenY = useTransform(y, [0, 250], ["0%", "100%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(125);
  }

  // Unified helper for visual element highlighting
  const getFocusStyle = (field: keyof Card) => {
    return focusedField === field
      ? "ring-2 ring-white/60 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-md px-2 py-1 -mx-2 -my-1 transition-all duration-300"
      : "px-2 py-1 -mx-2 -my-1 border border-transparent transition-all duration-300 cursor-pointer hover:bg-white/5 hover:rounded-md";
  };

  return (
    <div className="flex flex-col items-center gap-8 select-none">
      <div className="perspective-1000 w-[400px] h-[252px]">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className={`relative w-full h-full rounded-2xl p-6 transition-all duration-500 ${themeStyles[activeCard.theme]}`}
        >
          {/* Dynamic Light Sheen Overlay */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${sheenX.get()} ${sheenY.get()}, rgba(255,255,255,0.12) 0%, transparent 65%)`
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-30 mix-blend-overlay"
          />

          {/* FRONT FACE */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden z-10">
            <div className="flex justify-between items-start">
              <div 
                className={getFocusStyle("bankLogo")}
                onClick={() => setFocusedField("bankLogo")}
              >
                <BankLogo type={activeCard.bankLogo} />
              </div>
              
              {/* Premium Contactless Hardware Chip */}
              <div className="w-11 h-8 bg-linear-to-br from-amber-200 via-yellow-400 to-amber-500 rounded-md shadow-inner relative overflow-hidden opacity-90">
                <div className="absolute inset-x-2 top-0 bottom-0 border-x border-black/10" />
                <div className="absolute inset-y-2 left-0 right-0 border-y border-black/10" />
              </div>
            </div>

            <div className="space-y-6">
              <div 
                className={`${getFocusStyle("cardNumber")} font-mono text-xl tracking-[0.2em] font-medium`}
                onClick={() => setFocusedField("cardNumber")}
              >
                {activeCard.cardNumber || "•••• •••• •••• ••••"}
              </div>

              <div className="flex justify-between items-end">
                <div 
                  className={getFocusStyle("cardHolder")}
                  onClick={() => setFocusedField("cardHolder")}
                >
                  <p className="text-[9px] uppercase tracking-widest opacity-40 mb-0.5">Cardholder</p>
                  <p className="text-xs tracking-wide font-medium">{activeCard.cardHolder || "NAME HERE"}</p>
                </div>

                <div 
                  className={getFocusStyle("expiry")}
                  onClick={() => setFocusedField("expiry")}
                >
                  <p className="text-[9px] uppercase tracking-widest opacity-40 mb-0.5">Expires</p>
                  <p className="text-xs font-mono tracking-wider">{activeCard.expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between backface-hidden z-20"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Magnetic Tape Strip */}
            <div className="w-full h-11 bg-zinc-950/90 border-y border-zinc-900 absolute left-0 top-6" />

            <div className="mt-14 flex items-center justify-end gap-3 w-full">
              <span className="text-[8px] tracking-wider uppercase opacity-40">Security Code</span>
              <div 
                className={`${getFocusStyle("cvv")} bg-zinc-100 text-zinc-900 font-mono text-xs px-3 py-1.5 rounded font-bold tracking-widest shadow-inner h-8 flex items-center min-w-[50px] justify-center`}
                onClick={() => setFocusedField("cvv")}
              >
                {activeCard.cvv || "•••"}
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-30 mt-auto">
              <ShieldCheck size={14} />
              <p className="text-[8px] tracking-wide leading-none">
                Secured Network Layer • Issued by Authorization Vault
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tactile Flip Control Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 shadow-xl"
      >
        <RefreshCw size={12} className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
        <span>Flip Card Aspect</span>
      </button>
    </div>
  );
}