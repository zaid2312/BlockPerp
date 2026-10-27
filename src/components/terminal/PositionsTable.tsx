'use client';

import React, { useState } from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { Position } from '@/lib/types';
import PnlShareModal from './PnlShareModal';
import { ShieldAlert, RefreshCw, X, TrendingUp, TrendingDown, AlertTriangle, Share2 } from 'lucide-react';

export default function PositionsTable() {
  const { positions, closePosition, triggerSimulatedLiquidation, currentBlock, traderProfile } = useBlockPerpStore();
  const [selectedSharePos, setSelectedSharePos] = useState<Position | null>(null);

  return (
    <div className="p-4 rounded-2xl glass-panel border border-white/10 mt-6">
      
      {/* Table Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-white text-sm">ACTIVE POSITIONS</span>
          <span className="px-2 py-0.5 rounded-full bg-teal/15 text-teal-bright text-xs font-mono">
            {positions.length} Open
          </span>
          <span className="text-[11px] font-mono text-coolgray-400">({traderProfile.name})</span>
        </div>

        {/* Dramatic Liquidation Demo Trigger */}
        <button
          onClick={triggerSimulatedLiquidation}
          disabled={positions.length === 0}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-coral/15 text-coral hover:bg-coral/25 border border-coral/30 transition-all disabled:opacity-40"
          title="Demonstrate Liquidator.sol keeper execution & avalanche UI collapse"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Simulate Avalanche / Liquidation</span>
        </button>
      </div>

      {positions.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-coolgray-500">
          No open positions on MarginVault.sol. Use the order panel above to open a position.
        </div>
      ) : (
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-coolgray-400 uppercase border-b border-white/5 pb-2">
                <th className="py-2">Market</th>
                <th className="py-2">Size</th>
                <th className="py-2">Entry Price</th>
                <th className="py-2">Mark Price</th>
                <th className="py-2">Liq Price</th>
                <th className="py-2">Margin Ratio</th>
                <th className="py-2">Accrued Funding</th>
                <th className="py-2">Unrealized PnL</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {positions.map((pos) => {
                const isProfitable = pos.unrealizedPnl >= 0;
                
                const healthColor = pos.marginRatio > 10 
                  ? 'bg-teal-bright' 
                  : pos.marginRatio > 5 
                  ? 'bg-sunrise' 
                  : 'bg-coral animate-pulse';

                return (
                  <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Market & Side */}
                    <td className="py-3 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          pos.side === 'LONG' ? 'bg-teal/20 text-teal-bright' : 'bg-coral/20 text-coral'
                        }`}>
                          {pos.side} {pos.leverage}x
                        </span>
                        <span className="text-white">{pos.symbol}</span>
                      </div>
                    </td>

                    {/* Size */}
                    <td className="py-3 text-coolgray-200">
                      {pos.size.toFixed(2)} ETH
                    </td>

                    {/* Entry Price */}
                    <td className="py-3 text-coolgray-400">
                      ${pos.entryPrice.toFixed(2)}
                    </td>

                    {/* Mark Price */}
                    <td className="py-3 text-teal-bright font-bold">
                      ${pos.markPrice.toFixed(2)}
                    </td>

                    {/* Liq Price */}
                    <td className="py-3 text-coral">
                      ${pos.liquidationPrice.toFixed(2)}
                    </td>

                    {/* Margin Ratio Bar */}
                    <td className="py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-background-deep h-1.5 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full ${healthColor}`}
                            style={{ width: `${Math.min(100, pos.marginRatio * 5)}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-coolgray-300 font-bold">{pos.marginRatio.toFixed(1)}%</span>
                      </div>
                    </td>

                    {/* Accrued Funding */}
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-[11px] font-bold ${pos.accruedFunding >= 0 ? 'text-teal-bright' : 'text-sunrise-light'}`}>
                          {pos.accruedFunding >= 0 ? '+' : ''}${pos.accruedFunding.toFixed(4)}
                        </span>
                        <span className="text-[9px] text-coolgray-500">/block</span>
                      </div>
                    </td>

                    {/* Unrealized PnL */}
                    <td className="py-3">
                      <div className="flex flex-col">
                        <span className={`font-bold ${isProfitable ? 'text-teal-bright' : 'text-coral'}`}>
                          {isProfitable ? '+' : ''}${pos.unrealizedPnl.toFixed(2)}
                        </span>
                        <span className={`text-[10px] ${isProfitable ? 'text-teal-bright/70' : 'text-coral/70'}`}>
                          {isProfitable ? '+' : ''}{pos.unrealizedPnlPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>

                    {/* Actions: Share PnL & Close */}
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedSharePos(pos)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-teal-bright border border-white/10 text-[11px] transition-colors"
                          title="Share PnL Brag Card"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => closePosition(pos.id)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-coolgray-300 hover:text-white border border-white/10 text-[11px] transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Share Card Modal */}
      <PnlShareModal 
        position={selectedSharePos} 
        onClose={() => setSelectedSharePos(null)} 
      />

    </div>
  );
}
