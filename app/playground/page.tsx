// import Environment3D from "../../components/playground/Environment3D";
import ActiveCard from "../../components/playground/ActiveCard";
import CardDeck from "../../components/playground/CardDeck";
import SidebarCustomizer from "../../components/playground/SidebarCustomizer";

export default function PlaygroundPage() {
  return (
    <>
      {/* LAYER 1: The 3D Environment Canvas 
        Stretches to the back of the entire screen. z-index 0.
      */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-zinc-900 to-black">
        {/* <Environment3D /> */}
      </div>

      {/* LAYER 2: The DOM UI Overlay
        pointer-events-none lets clicks pass through to the 3D canvas...
      */}
      <main className="relative z-10 flex h-full w-full pointer-events-none">
        
        {/* Left/Center Split: Active Card & Bottom Deck */}
        {/* ...but we restore pointer-events-auto on the actual UI blocks */}
        <div className="flex-1 flex flex-col pointer-events-auto">
          
          {/* Top 75%: Center Stage for the Active Card */}
          <div className="flex-1 flex items-center justify-center">
             <ActiveCard />
             {/* <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-400 font-mono text-sm tracking-widest">[ CENTER STAGE ACTIVE CARD ]</p>
             </div> */}
          </div>

          {/* Bottom 25%: The Wallet Stack */}
          <div className="h-56 flex items-end justify-center pb-8">
             <CardDeck />
             {/* <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-500 font-mono text-xs tracking-widest">[ WALLET DECK STACK ]</p>
             </div> */}
          </div>

        </div>

        {/* Right Split: The Sidebar Studio Customizer */}
        <div className="w-[420px] border-l border-white/10 bg-black/40 backdrop-blur-2xl pointer-events-auto shadow-2xl">
          <SidebarCustomizer />
          {/* <div className="p-8 h-full flex flex-col justify-center items-center text-center">
             <div className="border border-white/10 px-6 py-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <p className="text-zinc-500 font-mono text-sm tracking-widest">[ STUDIO SIDEBAR ]</p>
             </div>
          </div> */}
        </div>

      </main>
    </>
  );
}