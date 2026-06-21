import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-light tracking-tight text-white mb-8">Neo-Vault</h1>
      <Link 
        href="/playground" 
        className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        Enter Studio
      </Link>
    </main>
  );
}