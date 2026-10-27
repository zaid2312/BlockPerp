'use client';

import React from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { AlertTriangle, ShieldCheck, CheckCircle2, X, ExternalLink } from 'lucide-react';

export default function LiquidationModal() {
  const { liquidationModalOpen, setLiquidationModalOpen, currentBlock, receipts } = useBlockPerpStore();

  if (!liquidationModalOpen) return null;

  const latestReceipt = receipts.find(r => r.action === 'LIQUIDATION') || receipts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-deep/85 backdrop-blur-md animate-in fade-in">
      
      {/* Red pulse perimeter glow */}
      <div className="absolute inset-0 border-4 border-coral/40 animate-pulse pointer-events-none" />

      <div className="relative max-w-lg w-full p-6 rounded-3xl glass-panel-elevated border-2 border-coral shadow-2xl overflow-hidden">
        
        {/* Avalanche graphic banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-coral via-sunrise to-coral" />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-coral/20 text-coral border border-coral/40">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-coral/20 text-coral border border-coral/30">
                Liquidator.sol Triggered
              </span>
              <h3 className="text-lg font-display font-bold text-white mt-1">
                Avalanche Liquidation Moment
              </h3>
            </div>
          </div>
          <button
            onClick={() => setLiquidationModalOpen(false)}
            className="text-coolgray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-coolgray-300 mt-4 leading-relaxed font-light">
          The trader margin fell below the maintenance threshold. 
          The decentralized keeper bot triggered <code className="text-coral">liquidatePosition()</code> onchain. 
          Zero socialized loss occurred—the insurance fund and keeper bounty settled in block #{currentBlock}.
        </p>

        {/* Verifiable Execution Receipt Box */}
        <div className="mt-5 p-4 rounded-2xl bg-background-deep/90 border border-white/10 text-xs font-mono space-y-2">
          <div className="flex justify-between text-coolgray-400">
            <span>Keeper Execution Tx:</span>
            <span className="text-teal-bright">{latestReceipt?.hash.slice(0, 16)}...</span>
          </div>
          <div className="flex justify-between text-coolgray-400">
            <span>Block Number:</span>
            <span className="text-white font-bold">#{latestReceipt?.blockNumber}</span>
          </div>
          <div className="flex justify-between text-coolgray-400">
            <span>Gas Consumed:</span>
            <span className="text-coolgray-200">{latestReceipt?.gasUsed.toLocaleString()} gwei</span>
          </div>
          <div className="flex justify-between text-coolgray-400">
            <span>Insurance Fund Delta:</span>
            <span className="text-coral font-bold">-$163.04 (Absorbed safely)</span>
          </div>
          <div className="flex justify-between text-coolgray-400">
            <span>Keeper Bounty Payout:</span>
            <span className="text-sunrise-light font-bold">+$45.20 USDC</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => setLiquidationModalOpen(false)}
            className="w-full py-2.5 rounded-xl text-xs font-mono font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Dismiss Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
