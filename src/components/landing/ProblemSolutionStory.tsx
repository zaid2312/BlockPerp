'use client';

import React from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck, ArrowUpRight, Database, Eye } from 'lucide-react';

export default function ProblemSolutionStory() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-sunrise-light px-3 py-1 rounded-full bg-sunrise/10 border border-sunrise/30">
          Market Inflection Point
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4">
          Traders are abandoning black-box centralized liquidation engines.
        </h2>
        <p className="text-coolgray-400 mt-3 text-sm sm:text-base">
          Offchain CEXs hide order books, manipulate funding intervals (8h spikes), and socialize clawbacks behind closed doors. Onchain perps are capturing the global market.
        </p>
      </div>

      {/* 3 Key Stats with Verified Hackathon Citations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-teal-bright/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-coolgray-400 uppercase">Perp DEX Market Share</span>
            <span className="p-2 rounded-lg bg-teal/15 text-teal-bright">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-bold text-white mt-4 group-hover:text-teal-bright transition-colors">
            ~10%
          </div>
          <p className="text-sm text-coolgray-300 mt-2 font-medium">
            Perp DEX volume vs top CEXs (Apr 2026)
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-coolgray-400 font-mono flex items-center justify-between">
            <span>Historical all-time high</span>
            <span className="text-teal-bright">+4.2% YoY</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-coral/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-coolgray-400 uppercase">Top CEX Volume Decay</span>
            <span className="p-2 rounded-lg bg-coral/15 text-coral">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-bold text-coral mt-4">
            -34%
          </div>
          <p className="text-sm text-coolgray-300 mt-2 font-medium">
            Top CEX monthly perp volume contraction (2026 vs 2025)
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-coolgray-400 font-mono flex items-center justify-between">
            <span>Capital fleeing offchain risk</span>
            <span className="text-coral">Outflow spike</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-sunrise/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-coolgray-400 uppercase">Top-12 Perp DEX Growth</span>
            <span className="p-2 rounded-lg bg-sunrise/15 text-sunrise-light">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-bold text-sunrise-light mt-4">
            +15%
          </div>
          <p className="text-sm text-coolgray-300 mt-2 font-medium">
            Monthly volume surge across verified onchain perpetual DEXs
          </p>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-coolgray-400 font-mono flex items-center justify-between">
            <span>Expanding open interest</span>
            <span className="text-sunrise-light">Sustainable trend</span>
          </div>
        </div>

      </div>

      {/* Verified Source Attribution Note */}
      <div className="mt-6 text-center">
        <span className="text-xs font-mono text-coolgray-400 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-background-deep/60 border border-white/5">
          <Database className="w-3.5 h-3.5 text-teal-bright" />
          <span>Source verification: CoinGecko Perpetual Futures Industry Report (May 2026) via FXStreet Market Data</span>
        </span>
      </div>
    </section>
  );
}
