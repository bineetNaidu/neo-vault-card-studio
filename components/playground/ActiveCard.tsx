"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCardContext } from "../../context/CardContext";
import { Card, CardTheme } from "../../types/card";
import { RefreshCw, ShieldCheck, Download, Loader2 } from "lucide-react";
import { FaApple, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { toPng } from 'html-to-image';
import useSound from 'use-sound';

import { CardNoise, PatternRenderer } from "./CardPatterns";

const BankLogo = ({ type }: { type: string }) => {
  switch (type) {
    case "apple": return <FaApple size={28} />;
    case "visa": return <FaCcVisa size={32} />;
    case "mastercard": return <FaCcMastercard size={32} />;
    case "amex": return <FaCcAmex size={30} />;
    default: return <div className="w-4 h-4 rounded-full bg-current opacity-80 animate-pulse" />;
  }
};

const themeStyles: Record<CardTheme, string> = {
  obsidian: "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black text-zinc-100",
  frosted: "bg-white/10 text-white backdrop-blur-2xl border border-white/20",
  prism: "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white bg-[length:200%_200%] animate-gradient-shift",
  custom: "text-white"
};

export default function ActiveCard() {
  const { cards, activeCardId, focusedField, setFocusedField } = useCardContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // The camera reference attached to our 3D container
  const cardRef = useRef<HTMLDivElement>(null);

  // Audio Engine (Requires whoosh.mp3 in public folder, fails gracefully if missing)
  const [playFlip] = useSound('/whoosh.mp3', { volume: 0.5 });

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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playFlip(); // Trigger tactile sound
  };

  // The Snapshot Engine
  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      
      // Forces the image quality higher and handles CSS 3D better
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 3, // High-Res export
        style: {
          transform: 'none' // Reset outer container layout purely for the shot
        }
      });
      
      // Trigger native browser download
      const link = document.createElement('a');
      link.download = `neo-vault-${activeCard.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsExporting(false);
    }
  };

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
      
      {/* We attach the ref here. This is the exact bounding box it will photograph */}
      <div ref={cardRef} className="relative w-[460px] h-[290px] p-4 -m-4" style={{ perspective: "1500px" }}>
        
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          <div 
            className="absolute inset-0 rounded-2xl bg-black/60 blur-2xl pointer-events-none"
            style={{ transform: "translateZ(-30px)" }}
          />

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
                transform: "translateZ(1px)"
              }}
            >
              <div 
                className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-inner ${themeStyles[activeCard.theme]}`}
                style={baseBgStyle}
              >
                <PatternRenderer pattern={activeCard.pattern} />
                <CardNoise />

                <motion.div 
                  style={{ background: `radial-gradient(circle at ${sheenX.get()} ${sheenY.get()}, rgba(255,255,255,0.2) 0%, transparent 60%)` }}
                  className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
                />

                <div className="absolute inset-0 p-7 flex flex-col justify-between z-40">
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
                transform: "rotateY(180deg) translateZ(1px)",
              }}
            >
              <div 
                className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-inner ${themeStyles[activeCard.theme]}`}
                style={baseBgStyle}
              >
                <PatternRenderer pattern={activeCard.pattern} />
                <CardNoise />

                <div className="w-full h-14 bg-black absolute left-0 top-8 shadow-inner z-20" />
                
                <div className="absolute inset-0 p-7 flex flex-col justify-between z-40">
                  <div className="mt-20 flex items-center justify-end gap-4 w-full relative">
                    <span className="text-[10px] tracking-widest uppercase opacity-40 drop-shadow-md">Security Code</span>
                    <div className={`${getFocusStyle("cvv")} bg-white text-black font-mono text-sm px-4 py-2 rounded font-bold tracking-widest shadow-inner h-10 flex items-center justify-center`} onClick={() => setFocusedField("cvv")}>
                      {activeCard.cvv || "•••"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-50 mt-auto relative drop-shadow-md">
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

      {/* Control Deck */}
      <div className="flex items-center gap-4 z-50">
        <button
          onClick={handleFlip}
          className="flex items-center gap-3 px-6 py-2.5 text-xs font-medium tracking-widest text-zinc-400 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-xl"
        >
          <RefreshCw size={14} className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
          <span>FLIP CARD</span>
        </button>

        {/* New Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-3 px-6 py-2.5 text-xs font-medium tracking-widest text-zinc-400 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-full hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/50 transition-all duration-300 shadow-xl disabled:opacity-50"
        >
          {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          <span>{isExporting ? "CAPTURING..." : "SNAPSHOT"}</span>
        </button>
      </div>

    </div>
  );
}