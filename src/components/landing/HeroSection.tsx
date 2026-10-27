'use client';

import React from 'react';
import Link from 'next/link';
import { useBlockPerpStore } from '@/lib/store';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Lock 
} from 'lucide-react';

export default function HeroSection() {
  const { currentBlock, markPrice, indexPrice, premium, annualizedFundingRate, startDemoTour } = useBlockPerpStore();

  return (
    <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Top Track & Summit Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 border border-teal-bright/30 backdrop-blur-md mb-6 shadow-teal-glow">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-bright opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-bright"></span>
        </span>
        <span className="text-xs font-mono text-teal-bright uppercase tracking-wider font-semibold">
          Hack in Hills 26 • Track PS 02: Onchain Finance & Trading
        </span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl">
        Perps, where every block is a{' '}
        <span className="bg-gradient-to-r from-teal-bright via-sunrise-light to-sunrise bg-clip-text text-transparent">
          price discovery.
        </span>
      </h1>

      {/* Sub-line */}
      <p className="mt-6 text-lg sm:text-xl text-coolgray-300 max-w-3xl leading-relaxed font-light">
        Finance where the rules, execution and settlement are visible onchain. 
        Featuring <span className="text-sunrise-light font-medium">funding that moves every block, not every hour</span>, 
        and verifiable credit-tiered margin terms.
      </p>

      {/* 2 Primary CTAs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/trade"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-background-deep bg-gradient-to-r from-teal-bright to-teal shadow-teal-glow hover:brightness-110 active:scale-95 transition-all text-base"
        >
          <span>Launch App</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="/verify"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white glass-panel hover:bg-white/10 border border-white/20 active:scale-95 transition-all text-base"
        >
          <Layers className="w-5 h-5 text-sunrise-light" />
          <span>Watch Order Lifecycle</span>
        </Link>
      </div>

      {/* Live Ticker Strip */}
      <div className="mt-12 w-full max-w-4xl p-4 rounded-2xl glass-panel-elevated border border-white/10 shadow-glass">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="p-2 text-left">
            <span className="text-[11px] font-mono text-coolgray-400 block uppercase">EVM Block Ticker</span>
            <div className="text-xl font-mono font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-bright animate-ping" />
              #{currentBlock}
            </div>
            <span className="text-[10px] text-teal-bright font-mono">1.5s fast-finality</span>
          </div>

          <div className="p-2 text-left md:pl-4">
            <span className="text-[11px] font-mono text-coolgray-400 block uppercase">ETH-PERP Mark</span>
            <div className="text-xl font-mono font-bold text-teal-bright mt-0.5">
              ${markPrice.toFixed(2)}
            </div>
            <span className="text-[10px] text-coolgray-400 font-mono">Pyth Hermes Onchain</span>
          </div>

          <div className="p-2 text-left md:pl-4">
            <span className="text-[11px] font-mono text-coolgray-400 block uppercase">Index Price</span>
            <div className="text-xl font-mono font-bold text-coolgray-200 mt-0.5">
              ${indexPrice.toFixed(2)}
            </div>
            <span className="text-[10px] text-coolgray-400 font-mono">Spot aggregate oracle</span>
          </div>

          <div className="p-2 text-left md:pl-4">
            <span className="text-[11px] font-mono text-coolgray-400 block uppercase">Funding Rate (Live)</span>
            <div className="text-xl font-mono font-bold text-sunrise-light mt-0.5">
              {annualizedFundingRate >= 0 ? '+' : ''}{annualizedFundingRate}% <span className="text-xs font-normal text-coolgray-400">APR</span>
            </div>
            <span className="text-[10px] text-sunrise font-mono">Accrues every single block</span>
          </div>

        </div>
      </div>

    </section>
  );
}
