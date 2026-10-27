'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBlockPerpStore } from '@/lib/store';
import { 
  Activity, 
  ShieldCheck, 
  Layers, 
  Volume2, 
  VolumeX, 
  Play, 
  User, 
  CheckCircle2, 
  ChevronDown,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    currentBlock, 
    markPrice, 
    indexPrice, 
    isMockMode, 
    toggleMockMode, 
    traderProfile, 
    setTraderProfile,
    startDemoTour, 
    tickBlock, 
    blockTimeMs,
    soundEnabled,
    toggleSound,
    syncRealMarketPrice
  } = useBlockPerpStore();

  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Sync real market data on mount & periodic polling
  useEffect(() => {
    syncRealMarketPrice();
    const priceInterval = setInterval(syncRealMarketPrice, 10000);
    return () => clearInterval(priceInterval);
  }, [syncRealMarketPrice]);

  // Global block heartbeat interval
  useEffect(() => {
    const interval = setInterval(() => {
      tickBlock();
      setPulse(true);
      setTimeout(() => setPulse(false), 450);
    }, blockTimeMs);

    return () => clearInterval(interval);
  }, [tickBlock, blockTimeMs]);

  const navLinks = [
    { label: 'Trade Terminal', href: '/trade', icon: Layers },
    { label: 'Funding Engine', href: '/funding', icon: Activity },
    { label: 'Credit Passport', href: '/credit', icon: ShieldCheck },
    { label: 'Risk & Liquidation', href: '/coach', icon: TrendingUp },
    { label: 'Explorer & Proof', href: '/verify', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-3 lg:px-6 py-2.5 transition-all">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Live Block Meter */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/trade" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal-bright/25 to-sunrise/20 border border-teal-bright/40 flex items-center justify-center shadow-teal-glow group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-teal-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 20L9 8L14 16L17 12L21 20H3Z" fill="url(#navLogoGrad)" />
                <defs>
                  <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F28C28" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white">
                BLOCK<span className="text-sunrise">PERP</span>
              </span>
              <span className="hidden sm:block text-[9px] text-teal-bright font-mono uppercase tracking-widest -mt-1">
                The Summit Ledger
              </span>
            </div>
          </Link>

          {/* Block Pulse Height Meter */}
          <div className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-background-deep/90 border font-mono text-xs transition-all ${
            pulse ? 'border-teal-bright/80 bg-teal/15 shadow-teal-glow' : 'border-white/10'
          }`}>
            <span className={`w-2 h-2 rounded-full ${pulse ? 'bg-teal-bright animate-ping' : 'bg-teal-bright/70'}`} />
            <span className="text-coolgray-400 text-[10px]">BLOCK:</span>
            <span className="text-teal-bright font-bold">#{currentBlock}</span>
          </div>

          {/* ETH-PERP Mark / Index Live Pill */}
          <div className="hidden xl:flex items-center gap-2.5 px-2.5 py-1 rounded-lg bg-background-deep/80 border border-white/5 font-mono text-xs">
            <span className="text-coolgray-400 font-semibold">ETH-PERP</span>
            <span className="text-white font-bold">${markPrice.toFixed(2)}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal/15 text-teal-bright font-medium">
              {markPrice >= indexPrice ? '+' : ''}{((markPrice - indexPrice) / indexPrice * 100).toFixed(3)}%
            </span>
          </div>
        </div>

        {/* Center: ALL TABS VISIBLE AND PROPERLY SPACED */}
        <nav className="hidden lg:flex items-center gap-1.5 font-medium text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-white bg-teal/20 border border-teal-bright/40 shadow-teal-glow font-bold'
                    : 'text-coolgray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-bright' : 'text-coolgray-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Sound, Tour, Account */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Audio Chime FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-teal/10 text-teal-bright border-teal/30 hover:bg-teal/20'
                : 'bg-white/5 text-coolgray-500 border-white/10 hover:text-white'
            }`}
            title={soundEnabled ? 'Web Audio SFX Enabled (Click to Mute)' : 'Web Audio SFX Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* 60s Tour Button */}
          <button
            onClick={startDemoTour}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sunrise to-sunrise-light text-background-deep shadow-sunrise-glow hover:brightness-110 active:scale-95 transition-all"
            title="Launch Guided Interactive Tour"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">60s Tour</span>
          </button>

          {/* Dynamic Trader Account Pill & Login Link */}
          <div className="relative">
            <button
              onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl glass-panel hover:bg-background-hover border border-white/15 text-xs font-mono transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-teal-bright" />
              <div className="text-left">
                <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                  <span>{traderProfile.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal/20 text-teal-bright border border-teal/30">
                    {traderProfile.tier} {traderProfile.maxLeverage}x
                  </span>
                </div>
                <div className="text-[10px] text-coolgray-400">
                  {traderProfile.address.slice(0, 6)}...{traderProfile.address.slice(-4)}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-coolgray-400" />
            </button>

            {walletDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 glass-panel-elevated rounded-2xl p-3.5 shadow-2xl z-50 border border-teal/40 space-y-2">
                <div className="text-[10px] font-mono text-coolgray-400 uppercase tracking-wider flex justify-between items-center pb-2 border-b border-white/10">
                  <span>Logged-in Identity</span>
                  <span className="text-teal-bright">CreditRisk.sol</span>
                </div>

                <div className="p-2.5 rounded-xl bg-background-deep border border-white/5 space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-coolgray-400">Handle:</span>
                    <span className="text-white font-bold">{traderProfile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coolgray-400">Collateral:</span>
                    <span className="text-teal-bright font-bold">${traderProfile.collateralUsd.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coolgray-400">Max Leverage:</span>
                    <span className="text-sunrise-light font-bold">{traderProfile.maxLeverage}x ({traderProfile.tier})</span>
                  </div>
                </div>

                {/* Switch / Edit Profile Action */}
                <Link
                  href="/login"
                  onClick={() => setWalletDropdownOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-mono font-bold bg-teal/20 text-teal-bright border border-teal/40 hover:bg-teal/30 transition-all block text-center"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Customize Trader Account</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sub-Navigation for Small Screens: All Tabs Accessible */}
      <div className="lg:hidden flex items-center justify-around pt-2 mt-2 border-t border-white/10 text-xs font-medium overflow-x-auto no-scrollbar gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-2 py-1 rounded-lg shrink-0 transition-colors ${
              pathname === link.href ? 'text-teal-bright font-bold bg-teal/10' : 'text-coolgray-400'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
