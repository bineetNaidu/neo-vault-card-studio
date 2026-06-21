import { CardProvider } from "../../context/CardContext";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <CardProvider>
      {/* This locks the screen size and prevents scrolling, 
        acting as the rigid frame for our 3D application.
      */}
      <div className="relative w-full h-screen overflow-hidden bg-zinc-950 text-white shadow-2xl">
        {children}
      </div>
    </CardProvider>
  );
}