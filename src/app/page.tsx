'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import { useBlockPerpStore } from '@/lib/store';
import { 
  ArrowRight, 
  Layers, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Wallet, 
  PlusCircle, 
  CheckCircle2, 
  Zap, 
  Sliders 
} from 'lucide-react';

export default function HomeDashboardPage() {
  const { 
    traderProfile, 
    markPrice, 
    indexPrice, 
    currentBlock, 
    annualizedFundingRate, 
    depositCollateral, 
    positions 
  } = useBlockPerpStore();

  const [depositAmount, setDepositAmount] = useState('2500');
  const [depositSuccess, setDepositSuccess] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount) || 0;
    if (amt <= 0) return;
    depositCollateral(amt);
    setDepositSuccess(true);
    setTimeout(() => setDepositSuccess(false), 3000);
  };

  return (
    <div className="relative min-h-screen pb-20">
      <MountainHeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Top Trader Hero Welcome Strip */}
        <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-md bg-teal/20 text-teal-bright font-mono text-[10px] uppercase font-bold px-2">
                VERIFIABLE ONCHAIN TERMINAL
              </span>
              <span className="text-xs font-mono text-coolgray-400">
                Block #{currentBlock}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Welcome, <span className="text-teal-bright">{traderProfile.name}</span>.
            </h1>
            
            <p className="text-xs sm:text-sm text-coolgray-300 mt-1 max-w-2xl font-light">
              Your onchain credit rating is attested at <span className="text-sunrise-light font-semibold">Tier {traderProfile.tier} ({traderProfile.maxLeverage}x leverage)</span> with <span className="text-white font-medium">${traderProfile.collateralUsd.toLocaleString()}</span> active margin collateral in MarginVault.sol.
            </p>
          </div>

          {/* Quick Launch CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/trade"
              className="px-6 py-3 rounded-2xl font-display font-bold text-sm bg-gradient-to-r from-teal-bright to-teal text-background-deep shadow-teal-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Trade Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="px-4 py-3 rounded-2xl font-mono text-xs text-coolgray-300 glass-panel hover:bg-white/10 border border-white/10 transition-colors"
            >
              Switch Account
            </Link>
          </div>
        </div>

        {/* Real-Time Market Ticker Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          
          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[10px] text-coolgray-400 uppercase block">ETH-PERP Mark Price</span>
            <div className="text-2xl font-bold text-white mt-1">${markPrice.toFixed(2)}</div>
            <span className="text-[10px] text-teal-bright">Pyth Hermes Onchain</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[10px] text-coolgray-400 uppercase block">Index (Spot Oracle)</span>
            <div className="text-2xl font-bold text-coolgray-200 mt-1">${indexPrice.toFixed(2)}</div>
            <span className="text-[10px] text-coolgray-400">Aggregated Spot</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[10px] text-coolgray-400 uppercase block">Per-Block Funding</span>
            <div className="text-2xl font-bold text-sunrise-light mt-1">
              {annualizedFundingRate >= 0 ? '+' : ''}{annualizedFundingRate}%
            </div>
            <span className="text-[10px] text-sunrise">Accrues every block (~1.5s)</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10">
            <span className="text-[10px] text-coolgray-400 uppercase block">Open Positions</span>
            <div className="text-2xl font-bold text-teal-bright mt-1">{positions.length} Active</div>
            <span className="text-[10px] text-coolgray-400">MarginVault.sol</span>
          </div>

        </div>

        {/* Actionable Hub: Fast Deposit Collateral & Module Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Quick Collateral Deposit Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-teal-bright" />
                <h3 className="font-display font-bold text-white text-base">Margin Collateral Vault</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal/20 text-teal-bright border border-teal/30">
                ${traderProfile.collateralUsd.toLocaleString()} USDC
              </span>
            </div>

            <p className="text-xs text-coolgray-300 leading-relaxed font-light">
              Deposit collateral directly to <code className="text-teal-bright">MarginVault.sol</code> to increase available buying power for {traderProfile.name}.
            </p>

            <form onSubmit={handleDeposit} className="space-y-3 font-mono text-xs">
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background-deep border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-teal-bright pl-8"
                />
                <span className="absolute left-3 top-3 text-coolgray-400 font-bold">$</span>
                <span className="absolute right-3 top-3 text-xs text-coolgray-400">USDC</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['1000', '2500', '10000'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDepositAmount(preset)}
                    className="py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-coolgray-300"
                  >
                    +${preset}
                  </button>
                ))}
              </div>

              {depositSuccess && (
                <div className="p-2 rounded-lg bg-teal/20 border border-teal-bright/40 text-teal-bright text-xs font-mono flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Collateral deposited to MarginVault.sol!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-display font-bold text-xs bg-teal text-background-deep hover:bg-teal-bright transition-all shadow-teal-glow flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Deposit to Smart Contract</span>
              </button>
            </form>
          </div>

          {/* Module Navigation Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link 
              href="/trade"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-teal-bright/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Layers className="w-5 h-5 text-teal-bright" />
                  <span className="text-[10px] font-mono text-coolgray-500 uppercase">Live Terminal</span>
                </div>
                <h4 className="text-base font-display font-bold text-white group-hover:text-teal-bright transition-colors">
                  Trade Terminal
                </h4>
                <p className="text-xs text-coolgray-400 mt-1 font-light">
                  Execute Long / Short perps on the onchain order book with credit-tiered margin terms.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-teal-bright">
                <span>Open Terminal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              href="/funding"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-sunrise/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-sunrise-light" />
                  <span className="text-[10px] font-mono text-coolgray-500 uppercase">Star Feature</span>
                </div>
                <h4 className="text-base font-display font-bold text-white group-hover:text-sunrise-light transition-colors">
                  Funding Heartbeat
                </h4>
                <p className="text-xs text-coolgray-400 mt-1 font-light">
                  Watch funding update every block (~1.5s) instead of CEX 8-hour cliff intervals.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-sunrise-light">
                <span>View Engine</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              href="/credit"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-teal-bright/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <ShieldCheck className="w-5 h-5 text-teal-bright" />
                  <span className="text-[10px] font-mono text-coolgray-500 uppercase">Verifiable Identity</span>
                </div>
                <h4 className="text-base font-display font-bold text-white group-hover:text-teal-bright transition-colors">
                  Credit Passport
                </h4>
                <p className="text-xs text-coolgray-400 mt-1 font-light">
                  Inspect your mountain elevation score and what-if simulation for higher leverage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-teal-bright">
                <span>View Passport</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              href="/coach"
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-coral/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-coral" />
                  <span className="text-[10px] font-mono text-coolgray-500 uppercase">Pre-Trade Risk</span>
                </div>
                <h4 className="text-base font-display font-bold text-white group-hover:text-coral transition-colors">
                  Liquidation Coach
                </h4>
                <p className="text-xs text-coolgray-400 mt-1 font-light">
                  Stress-test positions under simulated price shocks and per-block carry drag.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-coral">
                <span>Stress Test</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

        </div>

      </div>

      {/* Clean, Non-Lecturing Footer */}
      <footer className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-coolgray-400">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">BLOCKPERP</span>
          <span>•</span>
          <span>The Summit Ledger</span>
          <span>•</span>
          <span className="text-teal-bright">All states verifiable onchain</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/trade" className="hover:text-white transition-colors">Terminal</Link>
          <Link href="/funding" className="hover:text-white transition-colors">Funding</Link>
          <Link href="/credit" className="hover:text-white transition-colors">Passport</Link>
          <Link href="/verify" className="hover:text-white transition-colors">Explorer</Link>
          <Link href="/login" className="hover:text-teal-bright transition-colors">Account</Link>
        </div>
      </footer>
    </div>
  );
}
