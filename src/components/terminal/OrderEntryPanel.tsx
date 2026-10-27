'use client';

import React, { useState } from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2, AlertCircle, Wallet } from 'lucide-react';
import { OrderSide, OrderType } from '@/lib/types';

export default function OrderEntryPanel() {
  const { markPrice, creditProfile, placeOrder, traderProfile } = useBlockPerpStore();

  const [side, setSide] = useState<OrderSide>('BUY');
  const [type, setType] = useState<OrderType>('MARKET');
  const [sizeEth, setSizeEth] = useState<string>('1.5');
  const [limitPrice, setLimitPrice] = useState<string>(markPrice.toFixed(2));
  const [leverage, setLeverage] = useState<number>(Math.min(5, traderProfile.maxLeverage));
  const [loading, setLoading] = useState(false);
  const [lastTxSuccess, setLastTxSuccess] = useState<string | null>(null);

  const numSize = parseFloat(sizeEth) || 0;
  const executionPrice = type === 'MARKET' ? markPrice : (parseFloat(limitPrice) || markPrice);
  const notional = numSize * executionPrice;
  const requiredMargin = leverage > 0 ? notional / leverage : 0;
  
  const estLiqPrice = side === 'BUY'
    ? executionPrice * (1 - 0.9 / leverage)
    : executionPrice * (1 + 0.9 / leverage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (numSize <= 0) return;

    setLoading(true);
    setLastTxSuccess(null);
    try {
      const receipt = await placeOrder({
        side,
        type,
        size: numSize,
        price: executionPrice,
        leverage,
      });
      setLastTxSuccess(`Order executed on OrderBook.sol at block #${receipt.blockNumber}!`);
      setTimeout(() => setLastTxSuccess(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
      <div>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-semibold text-white text-sm">PLACE ORDER</span>
            <span className="text-[10px] font-mono text-coolgray-400">({traderProfile.name})</span>
          </div>
          {/* Credit Tier Benefit Badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal/15 border border-teal/30 text-[10px] font-mono text-teal-bright">
            <ShieldCheck className="w-3 h-3" />
            <span>Tier {traderProfile.tier}: {traderProfile.maxLeverage}x Max</span>
          </div>
        </div>

        {/* Long / Short Switcher */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-background-deep border border-white/5">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-lg font-bold text-xs font-mono transition-all ${
              side === 'BUY'
                ? 'bg-teal-bright text-background-deep shadow-teal-glow'
                : 'text-coolgray-400 hover:text-white'
            }`}
          >
            LONG (BUY)
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-lg font-bold text-xs font-mono transition-all ${
              side === 'SELL'
                ? 'bg-coral text-white'
                : 'text-coolgray-400 hover:text-white'
            }`}
          >
            SHORT (SELL)
          </button>
        </div>

        {/* Order Type: Market / Limit */}
        <div className="flex items-center gap-4 mt-3 text-xs font-mono text-coolgray-400">
          <button
            type="button"
            onClick={() => setType('MARKET')}
            className={`pb-1 border-b-2 transition-colors ${
              type === 'MARKET' ? 'border-teal-bright text-teal-bright font-bold' : 'border-transparent hover:text-white'
            }`}
          >
            Market
          </button>
          <button
            type="button"
            onClick={() => setType('LIMIT')}
            className={`pb-1 border-b-2 transition-colors ${
              type === 'LIMIT' ? 'border-teal-bright text-teal-bright font-bold' : 'border-transparent hover:text-white'
            }`}
          >
            Limit
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          
          {type === 'LIMIT' && (
            <div>
              <label className="text-[11px] font-mono text-coolgray-400 block mb-1">Limit Price (USD)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background-deep border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-teal-bright"
                />
                <span className="absolute right-3 top-2.5 text-xs text-coolgray-500 font-mono">USD</span>
              </div>
            </div>
          )}

          {/* Size */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-coolgray-400 mb-1">
              <span>Order Size</span>
              <span>Vault: ${traderProfile.collateralUsd.toLocaleString()}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={sizeEth}
                onChange={(e) => setSizeEth(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background-deep border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-teal-bright"
              />
              <span className="absolute right-3 top-2.5 text-xs text-coolgray-400 font-mono">ETH</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {['0.5', '1.0', '2.5', '5.0'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSizeEth(preset)}
                  className="py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-coolgray-300"
                >
                  {preset} ETH
                </button>
              ))}
            </div>
          </div>

          {/* Leverage Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-mono text-coolgray-400 mb-1">
              <span>Leverage</span>
              <span className="text-white font-bold">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max={traderProfile.maxLeverage}
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full accent-teal-bright cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-coolgray-500 mt-1">
              <span>1x</span>
              <span>{Math.floor(traderProfile.maxLeverage / 2)}x</span>
              <span className="text-sunrise-light">{traderProfile.maxLeverage}x (Tier Max)</span>
            </div>
          </div>

          {/* Execution Specs & Margin Breakdown */}
          <div className="p-3 rounded-xl bg-background-deep/70 border border-white/5 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-coolgray-400">
              <span>Notional Value:</span>
              <span className="text-white">${notional.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-coolgray-400">
              <span>Required Margin:</span>
              <span className="text-teal-bright font-bold">${requiredMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-coolgray-400">
              <span>Est. Liq Price:</span>
              <span className="text-coral font-bold">${estLiqPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Success Flash Toast */}
          {lastTxSuccess && (
            <div className="p-2 rounded-lg bg-teal/20 border border-teal-bright/40 text-teal-bright text-xs font-mono flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{lastTxSuccess}</span>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading || numSize <= 0}
            className={`w-full py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
              side === 'BUY'
                ? 'bg-gradient-to-r from-teal-bright to-teal text-background-deep hover:brightness-110 shadow-teal-glow'
                : 'bg-gradient-to-r from-coral to-coral-dim text-white hover:brightness-110'
            }`}
          >
            {loading ? (
              <span>Submitting to EVM...</span>
            ) : (
              <>
                <span>{side === 'BUY' ? 'OPEN LONG' : 'OPEN SHORT'}</span>
                <span className="text-xs font-mono opacity-80">({leverage}x)</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
