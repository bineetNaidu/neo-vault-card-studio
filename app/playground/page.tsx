"use client";

import { useState } from "react";
import Environment3D from "../../components/playground/Environment3D";
import ActiveCard from "../../components/playground/ActiveCard";
import CardDeck from "../../components/playground/CardDeck";
import SidebarCustomizer from "../../components/playground/SidebarCustomizer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X, Wallet } from "lucide-react";

export default function PlaygroundPage() {
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState(false);

  return (
    <>
      {/* LAYER 1: The 3D Environment Canvas 
        Stretches to the back of the entire screen. z-index 0.
      */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-zinc-900 to-black">
        <Environment3D />
      </div>

      {/* LAYER 2: The DOM UI Overlay
        pointer-events-none lets clicks pass through to the 3D canvas...
      */}
      <main className="relative z-10 flex flex-col md:flex-row h-dvh w-full pointer-events-none">

      <div className="absolute top-6 left-8 z-50 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 py-1 px-2 text-[10px] font-light tracking-[0.25em] uppercase text-zinc-500 border border-zinc-500 hover:text-white hover:border-zinc-200 transition-colors duration-300"
        >
          <span className="text-xs">←</span>
          Neo-Vault
        </Link>
      </div>
        
        {/* Left/Center Split: Active Card & Bottom Deck */}
        {/* ...but we restore pointer-events-auto on the actual UI blocks */}
        <div className="flex-1 flex flex-col pointer-events-auto relative">
          
          {/* Top 75%: Center Stage for the Active Card */}
         {/* Aggressively increased the upward translate (-20vh) and reduced scale to 75% so it completely clears the drawer */}
         <div className={`flex-1 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:origin-center will-change-transform transform-gpu ${
            isConfigDrawerOpen || isWalletDrawerOpen 
              ? 'translate-y-[-22vh] scale-[0.80] md:scale-100 md:translate-y-0' 
              : 'pt-20'
          }`}>
             <ActiveCard />
             {/* <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-400 font-mono text-sm tracking-widest">[ CENTER STAGE ACTIVE CARD ]</p>
             </div> */}
          </div>

          {/* Bottom 25%: The Wallet Stack */}
          <div className="h-40 md:h-56 hidden md:flex items-end justify-center pb-24 md:pb-8">
             <CardDeck />
             {/* <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-500 font-mono text-xs tracking-widest">[ WALLET DECK STACK ]</p>
             </div> */}
          </div>
        </div>

        {/* Right Split: The Sidebar Studio Customizer (DESKTOP VIEW) */}
        <div className="hidden md:block w-[420px] border-l border-white/10 bg-black/40 backdrop-blur-2xl pointer-events-auto shadow-2xl">
          <SidebarCustomizer />
          {/* <div className="p-8 h-full flex flex-col justify-center items-center text-center">
             <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-500 font-mono text-sm tracking-widest">[ STUDIO SIDEBAR ]</p>
             </div>
          </div> */}
        </div>

      </main> 

      {/* Mobile Dual-Pill Navigation Dock */}
      <div className="fixed bottom-6 mb-[env(safe-area-inset-bottom)] left-1/2 -translate-x-1/2 md:hidden z-50 pointer-events-auto flex items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl p-1.5">
        <button 
          onClick={() => { setIsWalletDrawerOpen(true); setIsConfigDrawerOpen(false); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Wallet size={14} />
          VAULT
        </button>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <button 
          onClick={() => { setIsConfigDrawerOpen(true); setIsWalletDrawerOpen(false); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Settings2 size={14} />
          CONFIG
        </button>
      </div>

      {/* Shared Backdrop for both Drawers */}
      <AnimatePresence>
        {(isConfigDrawerOpen || isWalletDrawerOpen) && (
          <motion.div 
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsConfigDrawerOpen(false); setIsWalletDrawerOpen(false); }}
            className="fixed inset-0 z-60 bg-transparent md:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* 1. The Config Drawer */}
      <AnimatePresence>
        {isConfigDrawerOpen && (
          <motion.div
            key="config-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-70 max-h-[55vh] bg-zinc-950/95 backdrop-blur-3xl border-t border-white/10 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-y-auto pointer-events-auto md:hidden flex flex-col"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
              <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Studio Config</span>
              <button 
                onClick={() => setIsConfigDrawerOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
            <div className="relative">
              <SidebarCustomizer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The Wallet (Card Deck) Drawer */}
      <AnimatePresence>
        {isWalletDrawerOpen && (
          <motion.div
            key="wallet-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-70 max-h-[55vh] bg-zinc-950/95 backdrop-blur-3xl border-t border-white/10 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-y-auto no-scrollbar will-change-transform pointer-events-auto md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Your Vault</span>
              <button 
                onClick={() => setIsWalletDrawerOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
            <div className="pb-[calc(2rem+env(safe-area-inset-bottom))] pt-2">
              <CardDeck />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}