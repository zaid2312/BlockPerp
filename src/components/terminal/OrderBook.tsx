'use client';

import React from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { Layers, ArrowDown, ArrowUp } from 'lucide-react';

export default function OrderBook() {
  const { bids, asks, markPrice, currentBlock } = useBlockPerpStore();

  const spread = asks[0] && bids[0] ? (asks[0].price - bids[0].price).toFixed(2) : '0.40';

  return (
    <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col h-[480px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 font-display font-semibold text-white text-xs">
          <Layers className="w-3.5 h-3.5 text-teal-bright" />
          <span>ONCHAIN ORDER BOOK</span>
        </div>
        <span className="text-[10px] font-mono text-coolgray-400">OrderBook.sol</span>
      </div>

      {/* Table Column Titles */}
      <div className="grid grid-cols-4 text-[10px] font-mono text-coolgray-500 py-2 border-b border-white/5 uppercase">
        <div>Price ($)</div>
        <div className="text-right">Size (ETH)</div>
        <div className="text-right">Total</div>
        <div className="text-right">Block</div>
      </div>

      {/* Asks (Sells) in reverse order (highest to lowest ask) */}
      <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-0.5 py-1">
        {asks.slice(0, 6).reverse().map((ask, idx) => (
          <div 
            key={`ask-${idx}`}
            className="grid grid-cols-4 text-xs font-mono py-0.5 relative group hover:bg-coral/10 rounded px-1 transition-colors"
          >
            {/* Depth visual bar */}
            <div 
              className="absolute right-0 top-0 bottom-0 bg-coral/15 rounded-r pointer-events-none"
              style={{ width: `${ask.depthPercent}%` }}
            />
            <div className="text-coral font-medium z-10">{ask.price.toFixed(2)}</div>
            <div className="text-right text-coolgray-300 z-10">{ask.size.toFixed(2)}</div>
            <div className="text-right text-coolgray-400 z-10">{ask.total.toFixed(2)}</div>
            <div className="text-right text-[10px] text-coolgray-500 z-10">#{ask.blockNumber % 1000}</div>
          </div>
        ))}
      </div>

      {/* Mid Price & Spread Ribbon */}
      <div className="py-2 my-1 px-3 rounded-lg bg-background-deep/90 border border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-teal-bright">${markPrice.toFixed(2)}</span>
          <ArrowUp className="w-3.5 h-3.5 text-teal-bright" />
        </div>
        <div className="text-[11px] text-coolgray-400">
          Spread: <span className="text-white">${spread}</span>
        </div>
      </div>

      {/* Bids (Buys) */}
      <div className="flex-1 overflow-hidden flex flex-col space-y-0.5 py-1">
        {bids.slice(0, 6).map((bid, idx) => (
          <div 
            key={`bid-${idx}`}
            className="grid grid-cols-4 text-xs font-mono py-0.5 relative group hover:bg-teal/10 rounded px-1 transition-colors"
          >
            {/* Depth visual bar */}
            <div 
              className="absolute right-0 top-0 bottom-0 bg-teal/15 rounded-r pointer-events-none"
              style={{ width: `${bid.depthPercent}%` }}
            />
            <div className="text-teal-bright font-medium z-10">{bid.price.toFixed(2)}</div>
            <div className="text-right text-coolgray-300 z-10">{bid.size.toFixed(2)}</div>
            <div className="text-right text-coolgray-400 z-10">{bid.total.toFixed(2)}</div>
            <div className="text-right text-[10px] text-coolgray-500 z-10">#{bid.blockNumber % 1000}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
