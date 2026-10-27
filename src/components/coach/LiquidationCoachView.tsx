'use client';

import React, { useState } from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { ShieldAlert, TrendingDown, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function LiquidationCoachView() {
  const { markPrice, creditProfile } = useBlockPerpStore();
  
  const [size, setSize] = useState<number>(2.0);
  const [leverage, setLeverage] = useState<number>(5);
  const [priceShockPct, setPriceShockPct] = useState<number>(-8); // -8% shock

  const simulatedMark = markPrice * (1 + priceShockPct / 100);
  const notional = size * markPrice;
  const initialMargin = notional / leverage;
  const maintenanceMargin = initialMargin * 0.5; // 50% MM

  // Liquidation price calculation for long
  const liqPrice = markPrice * (1 - 0.9 / leverage);
  const simulatedPnl = size * (simulatedMark - markPrice);
  const simulatedEquity = initialMargin + simulatedPnl;
  const simulatedMarginRatio = (simulatedEquity / (size * simulatedMark)) * 100;
  const isLiquidated = simulatedEquity <= maintenanceMargin;

  // Continuous funding drag estimate (assuming ~8.5% APR)
  const fundingDrag1h = (notional * 0.085) / (365 * 24);
  const fundingDrag24h = (notional * 0.085) / 365;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-sunrise/20 text-sunrise-light">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-sunrise-light font-bold">
            Pre-Trade Risk Simulator
          </span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white">
          Liquidation Coach & Volatility Stress-Tester
        </h1>
        <p className="text-sm text-coolgray-300 mt-1 font-light">
          Simulate market shockwaves and per-block funding drag before placing capital on MarginVault.sol.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sliders Input */}
        <div className="md:col-span-5 p-6 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="text-sm font-mono uppercase text-coolgray-400 font-bold">
            Position Parameters
          </h3>

          <div>
            <div className="flex justify-between text-xs font-mono text-coolgray-300 mb-1">
              <span>Position Size:</span>
              <span className="text-white font-bold">{size} ETH</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-teal-bright cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-coolgray-300 mb-1">
              <span>Selected Leverage:</span>
              <span className="text-teal-bright font-bold">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max={creditProfile.maxLeverage}
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full accent-teal-bright cursor-pointer"
            />
            <span className="text-[10px] font-mono text-coolgray-500 mt-1 block">
              Capped by your {creditProfile.tier} credit tier ({creditProfile.maxLeverage}x)
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-coolgray-300 mb-1">
              <span>Market Price Shock:</span>
              <span className={priceShockPct >= 0 ? 'text-teal-bright font-bold' : 'text-coral font-bold'}>
                {priceShockPct >= 0 ? '+' : ''}{priceShockPct}%
              </span>
            </div>
            <input
              type="range"
              min="-35"
              max="35"
              step="1"
              value={priceShockPct}
              onChange={(e) => setPriceShockPct(Number(e.target.value))}
              className="w-full accent-coral cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-background-deep border border-white/5 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-coolgray-400">
              <span>Initial Margin:</span>
              <span className="text-white">${initialMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-coolgray-400">
              <span>Liquidation Price:</span>
              <span className="text-coral font-bold">${liqPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Real-Time Stress Test Output */}
        <div className="md:col-span-7 space-y-6">
          
          <div className={`p-6 rounded-3xl glass-panel border transition-all ${
            isLiquidated ? 'border-2 border-coral shadow-2xl bg-coral/10' : 'border border-white/10'
          }`}>
            <span className="text-xs font-mono text-coolgray-400 uppercase">Stress Test Outcome</span>
            
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-3xl font-mono font-bold text-white">
                  ${simulatedMark.toFixed(2)}
                </div>
                <span className="text-xs font-mono text-coolgray-400">Simulated Shock Price</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-xs font-mono font-bold ${
                isLiquidated ? 'bg-coral text-white animate-pulse' : 'bg-teal/20 text-teal-bright border border-teal/40'
              }`}>
                {isLiquidated ? 'LIQUIDATION TRIGGERED' : 'POSITION SAFE'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-coolgray-400 block mb-0.5">Simulated Equity:</span>
                <span className={`text-lg font-bold ${simulatedEquity > 0 ? 'text-white' : 'text-coral'}`}>
                  ${Math.max(0, simulatedEquity).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-coolgray-400 block mb-0.5">Post-Shock Margin Ratio:</span>
                <span className={`text-lg font-bold ${simulatedMarginRatio > 10 ? 'text-teal-bright' : 'text-coral'}`}>
                  {Math.max(0, simulatedMarginRatio).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Continuous Per-Block Funding Drag */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sunrise-light" />
              <h3 className="text-sm font-mono uppercase text-white font-bold">
                Per-Block Funding Drag Projections
              </h3>
            </div>
            <p className="text-xs text-coolgray-400 font-light">
              Because BlockPerp continuous funding accrues per block (~1.5s), your cost of carry is fully predictable with zero 8h spikes.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-background-deep border border-white/5">
                <span className="text-coolgray-400 block mb-1">1-Hour Carry Drag:</span>
                <span className="text-sunrise-light font-bold">~${fundingDrag1h.toFixed(4)} USD</span>
              </div>
              <div className="p-3 rounded-xl bg-background-deep border border-white/5">
                <span className="text-coolgray-400 block mb-1">24-Hour Cumulative Drag:</span>
                <span className="text-sunrise-light font-bold">~${fundingDrag24h.toFixed(3)} USD</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
