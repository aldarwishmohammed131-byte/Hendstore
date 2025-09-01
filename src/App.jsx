import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Crown, CreditCard, Sparkles, Smartphone } from "lucide-react";
import Button from "./Button.jsx";

const SectionTitle = ({ title, badge }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
    {badge && (
      <span className="text-xs px-3 py-1 rounded-full border border-[#1f2330] bg-[#12121a] text-slate-300">
        {badge}
      </span>
    )}
  </div>
);

const Card = ({ className = "", children, ...rest }) => (
  <div className={"rounded-2xl border border-[#1f2330] bg-[#12121a] shadow-[0_10px_30px_rgba(0,0,0,0.25)] " + className} {...rest}>
    {children}
  </div>
);

const Badge = ({ className = "", children, ...rest }) => (
  <div className={"inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f2330] bg-[#0e1422] text-slate-300 text-xs " + className} {...rest}>
    {children}
  </div>
);

const Grid = ({ cols = 3, className = "", children }) => (
  <div className={`grid gap-4 grid-cols-1 ${cols===2?"md:grid-cols-2":""} ${cols===3?"md:grid-cols-3":""} ${cols===4?"md:grid-cols-4":""} ${className}`}>
    {children}
  </div>
);

const GoldLogo = () => (
  <svg width="28" height="28" viewBox="0 0 200 200" className="drop-shadow-[0_0_18px_rgba(255,209,102,.35)]">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffd166" />
        <stop offset="100%" stopColor="#ffae00" />
      </linearGradient>
    </defs>
    <path d="M30 120 L70 60 L100 100 L130 60 L170 120 Z" fill="url(#g)" />
    <path d="M70 130 C90 120,110 120,130 130 L120 170 L80 170 Z" fill="#111827" stroke="#2a3140" strokeWidth="3" />
    <circle cx="100" cy="140" r="8" fill="url(#g)" />
    <rect x="40" y="170" width="120" height="12" rx="6" fill="#1a2030" />
  </svg>
);

const Feature = ({ icon, title, desc }) => (
  <Card className="p-5">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-[#0f1422] border border-[#1f2330] text-yellow-300">{icon}</div>
      <div>
        <div className="font-bold text-lg">{title}</div>
        <p className="text-slate-300/90 text-sm mt-1">{desc}</p>
      </div>
    </div>
  </Card>
);

const ProductCard = ({ chip, name, price }) => (
  <Card className="overflow-hidden">
    <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-[#1e2233] to-[#101625] border-b border-[#1f2330]">
      <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-[#1b2130] border border-[#1f2330] text-slate-300">{chip}</span>
      <span className="opacity-60">Image</span>
    </div>
    <div className="p-4">
      <div className="font-semibold">{name}</div>
      <div className="text-[#ffd166] font-extrabold">{price}</div>
    </div>
  </Card>
);

const usePWAInstall = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [deferred, setDeferred] = useState(null);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferred(e); setCanInstall(true); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const prompt = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setCanInstall(false);
  };
  return { canInstall, prompt };
};

export default function App() {
  const { canInstall, prompt } = usePWAInstall();
  const fadeUp = useMemo(() => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 }
  }), []);

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-slate-100">
      {/* NAV */}
      <div className="sticky top-0 z-30 backdrop-blur-md border-b border-[#1f2330] bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoldLogo />
            <div className="font-bold tracking-wide">Hend Store</div>
            <span className="text-xs px-2 py-1 rounded-full border border-[#1f2330] bg-[#12121a] text-slate-300">Luxury • Fashion • Beauty</span>
          </div>
          <div className="flex items-center gap-2">
            {canInstall && (
              <Button onClick={prompt} className="bg-gradient-to-tr from-[#ffd166] to-[#ffae00] text-black rounded-xl">
                <Smartphone className="w-4 h-4 mr-2 inline" />
                Install App
              </Button>
            )}
            <Button className="border border-[#1f2330] bg-[#12121a] text-slate-100 rounded-xl">Get Early Access</Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <motion.section {...fadeUp} className="mt-6 rounded-3xl border border-[#1f2330] bg-[radial-gradient(80%_120%_at_80%_0%,#162033,#0f1422_60%,#0b0b0f_100%)] p-6 md:p-8 grid md:grid-cols-2 gap-5">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight
