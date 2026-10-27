'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlockPerpStore } from '@/lib/store';
import { CreditTierName } from '@/lib/types';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import { 
  User, 
  Wallet, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { traderProfile, setTraderProfile } = useBlockPerpStore();

  const [name, setName] = useState(traderProfile.name);
  const [address, setAddress] = useState(traderProfile.address);
  const [collateral, setCollateral] = useState(traderProfile.collateralUsd.toString());
  const [selectedTier, setSelectedTier] = useState<CreditTierName>(traderProfile.tier);
  const [saved, setSaved] = useState(false);

  const generateRandomAddress = () => {
    const randomHex = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setAddress(randomHex);
  };

  const handleSaveAndEnter = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCollateral = parseFloat(collateral) || 10000;

    setTraderProfile({
      name: name.trim() || 'AnonymousTrader',
      address: address.trim() || '0x71C6615b130a1334E27A598aDf0DE393A33e7C28',
      collateralUsd: parsedCollateral,
      tier: selectedTier,
      elevationMeters: selectedTier === 'Summit' ? 8848 : selectedTier === 'Ridge' ? 7400 : 5364,
      compositeScore: selectedTier === 'Summit' ? 940 : selectedTier === 'Ridge' ? 780 : 450,
      maxLeverage: selectedTier === 'Summit' ? 20 : selectedTier === 'Ridge' ? 8 : 3,
      initialMarginReq: selectedTier === 'Summit' ? 5 : selectedTier === 'Ridge' ? 12.5 : 33.3,
    });

    setSaved(true);
    setTimeout(() => {
      router.push('/trade');
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center p-4 py-12">
      <MountainHeroBackground isSubtle={true} />

      <div className="relative z-10 max-w-xl w-full">
        <div className="p-8 rounded-3xl glass-panel-elevated border-2 border-teal-bright/40 shadow-2xl">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-white/10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal/20 text-teal-bright border border-teal/40 mb-3 shadow-teal-glow">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">
              Trader Identity & Account Setup
            </h1>
            <p className="text-xs text-coolgray-400 mt-1">
              Customize your trading persona. All terminal orders, margin terms, and receipts will adapt dynamically.
            </p>
          </div>

          <form onSubmit={handleSaveAndEnter} className="mt-6 space-y-4 font-mono text-xs">
            
            {/* Trader Handle / Name */}
            <div>
              <label className="text-coolgray-300 block mb-1.5 font-semibold">
                Trader Handle / Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SatoshiTrader, AlphaRisk, Rajnish"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background-deep border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-teal-bright"
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-coolgray-300 font-semibold">EVM Wallet Address</label>
                <button
                  type="button"
                  onClick={generateRandomAddress}
                  className="text-[10px] text-teal-bright hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Generate New Address</span>
                </button>
              </div>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-deep border border-white/10 text-coolgray-200 font-mono text-xs focus:outline-none focus:border-teal-bright"
              />
            </div>

            {/* Initial Collateral Balance */}
            <div>
              <label className="text-coolgray-300 block mb-1.5 font-semibold">
                Initial Margin Collateral (USDC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  step="500"
                  required
                  value={collateral}
                  onChange={(e) => setCollateral(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background-deep border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-teal-bright pl-8"
                />
                <span className="absolute left-3 top-3 text-coolgray-400 font-bold">$</span>
                <span className="absolute right-3 top-3 text-xs text-coolgray-400">USDC</span>
              </div>
            </div>

            {/* Credit Persona Tier Selection */}
            <div>
              <label className="text-coolgray-300 block mb-1.5 font-semibold">
                Onchain Credit Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { tier: 'Basecamp', lev: '3x Max', desc: '5,364m' },
                  { tier: 'Ridge', lev: '8x Max', desc: '7,400m' },
                  { tier: 'Summit', lev: '20x Max', desc: '8,848m' },
                ].map((item) => {
                  const isSelected = selectedTier === item.tier;
                  return (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setSelectedTier(item.tier as CreditTierName)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-teal/20 border-teal-bright text-white shadow-teal-glow'
                          : 'bg-background-deep border-white/10 text-coolgray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{item.tier}</div>
                      <div className="text-[11px] text-teal-bright font-bold mt-0.5">{item.lev}</div>
                      <div className="text-[10px] text-coolgray-500 mt-1">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Profile Preview Pill */}
            <div className="p-3.5 rounded-xl bg-background-deep border border-white/10 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-coolgray-400 text-[10px] uppercase block">Active Identity:</span>
                <span className="text-white font-bold">{name || 'Anonymous'}</span>
                <span className="text-[10px] text-coolgray-400 ml-2">({selectedTier} • {selectedTier === 'Summit' ? '20x' : selectedTier === 'Ridge' ? '8x' : '3x'})</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-coolgray-400 uppercase block">Collateral:</span>
                <span className="text-teal-bright font-bold">${parseFloat(collateral || '0').toLocaleString()}</span>
              </div>
            </div>

            {/* Submit & Enter */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-teal-bright to-teal text-background-deep shadow-teal-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-background-deep" />
                  <span>Profile Loaded! Entering Terminal...</span>
                </>
              ) : (
                <>
                  <span>Save Profile & Launch Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
