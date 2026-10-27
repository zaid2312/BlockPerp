'use client';

import React from 'react';
import { Check, X, Shield, Cpu, RefreshCw, Zap, Lock, Unlock } from 'lucide-react';

export default function ComparisonMatrix() {
  const comparisonData = [
    {
      dimension: 'Matching & Execution',
      offchain: 'Private CEX centralized matching engine prone to order front-running and unseen API latency advantages.',
      blockperp: '100% deterministic price-time priority matching executed strictly inside OrderBook.sol.',
      winner: 'blockperp',
    },
    {
      dimension: 'Funding Settlement',
      offchain: 'Arbitrary 8-hour cliff settlement causing massive volatile basis dislocations and sudden liquidation dumps.',
      blockperp: 'Continuous per-block funding heartbeat (~1.5s) eliminating basis jumps and smoothing tracking error.',
      winner: 'blockperp',
    },
    {
      dimension: 'Margin & Credit Terms',
      offchain: 'One-size-fits-all rigid haircuts or opaque VIP kickbacks with zero onchain provenance.',
      blockperp: 'CreditRisk.sol inspects verifiable wallet history to grant higher leverage (Basecamp 3x → Summit 20x).',
      winner: 'blockperp',
    },
    {
      dimension: 'Solvency & Auditability',
      offchain: 'Proof-of-reserves snapshots that ignore liabilities, hidden internal book lending, and private liquidation funds.',
      blockperp: 'MarginVault.sol & Liquidator.sol balances, positions, and collateral are public in real-time every block.',
      winner: 'blockperp',
    },
    {
      dimension: 'Liquidation Transparency',
      offchain: 'Internal liquidation bots eating trader equity with undisclosed penalty spreads and socialized clawbacks.',
      blockperp: 'Permissionless keeper incentive mechanism with verifiable insurance fund balance receipts.',
      winner: 'blockperp',
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-bright px-3 py-1 rounded-full bg-teal/10 border border-teal/30">
          Architecture Contrast
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4">
          Offchain Black Box vs The Summit Ledger
        </h2>
        <p className="text-coolgray-400 mt-3 text-sm sm:text-base">
          BlockPerp replaces centralized databases with 5 audited smart contracts working in unyielding harmony.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-glass">
        <div className="grid grid-cols-12 bg-background-deep/90 p-4 border-b border-white/10 text-xs font-mono text-coolgray-400 uppercase tracking-wider">
          <div className="col-span-3">System Dimension</div>
          <div className="col-span-4 text-coral flex items-center gap-1.5">
            <X className="w-3.5 h-3.5" /> Traditional CEX (Binance / FTX)
          </div>
          <div className="col-span-5 text-teal-bright flex items-center gap-1.5 font-bold">
            <Check className="w-4 h-4 text-teal-bright" /> BlockPerp Protocol (Cache & Crew)
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {comparisonData.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 text-sm hover:bg-white/[0.02] transition-colors items-center">
              <div className="col-span-12 sm:col-span-3 font-semibold text-white mb-2 sm:mb-0 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sunrise" />
                {row.dimension}
              </div>
              <div className="col-span-12 sm:col-span-4 text-xs text-coolgray-400 leading-relaxed pr-4 mb-2 sm:mb-0 font-light">
                {row.offchain}
              </div>
              <div className="col-span-12 sm:col-span-5 text-xs text-coolgray-200 leading-relaxed bg-teal/[0.03] p-3 rounded-xl border border-teal/20 font-normal">
                {row.blockperp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
