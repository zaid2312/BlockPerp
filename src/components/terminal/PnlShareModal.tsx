'use client';

import React, { useState } from 'react';
import { Position } from '@/lib/types';
import { useBlockPerpStore } from '@/lib/store';
import { X, Share2, Copy, CheckCircle2, Mountain, Sparkles } from 'lucide-react';

export default function PnlShareModal({ 
  position, 
  onClose 
}: { 
  position: Position | null; 
  onClose: () => void 
}) {
  const { traderProfile, currentBlock } = useBlockPerpStore();
  const [copied, setCopied] = useState(false);

  if (!position) return null;

  const isProfitable = position.unrealizedPnl >= 0;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-deep/80 backdrop-blur-md animate-in fade-in">
      <div className="relative max-w-md w-full p-6 rounded-3xl glass-panel-elevated border-2 border-teal-bright/50 shadow-2xl overflow-hidden font-mono">
        
        {/* Background Mountain Motif */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 pointer-events-none text-teal-bright">
          <Mountain className="w-full h-full" />
        </div>

        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] text-teal-bright uppercase tracking-widest font-bold">
              BLOCKPERP TRADING RECEIPT
            </span>
            <h3 className="text-lg font-display font-bold text-white mt-0.5">
              {traderProfile.name}'s Position
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-coolgray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PnL Main Callout */}
        <div className="my-6 text-center">
          <span className="text-xs text-coolgray-400 uppercase">Unrealized PnL</span>
          <div className={`text-4xl font-extrabold mt-1 ${isProfitable ? 'text-teal-bright' : 'text-coral'}`}>
            {isProfitable ? '+' : ''}{position.unrealizedPnlPercent.toFixed(2)}%
          </div>
          <div className={`text-base font-bold mt-0.5 ${isProfitable ? 'text-teal-bright/90' : 'text-coral/90'}`}>
            {isProfitable ? '+' : ''}${position.unrealizedPnl.toFixed(2)} USD
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-background-deep border border-white/5 text-xs">
          <div>
            <span className="text-[10px] text-coolgray-400 block uppercase">Market & Side</span>
            <span className="text-white font-bold">{position.symbol} {position.side} {position.leverage}x</span>
          </div>
          <div>
            <span className="text-[10px] text-coolgray-400 block uppercase">Position Size</span>
            <span className="text-white font-bold">{position.size.toFixed(2)} ETH</span>
          </div>
          <div>
            <span className="text-[10px] text-coolgray-400 block uppercase">Entry Price</span>
            <span className="text-coolgray-300">${position.entryPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-coolgray-400 block uppercase">Mark Price</span>
            <span className="text-teal-bright font-bold">${position.markPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-coolgray-400">
          <span>Settled on Block #{currentBlock}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-teal-bright hover:underline font-bold"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Card Link!' : 'Share Win'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
