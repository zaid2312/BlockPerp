'use client';

import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, TrendingUp, Sliders, Zap } from 'lucide-react';

export default function FundingComparisonChart() {
  const [scrubberHour, setScrubberHour] = useState<number>(7.2); // hour 7.2 of 8h cycle
  const [positionSize, setPositionSize] = useState<number>(5.0); // 5 ETH

  // Compute live difference at scrubber position
  // CEX charges nothing until 8.0, then hits 100% cliff
  const isCexCliffHit = scrubberHour >= 7.95;
  const cexAccumulated = isCexCliffHit ? (positionSize * 2500 * 0.00015) : 0;
  
  // BlockPerp continuous smooth accrual
  const blockperpContinuous = (scrubberHour / 8) * (positionSize * 2500 * 0.00011);
  const cliffSpikeRisk = !isCexCliffHit ? 'Severe ($13.75 cliff pending)' : 'Dump executed';

  return (
    <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10 mt-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-sunrise/20 text-sunrise-light">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-display font-bold text-white">
              CEX 8-Hour Cliff vs BlockPerp Continuous Accrual
            </h3>
          </div>
          <p className="text-xs text-coolgray-400 mt-1">
            Drag the time scrubber across an 8-hour cycle to see how CEX sudden cliff dumps trigger artificial liquidations.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-coral rounded" />
            <span className="text-coolgray-300">CEX (8h Cliff Stepped)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-teal-bright rounded" />
            <span className="text-teal-bright font-bold">BlockPerp (Per-Block Flow)</span>
          </div>
        </div>
      </div>

      {/* Interactive 8h Scrubber Slider */}
      <div className="mt-6 p-4 rounded-2xl bg-background-deep/80 border border-white/5 space-y-2 font-mono text-xs">
        <div className="flex justify-between items-center text-coolgray-300">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-sunrise-light" />
            <span>Simulate Time Passed in 8-Hour Cycle:</span>
          </span>
          <span className="text-teal-bright font-bold text-sm">{scrubberHour.toFixed(1)} / 8.0 Hours</span>
        </div>
        <input
          type="range"
          min="0"
          max="8"
          step="0.1"
          value={scrubberHour}
          onChange={(e) => setScrubberHour(Number(e.target.value))}
          className="w-full accent-teal-bright cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-coolgray-500">
          <span>00:00 UTC (Cycle Start)</span>
          <span>04:00 UTC (Midpoint)</span>
          <span className="text-coral font-bold">08:00 UTC (The CEX Cliff Shock)</span>
        </div>
      </div>

      {/* SVG Comparison Visualization with Scrubber Needle */}
      <div className="relative w-full h-72 mt-4 select-none">
        <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="smoothCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="60" x2="800" y2="60" stroke="rgba(255,255,255,0.04)" />
          <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.04)" />
          <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(255,255,255,0.04)" />

          {/* Vertical interval markers */}
          <line x1="380" y1="20" x2="380" y2="220" stroke="rgba(242,140,40,0.2)" strokeDasharray="3 3" />
          <text x="385" y="35" fill="#FFB454" fontSize="10" fontFamily="JetBrains Mono">04:00 UTC</text>

          <line x1="720" y1="20" x2="720" y2="220" stroke="rgba(229,72,77,0.3)" strokeDasharray="3 3" />
          <text x="645" y="35" fill="#E5484D" fontSize="10" fontFamily="JetBrains Mono">08:00 UTC Cliff</text>

          {/* CEX Stepped Red Line: Completely flat for 8h, then instant vertical spike */}
          <path
            d="M 40 180 L 720 180 L 720 70 L 780 70"
            fill="none"
            stroke="#E5484D"
            strokeWidth="3"
          />

          {/* BlockPerp Continuous Smooth Area Fill & Neon Teal Curve */}
          <path
            d="M 40 180 Q 220 170 380 135 T 720 75 L 780 70 L 780 220 L 40 220 Z"
            fill="url(#smoothCurveGrad)"
          />
          <path
            d="M 40 180 Q 220 170 380 135 T 720 75 L 780 70"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="3.5"
            filter="drop-shadow(0 0 10px rgba(45, 212, 191, 0.5))"
          />

          {/* Scrubber Needle Indicator */}
          {(() => {
            const scrubberX = 40 + (scrubberHour / 8) * 680;
            return (
              <g>
                <line 
                  x1={scrubberX} 
                  y1="15" 
                  x2={scrubberX} 
                  y2="225" 
                  stroke="#FFB454" 
                  strokeWidth="2" 
                  strokeDasharray="4 2" 
                />
                <circle cx={scrubberX} cy="180" r="5" fill="#E5484D" />
                <circle cx={scrubberX} cy={180 - (scrubberHour / 8) * 105} r="6" fill="#2DD4BF" className="animate-ping" />
                <circle cx={scrubberX} cy={180 - (scrubberHour / 8) * 105} r="4" fill="#FFFFFF" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Dynamic Real-Time Status Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-mono text-xs">
        
        <div className="p-4 rounded-2xl bg-coral/10 border border-coral/30">
          <span className="text-[10px] text-coral uppercase font-bold block mb-1">CEX Cliff Paid So Far</span>
          <div className="text-xl font-bold text-white">${cexAccumulated.toFixed(2)} USD</div>
          <span className="text-[10px] text-coral mt-1 block">
            {isCexCliffHit ? 'Cliff penalty hit account!' : 'Zero paid yet → 100% cliff dump imminent'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-teal/10 border border-teal/30">
          <span className="text-[10px] text-teal-bright uppercase font-bold block mb-1">BlockPerp Smooth Accrual</span>
          <div className="text-xl font-bold text-white">${blockperpContinuous.toFixed(2)} USD</div>
          <span className="text-[10px] text-teal-bright mt-1 block">
            Smooth per-block carry. Zero basis dislocation.
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-background-deep border border-white/10">
          <span className="text-[10px] text-coolgray-400 uppercase font-bold block mb-1">Trader Liquidation Risk</span>
          <div className="text-sm font-bold text-sunrise-light">{cliffSpikeRisk}</div>
          <span className="text-[10px] text-coolgray-400 mt-1 block">
            BlockPerp protects equity every single block (~1.5s).
          </span>
        </div>

      </div>

    </div>
  );
}
