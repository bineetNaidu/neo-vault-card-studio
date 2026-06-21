"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCardContext } from "../../context/CardContext";
import { Card, CardTheme, CardPattern } from "../../types/card";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { FaApple, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

// Pixel-perfect Brand Logos
const BankLogo = ({ type }: { type: string }) => {
  switch (type) {
    case "apple": return <FaApple size={28} />;
    case "visa": return <FaCcVisa size={32} />;
    case "mastercard": return <FaCcMastercard size={32} />;
    case "amex": return <FaCcAmex size={30} />;
    default: return <div className="w-4 h-4 rounded-full bg-current opacity-80 animate-pulse" />;
  }
};

// Premium Textures using SVG Data URIs
const PATTERNS: Record<CardPattern, string> = {
  none: "",
  carbon: "url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 6H0V0h6v6zM0 12h6V6H0v6zm6 0h6V6H6v6zm0-12h6v6H6V0z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  topo: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  mesh: "url(\"data:image/svg+xml,%3Csvg width='20' height='35' viewBox='0 0 20 35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0l10 17.5L10 35 0 17.5 10 0zm0 32.5l8-15-8-15-8 15 8 15z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")"
};

const themeStyles: Record<CardTheme, string> = {
  obsidian: "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black text-zinc-100",
  frosted: "bg-white/10 text-white backdrop-blur-2xl border border-white/20",
  prism: "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white",
  custom: "text-white"
};

export default function ActiveCard() {
  const { cards, activeCardId, focusedField, setFocusedField } = useCardContext();
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];

  const x = useMotionValue(230);
  const y = useMotionValue(145);
  const rotateX = useTransform(y, [0, 290], [18, -18]);
  const rotateY = useTransform(x, [0, 460], [-18, 18]);

  const sheenX = useTransform(x, [0, 460], ["-20%", "120%"]);
  const sheenY = useTransform(y, [0, 290], ["-20%", "120%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(230);
    y.set(145);
  }

  const getFocusStyle = (field: keyof Card) => {
    return focusedField === field
      ? "ring-1 ring-white/60 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-lg px-2 py-1 -mx-2 -my-1 transition-all duration-300"
      : "px-2 py-1 -mx-2 -my-1 border border-transparent transition-all duration-300 cursor-pointer hover:bg-white/5 hover:rounded-lg";
  };

  const baseBgStyle = activeCard.theme === "custom" 
    ? { backgroundColor: activeCard.customColor || "#0f172a" } 
    : {};

  return (
    <div className="flex flex-col items-center gap-10 select-none">
      
      {/* STATIC CAMERA: Holds the perspective so the 3D doesn't warp */}
      <div className="relative w-[460px] h-[290px]" style={{ perspective: "1500px" }}>
        
        {/* 1. OUTER SHELL: Handles Mouse Tracking */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          {/* ISOLATED SHADOW: Pushed -30px back into 3D space so it doesn't break the CSS flipper */}
          <div 
            className="absolute inset-0 rounded-2xl bg-black/60 blur-2xl pointer-events-none"
            style={{ transform: "translateZ(-30px)" }}
          />

          {/* 2. INNER CORE: Handles the 180 Flip independently */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 w-full h-full"
          >
            
            {/* ================= FRONT FACE ================= */}
            <div 
              className="absolute inset-0"
              style={{ 
                backfaceVisibility: "hidden", 
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(1px)" // FIX: Pushes the front face 1px OUT to prevent Z-fighting
              }}
            >
              <div 
                className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-inner ${themeStyles[activeCard.theme]}`}
                style={{ ...baseBgStyle, backgroundImage: PATTERNS[activeCard.pattern || "none"] }}
              >
                <motion.div 
                  style={{ background: `radial-gradient(circle at ${sheenX.get()} ${sheenY.get()}, rgba(255,255,255,0.15) 0%, transparent 60%)` }}
                  className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
                />

                <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start relative">
                    <div className={getFocusStyle("bankLogo")} onClick={() => setFocusedField("bankLogo")}>
                      <BankLogo type={activeCard.bankLogo} />
                    </div>
                    <div className="w-12 h-9 bg-linear-to-br from-amber-200 via-yellow-400 to-amber-600 rounded-md shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] relative overflow-hidden opacity-90 border border-amber-700/50">
                      <div className="absolute inset-x-2 top-0 bottom-0 border-x border-black/20" />
                      <div className="absolute inset-y-2 left-0 right-0 border-y border-black/20" />
                    </div>
                  </div>

                  <div className="space-y-6 relative">
                    <div className={`${getFocusStyle("cardNumber")} font-mono text-2xl tracking-[0.22em] font-medium drop-shadow-md`} onClick={() => setFocusedField("cardNumber")}>
                      {activeCard.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className={getFocusStyle("cardHolder")} onClick={() => setFocusedField("cardHolder")}>
                        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Cardholder</p>
                        <p className="text-sm tracking-widest font-medium drop-shadow-md">{activeCard.cardHolder || "NAME HERE"}</p>
                      </div>
                      <div className={getFocusStyle("expiry")} onClick={() => setFocusedField("expiry")}>
                        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Expires</p>
                        <p className="text-sm font-mono tracking-wider drop-shadow-md">{activeCard.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= BACK FACE ================= */}
            <div 
              className="absolute inset-0 text-white"
              style={{ 
                backfaceVisibility: "hidden", 
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)", // FIX: Spins it backwards AND pushes it 1px OUT the other way
              }}
            >
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
                style={{ backgroundImage: PATTERNS[activeCard.pattern || "none"] }}
              >
                <div className="w-full h-14 bg-black absolute left-0 top-8 shadow-inner" />
                
                <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                  <div className="mt-20 flex items-center justify-end gap-4 w-full relative">
                    <span className="text-[10px] tracking-widest uppercase opacity-40">Security Code</span>
                    <div className={`${getFocusStyle("cvv")} bg-white text-black font-mono text-sm px-4 py-2 rounded font-bold tracking-widest shadow-inner h-10 flex items-center justify-center`} onClick={() => setFocusedField("cvv")}>
                      {activeCard.cvv || "•••"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-30 mt-auto relative">
                    <ShieldCheck size={16} />
                    <p className="text-[9px] tracking-widest uppercase leading-tight">
                      Secured Network Layer <br/> Issued by Authorization Vault
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* Tactile Flip Control Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="flex items-center gap-3 px-6 py-2.5 text-xs font-medium tracking-widest text-zinc-400 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-xl"
      >
        <RefreshCw size={14} className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
        <span>FLIP CARD</span>
      </button>
    </div>
  );
}