'use client';

import React from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FundingFormulaCard() {
  const { markPrice, indexPrice, premium, cumulativeIndex, currentBlock, positions } = useBlockPerpStore();

  const userPosition = positions[0];
  const size = userPosition ? userPosition.size : 2.5;
  const isLong = userPosition ? userPosition.side === 'LONG' : true;
  
  // Calculate live values
  const rawPremium = (markPrice - indexPrice) / indexPrice;
  const clampedPremium = Math.max(-0.0005, Math.min(0.0005, rawPremium));
  const deltaCumIndex = clampedPremium / 50000;
  const blockFee = size * deltaCumIndex * markPrice;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 mt-6">
      
      <div className="flex items-center gap-2 pb-4 border-b border-white/10">
        <div className="p-2 rounded-lg bg-sunrise/20 text-sunrise-light">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-white">
            The Verifiable Onchain Funding Formula
          </h3>
          <p className="text-xs text-coolgray-400">
            Live evaluation of <code className="text-sunrise-light">FundingEngine.sol</code> state variables for block #{currentBlock}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* Step 1: Premium Formula */}
        <div className="p-4 rounded-2xl bg-background-deep/80 border border-white/5 font-mono text-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-coolgray-400 uppercase font-semibold">1. Mark vs Index Premium</span>
            <div className="p-2.5 rounded-lg bg-white/5 text-sunrise-light font-bold mt-2 text-center text-sm">
              premium = (mark - index) / index
            </div>
            <div className="space-y-1.5 mt-3 text-coolgray-300">
              <div className="flex justify-between">
                <span>Mark Price:</span>
                <span className="text-teal-bright">${markPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Index Price:</span>
                <span className="text-coolgray-200">${indexPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex justify-between font-bold">
            <span className="text-coolgray-400">Current Premium:</span>
            <span className={rawPremium >= 0 ? 'text-teal-bright' : 'text-coral'}>
              {rawPremium >= 0 ? '+' : ''}{(rawPremium * 100).toFixed(4)}%
            </span>
          </div>
        </div>

        {/* Step 2: Cumulative Index Accrual */}
        <div className="p-4 rounded-2xl bg-background-deep/80 border border-white/5 font-mono text-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-coolgray-400 uppercase font-semibold">2. Block Index Integration</span>
            <div className="p-2.5 rounded-lg bg-white/5 text-teal-bright font-bold mt-2 text-center text-sm">
              cumIndex += clamp(premium) * blocks / period
            </div>
            <div className="space-y-1.5 mt-3 text-coolgray-300">
              <div className="flex justify-between">
                <span>Clamped Bound:</span>
                <span className="text-coolgray-200">±0.05% max</span>
              </div>
              <div className="flex justify-between">
                <span>Δ cumIndex:</span>
                <span className="text-sunrise-light">+{deltaCumIndex.toFixed(9)}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex justify-between font-bold">
            <span className="text-coolgray-400">Global cumIndex:</span>
            <span className="text-teal-bright">{cumulativeIndex.toFixed(6)}</span>
          </div>
        </div>

        {/* Step 3: Position Cashflow */}
        <div className="p-4 rounded-2xl bg-background-deep/80 border border-white/5 font-mono text-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-coolgray-400 uppercase font-semibold">3. Position Settlement</span>
            <div className="p-2.5 rounded-lg bg-white/5 text-sunrise font-bold mt-2 text-center text-sm">
              pays/receives = size * Δ cumIndex
            </div>
            <div className="space-y-1.5 mt-3 text-coolgray-300">
              <div className="flex justify-between">
                <span>Position Size:</span>
                <span className="text-white">{size.toFixed(2)} ETH ({isLong ? 'LONG' : 'SHORT'})</span>
              </div>
              <div className="flex justify-between">
                <span>Direction:</span>
                <span className="text-coolgray-200">{rawPremium >= 0 ? 'Longs pay Shorts' : 'Shorts pay Longs'}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 flex justify-between font-bold">
            <span className="text-coolgray-400">Cashflow / Block:</span>
            <span className={blockFee >= 0 ? 'text-coral' : 'text-teal-bright'}>
              {blockFee >= 0 ? '-' : '+'}${Math.abs(blockFee).toFixed(5)} USD
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
