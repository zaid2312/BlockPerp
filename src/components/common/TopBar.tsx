'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBlockPerpStore } from '@/lib/store';
import { 
  Activity, 
  Volume2, 
  VolumeX, 
  Play, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Zap,
  User
} from 'lucide-react';

export default function TopBar() {
  const { 
    currentBlock, 
    markPrice, 
    indexPrice, 
    annualizedFundingRate, 
    traderProfile,
    startDemoTour, 
    tickBlock, 
    blockTimeMs,
    soundEnabled,
    toggleSound,
    syncRealMarketPrice
  } = useBlockPerpStore();

  const [pulse, setPulse] = useState(false);

  // Sync real market data
  useEffect(() => {
    syncRealMarketPrice();
    const priceInterval = setInterval(syncRealMarketPrice, 10000);
    return () => clearInterval(priceInterval);
  }, [syncRealMarketPrice]);

  // Global block heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      tickBlock();
      setPulse(true);
      setTimeout(() => setPulse(false), 450);
    }, blockTimeMs);

    return () => clearInterval(interval);
  }, [tickBlock, blockTimeMs]);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-4 font-mono text-xs">
      
      {/* Left: Global Block Ticker & Real Prices */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        {/* Block Pulse */}
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-xl bg-background-deep/90 border transition-all shrink-0 ${
          pulse ? 'border-teal-bright/80 bg-teal/15 shadow-teal-glow' : 'border-white/10'
        }`}>
          <span className={`w-2 h-2 rounded-full ${pulse ? 'bg-teal-bright animate-ping' : 'bg-teal-bright/70'}`} />
          <span className="text-coolgray-400 text-[10px]">EVM BLOCK:</span>
          <span className="text-teal-bright font-bold">#{currentBlock}</span>
        </div>

        {/* Real Live Mark / Index Ticker */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-xl bg-background-deep/80 border border-white/5 shrink-0">
          <span className="text-coolgray-300 font-bold">ETH-PERP</span>
          <div className="flex items-center gap-1.5">
            <span className="text-coolgray-400 text-[10px]">MARK:</span>
            <span className="text-white font-bold">${markPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-coolgray-400 text-[10px]">INDEX:</span>
            <span className="text-coolgray-300">${indexPrice.toFixed(2)}</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal/15 text-teal-bright font-medium">
            {markPrice >= indexPrice ? '+' : ''}{((markPrice - indexPrice) / indexPrice * 100).toFixed(3)}%
          </span>
        </div>

        {/* Live Funding Rate */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-background-deep/80 border border-white/5 shrink-0">
          <span className="text-coolgray-400 text-[10px]">FUNDING (PER-BLOCK):</span>
          <span className="text-sunrise-light font-bold">
            {annualizedFundingRate >= 0 ? '+' : ''}{annualizedFundingRate}% APR
          </span>
        </div>
      </div>

      {/* Right: Actions, Audio, Tour & Profile Badge */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Audio Synth Toggle */}
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

        {/* 60s Judge Tour */}
        <button
          onClick={startDemoTour}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sunrise to-sunrise-light text-background-deep shadow-sunrise-glow hover:brightness-110 active:scale-95 transition-all"
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">60s Demo Tour</span>
        </button>

        {/* Trader Account Quick Badge */}
        <Link
          href="/login"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background-deep/90 border border-white/10 hover:border-teal/40 transition-all text-xs"
        >
          <User className="w-3.5 h-3.5 text-teal-bright" />
          <span className="text-white font-bold hidden sm:inline">{traderProfile.name}</span>
          <span className="text-[10px] text-sunrise-light">({traderProfile.tier} {traderProfile.maxLeverage}x)</span>
        </Link>

      </div>
    </header>
  );
}
