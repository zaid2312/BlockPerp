'use client';

import React from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { Activity, Clock, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BlockHeartbeat() {
  const { fundingBlocks, cumulativeIndex, annualizedFundingRate, markPrice, indexPrice, currentBlock } = useBlockPerpStore();

  return (
    <div className="p-6 rounded-3xl glass-panel-elevated border border-white/10 shadow-glass">
      
      {/* Title & Live Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sunrise/20 text-sunrise-light border border-sunrise/30">
              <Activity className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-display font-bold text-white">
              The Real-Time Block Heartbeat
            </h2>
          </div>
          <p className="text-xs text-coolgray-300 mt-1">
            Every block mined updates the cumulative index on <code className="text-teal-bright">FundingEngine.sol</code>. Zero 8-hour cliff spikes.
          </p>
        </div>

        {/* Global Key Stats */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-background-deep/80 border border-white/5">
            <span className="text-[10px] text-coolgray-400 block uppercase">Cumulative Index</span>
            <span className="text-teal-bright font-bold text-sm">{cumulativeIndex.toFixed(6)}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-background-deep/80 border border-white/5">
            <span className="text-[10px] text-coolgray-400 block uppercase">Continuous APR</span>
            <span className="text-sunrise-light font-bold text-sm">
              {annualizedFundingRate >= 0 ? '+' : ''}{annualizedFundingRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Chain of Live Blocks Scrolling in Real-Time */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-mono text-coolgray-400 mb-3">
          <span>Live EVM Chain Stream (Left = Latest Mined)</span>
          <span className="text-teal-bright flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-bright animate-ping" />
            Sub-second polling
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar">
          {fundingBlocks.map((block, idx) => {
            const isLatest = idx === 0;
            const isPremiumPositive = block.premium >= 0;

            return (
              <div
                key={block.blockNumber}
                className={`shrink-0 w-64 p-4 rounded-2xl glass-panel transition-all duration-300 relative ${
                  isLatest
                    ? 'border-2 border-teal-bright shadow-teal-glow bg-surface/90'
                    : 'border border-white/10 bg-background-deep/70 opacity-85'
                }`}
              >
                {/* Block Number Tag */}
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={`font-bold ${isLatest ? 'text-teal-bright' : 'text-white'}`}>
                    BLOCK #{block.blockNumber}
                  </span>
                  <span className="text-[10px] text-coolgray-500">{block.hash}</span>
                </div>

                {/* Mark vs Index */}
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-coolgray-400">
                    <span>Mark:</span>
                    <span className="text-white">${block.markPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-coolgray-400">
                    <span>Index:</span>
                    <span className="text-coolgray-300">${block.indexPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span>Premium:</span>
                    <span className={`font-bold ${isPremiumPositive ? 'text-teal-bright' : 'text-coral'}`}>
                      {isPremiumPositive ? '+' : ''}{(block.premium * 100).toFixed(4)}%
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-[10px] text-coolgray-400">
                    <span>Δ cumIndex:</span>
                    <span className="text-sunrise-light">+{block.blockFundingRate.toFixed(8)}</span>
                  </div>
                </div>

                {isLatest && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-teal-bright">
                    <span>Current Active Block</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
