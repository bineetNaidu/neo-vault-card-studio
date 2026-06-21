"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCardContext } from "../../context/CardContext";
import { CardTheme, CardPattern, Card } from "../../types/card";
import { CreditCard, Fingerprint, Type, Calendar, Hash, Palette, Landmark, Layers, Pipette } from "lucide-react";

const THEMES: { id: CardTheme; label: string; bg: string }[] = [
  { id: "obsidian", label: "Obsidian Matte", bg: "bg-zinc-900" },
  { id: "frosted", label: "Frosted Glass", bg: "bg-white/20 backdrop-blur-md" },
  { id: "prism", label: "Holographic Prism", bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" },
  { id: "custom", label: "Bespoke Custom", bg: "bg-gradient-to-br from-zinc-700 to-zinc-800 border-dashed" },
];

const PATTERNS: { id: CardPattern; label: string }[] = [
  { id: "none", label: "Clean Minimal" },
  { id: "carbon", label: "Carbon Fiber" },
  { id: "topo", label: "Topographic" },
  { id: "mesh", label: "Hex Mesh" },
];

const LOGOS = [
  { id: "apple", label: "Apple" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "amex", label: "Amex" },
];

export default function SidebarCustomizer() {
  const { cards, activeCardId, updateActiveCard, focusedField, setFocusedField } = useCardContext();
  
  const activeCard = cards.find((c) => c.id === activeCardId);

  if (!activeCard) return null;

  const renderInput = (
    id: keyof Card,
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    maxLength?: number
  ) => {
    const isFocused = focusedField === id;

    return (
      <div className="space-y-1.5" onClick={() => setFocusedField(id)}>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          {icon}
          {label}
        </label>
        <motion.div
          animate={{
            borderColor: isFocused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)",
            boxShadow: isFocused ? "0 0 15px rgba(255,255,255,0.1)" : "0 0 0px rgba(0,0,0,0)",
          }}
          className="relative rounded-lg bg-zinc-900/50 border overflow-hidden transition-colors"
        >
          <input
            type="text"
            value={activeCard[id as keyof Card] || ""}
            onChange={(e) => updateActiveCard(id, e.target.value)}
            onFocus={() => setFocusedField(id)}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full bg-transparent px-4 py-2.5 text-sm font-medium text-white placeholder-zinc-600 focus:outline-none"
          />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-y-auto no-scrollbar pb-24">
      
      <div className="mb-8">
        <h2 className="text-xl font-light tracking-tight flex items-center gap-3">
          <Fingerprint className="text-zinc-500" />
          Studio Configuration
        </h2>
        <p className="text-xs text-zinc-500 mt-2 font-mono tracking-wider">ID: {activeCard.id}</p>
      </div>

      <div className="space-y-8">
        {/* --- MATERIAL SELECTION --- */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Palette size={14} /> Base Material
          </label>
          <div className="grid grid-cols-1 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateActiveCard("theme", theme.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                  activeCard.theme === theme.id
                    ? "border-white/50 bg-white/5 shadow-lg"
                    : "border-white/5 hover:border-white/20 hover:bg-white/5"
                }`}
              >
                <div className={`w-8 h-8 rounded-full border border-white/20 shadow-inner ${theme.bg}`} />
                <span className="text-sm font-medium tracking-wide">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- CONDITIONAL CUSTOM HEX COLOR --- */}
        {activeCard.theme === "custom" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Pipette size={14} /> Custom Hex Paint
            </label>
            <div className="flex items-center gap-3 p-2 bg-zinc-900/50 border border-white/10 rounded-lg">
              <input 
                type="color" 
                value={activeCard.customColor || "#0f172a"}
                onChange={(e) => updateActiveCard("customColor", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input 
                type="text"
                value={activeCard.customColor || "#0f172a"}
                onChange={(e) => updateActiveCard("customColor", e.target.value)}
                className="bg-transparent text-sm font-mono tracking-widest text-white uppercase focus:outline-none w-full"
                placeholder="#HEXCODE"
              />
            </div>
          </motion.div>
        )}

        {/* --- SURFACE PATTERN SELECTION --- */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} /> Surface Texture
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PATTERNS.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => updateActiveCard("pattern", pattern.id)}
                className={`p-2.5 rounded-lg border text-xs font-medium uppercase tracking-wider transition-all ${
                  activeCard.pattern === pattern.id
                    ? "bg-white text-black border-white shadow-lg"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- BANK LOGO SELECTION --- */}
        <div className="space-y-3" onClick={() => setFocusedField("bankLogo")}>
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Landmark size={14} /> Issuing Bank
          </label>
          <motion.div 
            animate={{ borderColor: focusedField === "bankLogo" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.0)" }}
            className="grid grid-cols-4 gap-2 p-1 rounded-xl"
          >
            {LOGOS.map((logo) => (
              <button
                key={logo.id}
                onClick={() => updateActiveCard("bankLogo", logo.id)}
                className={`p-2 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all flex justify-center items-center h-10 ${
                  activeCard.bankLogo === logo.id
                    ? "bg-white text-black border-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {logo.label}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* --- TEXT CONFIGURATION --- */}
        <div className="space-y-6">
          {renderInput("cardHolder", "Cardholder Name", <Type size={14} />, "NAME HERE")}
          {renderInput("cardNumber", "Primary Account Number", <CreditCard size={14} />, "•••• •••• •••• ••••", 19)}
          
          <div className="grid grid-cols-2 gap-4">
            {renderInput("expiry", "Expiration", <Calendar size={14} />, "MM/YY", 5)}
            {renderInput("cvv", "Security Code", <Hash size={14} />, "•••", 4)}
          </div>
        </div>

      </div>
    </div>
  );
}