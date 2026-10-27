'use client';

import React from 'react';
import { Flag, Mountain, CheckCircle2, Circle } from 'lucide-react';

export default function MountainRoadmap() {
  const stages = [
    {
      phase: 'NOW',
      title: 'Himalayan Basecamp (MVP)',
      elevation: '5,364m',
      status: 'CURRENT HACKATHON STAGE',
      items: [
        'Solidity price-time matching in OrderBook.sol',
        'Continuous per-block funding calculation in FundingEngine.sol',
        'Transparent CreditRisk.sol with 3 distinct margin tiers',
        'Integrated Pyth Hermes onchain price feeds',
        'Instant receipt verification and lifecycle tracing',
      ],
      completed: true,
      color: '#2DD4BF',
    },
    {
      phase: 'NEXT',
      title: 'Ridge Hardening',
      elevation: '7,400m',
      status: 'Q3 2026',
      items: [
        'ZK-proof credit credentials without revealing historical addresses',
        'Decentralized keeper network staking for liquidations',
        'Multi-collateral margin support (USDC, USDT, wstETH)',
        'Full formal verification with Certora',
      ],
      completed: false,
      color: '#F28C28',
    },
    {
      phase: 'THEN',
      title: 'Summit Expansion',
      elevation: '8,400m',
      status: 'Q4 2026',
      items: [
        'Cross-margined multi-asset perps (SOL-PERP, BTC-PERP)',
        'LP automated market maker hybrid vaults for passive yields',
        'Sub-second EVM rollup deployment with instant batching',
      ],
      completed: false,
      color: '#FFB454',
    },
    {
      phase: 'LATER',
      title: 'The Infinite Peak',
      elevation: '8,848m',
      status: '2027',
      items: [
        'Decentralized governance sovereign appchain',
        'Onchain structured products and basis trade vaults',
        'Institutional credit delegations with real-world assets (RWA)',
      ],
      completed: false,
      color: '#94A3B8',
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-sunrise-light px-3 py-1 rounded-full bg-sunrise/10 border border-sunrise/30">
          The Ascent Path
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4">
          The Summit Ledger Roadmap
        </h2>
        <p className="text-coolgray-400 mt-3 text-sm sm:text-base">
          From Basecamp testnet to Everest scale. Each milestone is a hardened step up the mountain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {stages.map((stage, idx) => (
          <div 
            key={idx}
            className={`p-6 rounded-2xl glass-panel relative flex flex-col justify-between transition-all ${
              stage.completed 
                ? 'border-2 border-teal-bright/50 shadow-teal-glow' 
                : 'border border-white/10 hover:border-white/20'
            }`}
          >
            {/* Top Elevation Tag */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${stage.color}20`,
                    color: stage.color,
                  }}
                >
                  {stage.phase} • {stage.elevation}
                </span>
                {stage.completed ? (
                  <Flag className="w-4 h-4 text-teal-bright animate-bounce" />
                ) : (
                  <Mountain className="w-4 h-4 text-coolgray-500" />
                )}
              </div>

              <h3 className="text-lg font-bold text-white font-display mb-1">{stage.title}</h3>
              <span className="text-[11px] font-mono text-coolgray-400 block mb-4">{stage.status}</span>

              <ul className="space-y-2.5 text-xs text-coolgray-300">
                {stage.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    {stage.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-bright shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-coolgray-500 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-coolgray-400">
              Altitude: {stage.elevation} above sea level
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
