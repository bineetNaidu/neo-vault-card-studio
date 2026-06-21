"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useVelocity, 
  useMotionTemplate 
} from "framer-motion";
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
  const { cards, activeCardId, focusedField, setFocusedField, studioLighting } = useCardContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [playFlip] = useSound('/whoosh.mp3', { volume: 0.5 });

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];

  const CARD_WIDTH = 540;  // Increased from 460
  const CARD_HEIGHT = 340; // Increased from 290

  // --- Mouse Tilt Physics ---
  // Start the mouse perfectly in the center of the new dimensions
  const x = useMotionValue(CARD_WIDTH / 2);
  const y = useMotionValue(CARD_HEIGHT / 2);

  const rotateX = useTransform(y, [0, CARD_HEIGHT], [18, -18]);
  const rotateY = useTransform(x, [0, CARD_WIDTH], [-18, 18]);

  const sheenX = useTransform(x, [0, CARD_WIDTH], ["-20%", "120%"]);
  const sheenY = useTransform(y, [0, CARD_HEIGHT], ["-20%", "120%"]);

  const shadowX = useTransform(x, [0, CARD_WIDTH], [40, -40]);
  const shadowY = useTransform(y, [0, CARD_HEIGHT], [40, -40]);

  // --- Haptics ---
  // Carbon
  const carbonX = useTransform(x, [0, CARD_WIDTH], ["0%", "-50%"]);
  const carbonY = useTransform(y, [0, CARD_HEIGHT], ["0%", "-20%"]);
  
  // Frosted
  const frostedX = useTransform(x, [0, CARD_WIDTH], [20, -20]);
  const frostedY = useTransform(y, [0, CARD_HEIGHT], [20, -20]);
  const frostedShadow = useMotionTemplate`inset ${frostedX}px ${frostedY}px 40px rgba(255, 255, 255, 0.15)`;

  // Mesh
  const meshX = useTransform(x, [0, CARD_WIDTH], ["100%", "0%"]);
  const meshY = useTransform(y, [0, CARD_HEIGHT], ["100%", "0%"]);
  const meshGradient = useMotionTemplate`radial-gradient(circle at ${meshX} ${meshY}, rgba(0,0,0,0.5) 0%, transparent 60%)`;

  // --- Motion Blur Flip Physics ---
  const flipSpring = useSpring(0, { stiffness: 90, damping: 20 });
  const flipVelocity = useVelocity(flipSpring);
  
  // Maps the speed (up to 1500 deg/sec) to a blur value (up to 5px)
  const dynamicBlur = useTransform(flipVelocity, [-1500, 0, 1500], [5, 0, 5]); 
  const blurFilter = useMotionTemplate`blur(${dynamicBlur}px)`;

  // Trigger the spring whenever the state changes
  useEffect(() => {
    flipSpring.set(isFlipped ? 180 : 0);
  }, [isFlipped, flipSpring]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(CARD_WIDTH / 2);
    y.set(CARD_HEIGHT / 2);
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playFlip();
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      // 1. Tell React to strip all 3D CSS and flatten the card
      setIsExporting(true);
      
      // 2. Give the browser 150ms to completely repaint the layout in 2D
      await new Promise(resolve => setTimeout(resolve, 150));

      const node = cardRef.current;
      const scaleFactor = 4; 
      const ultraHdWidth = node.offsetWidth * scaleFactor;
      const ultraHdHeight = node.offsetHeight * scaleFactor;

      // 3. Take the ultra-HD snapshot of the now-flat 2D element
      const dataUrl = await toPng(node, { 
        cacheBust: true, 
        pixelRatio: 1, 
        width: ultraHdWidth,
        height: ultraHdHeight,
        style: {
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left',
          width: `${node.offsetWidth}px`,
          height: `${node.offsetHeight}px`,
          margin: '0', 
        }
      });
      
      const link = document.createElement('a');
      link.download = `neo-vault-${activeCard.id}-UltraHD.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      // 4. Instantly restore all 3D physics
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

  // --- MATERIAL INTERACTION ENGINE ---
  const renderMaterialEffects = () => (
    <>
      {activeCard.pattern === 'carbon' && (
        <motion.div
          className="absolute inset-[-150%] pointer-events-none mix-blend-overlay z-10 opacity-40"
          style={{
            backgroundImage: "linear-gradient(115deg, transparent 45%, rgba(255,255,255,1) 50%, transparent 55%)",
            x: carbonX,
            y: carbonY,
          }}
        />
      )}

      {activeCard.theme === 'frosted' && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-20"
          style={{ boxShadow: frostedShadow }}
        />
      )}

      {activeCard.pattern === 'mesh' && (
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-multiply z-10"
          style={{ background: meshGradient }}
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col items-center gap-10 select-none">
      <div ref={cardRef} 
        className="relative p-4 -m-4" 
        style={{ 
          perspective: isExporting ? "none" : "1500px", // Flattens the camera
          width: CARD_WIDTH, 
          height: CARD_HEIGHT,
        }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX: isExporting ? 0 : rotateX, 
            rotateY: isExporting ? 0 : rotateY, 
            transformStyle: isExporting ? "flat" : "preserve-3d" // Flattens outer shell 
           }}
          className="w-full h-full relative"
        >
          {/* Base Black Drop Shadow */}
          <div 
            className="absolute inset-0 rounded-2xl bg-black/60 blur-2xl pointer-events-none"
            style={{ transform: isExporting ? "none" : "translateZ(-30px)" }}
          />

          {/* Dynamic Ambient Glow */}
          {studioLighting && (
            <motion.div
              className="absolute inset-0 rounded-2xl blur-[50px] opacity-60 pointer-events-none mix-blend-screen transition-colors duration-500"
              style={{
                backgroundColor: 
                  activeCard.theme === 'custom' ? activeCard.customColor : 
                  activeCard.theme === 'prism' ? '#c084fc' : 
                  activeCard.theme === 'frosted' ? '#e0f2fe' : 
                  'rgba(255,255,255,0.1)', 
                transform: isExporting ? "none" : "translateZ(-50px)",
                x: isExporting ? 0 : shadowX, 
                y: isExporting ? 0 : shadowY, 
              }}
            />
          )}

          {/* INNER CORE: Replaced `animate` with custom `flipSpring` */}
          <motion.div
           style={{ 
              rotateY: isExporting ? 0 : flipSpring, // Stop physical rotation during export
              transformStyle: isExporting ? "flat" : "preserve-3d" 
            }}
            className="absolute inset-0 w-full h-full"
          >
            
            {/* ================= FRONT FACE ================= */}
            <div 
              className="absolute inset-0"
              style={{ 
                backfaceVisibility: isExporting ? "visible" : "hidden", 
                WebkitBackfaceVisibility: isExporting ? "visible" : "hidden", 
                transform: isExporting ? "none" : "translateZ(1px)",
                display: isExporting && isFlipped ? "none" : "block" // Hide front if we are exporting the back
              }}
            >
              {/* Applied blurFilter inside the safe non-3D child container */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-inner ${themeStyles[activeCard.theme]}`}
                style={{ ...baseBgStyle, filter: isExporting ? "none" : blurFilter }}
              >
                <PatternRenderer pattern={activeCard.pattern} />
                <CardNoise />
                
                {/* INJECT MATERIAL EFFECTS HERE */}
                {renderMaterialEffects()}

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
              </motion.div>
            </div>

            {/* ================= BACK FACE ================= */}
            <div 
              className="absolute inset-0 text-white"
              style={{ 
                backfaceVisibility: isExporting ? "visible" : "hidden", 
                WebkitBackfaceVisibility: isExporting ? "visible" : "hidden", 
                transform: isExporting ? "none" : "rotateY(180deg) translateZ(1px)",
                display: isExporting && !isFlipped ? "none" : "block" // Hide back if we are exporting the front
              }}
            >
              {/* Applied blurFilter here as well */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-inner ${themeStyles[activeCard.theme]}`}
                style={{ ...baseBgStyle, filter: isExporting ? "none" : blurFilter }}
              >
                <PatternRenderer pattern={activeCard.pattern} />
                <CardNoise />
                
                {/* INJECT MATERIAL EFFECTS HERE */}
                {renderMaterialEffects()}

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
              </motion.div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 z-50">
        <button
          onClick={handleFlip}
          className="flex items-center gap-3 px-6 py-2.5 text-xs font-medium tracking-widest text-zinc-400 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-xl"
        >
          <RefreshCw size={14} className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
          <span>FLIP CARD</span>
        </button>

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