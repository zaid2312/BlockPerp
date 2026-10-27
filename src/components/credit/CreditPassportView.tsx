'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBlockPerpStore } from '@/lib/store';
import { CreditTierName } from '@/lib/types';
import { 
  ShieldCheck, 
  Mountain, 
  ExternalLink, 
  Sliders, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  TrendingUp,
  Cpu,
  User
} from 'lucide-react';

export default function CreditPassportView() {
  const { creditProfile, traderProfile, setTraderProfile } = useBlockPerpStore();
  const [whatIfVolume, setWhatIfVolume] = useState<number>(185000);
  const [whatIfRepayments, setWhatIfRepayments] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Compute what-if simulation tier
  let simulatedTier: CreditTierName = 'Basecamp';
  if (whatIfVolume > 500000 && whatIfRepayments === 0) simulatedTier = 'Summit';
  else if (whatIfVolume > 50000) simulatedTier = 'Ridge';

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-teal/20 text-teal-bright">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-bright font-bold">
              Verifiable Onchain Credit Architecture
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Credit Passport: <span className="text-teal-bright">{traderProfile.name}</span>
          </h1>
          <p className="text-sm text-coolgray-300 mt-1 max-w-2xl font-light">
            BlockPerp reads historical Ethereum mainnet volume and liquidation discipline to assign your margin tier. 
            Zero KYC, zero black-box credit agencies.
          </p>
        </div>

        {/* Change Account Shortcut */}
        <Link
          href="/login"
          className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-all"
        >
          <User className="w-3.5 h-3.5 text-teal-bright" />
          <span>Switch Trader Profile</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Shareable Credit Passport Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl glass-panel border-2 border-teal-bright/40 shadow-teal-glow relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-10 pointer-events-none text-teal-bright">
              <Mountain className="w-full h-full" />
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-bright/20 border border-teal-bright/40 flex items-center justify-center text-teal-bright font-bold text-xs">
                  BP
                </div>
                <div>
                  <span className="font-display font-bold text-white text-sm block">BLOCKPERP PASSPORT</span>
                  <span className="text-[9px] font-mono text-coolgray-400">CREDENTIAL: {traderProfile.name}</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal/20 text-teal-bright border border-teal/40">
                VERIFIED
              </span>
            </div>

            {/* Elevation & Tier Spotlight */}
            <div className="my-6 text-center">
              <span className="text-[11px] font-mono text-coolgray-400 uppercase tracking-widest block">
                Mountain Elevation Tier
              </span>
              <div className="text-4xl font-display font-extrabold text-white mt-1 flex items-center justify-center gap-2">
                <span>Tier {traderProfile.tier}</span>
                <Sparkles className="w-6 h-6 text-sunrise-light" />
              </div>
              <div className="text-sm font-mono text-sunrise-light mt-1 font-bold">
                {traderProfile.elevationMeters.toLocaleString()}m Altitude
              </div>
            </div>

            {/* Passport Perks Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-background-deep/80 border border-white/5 text-xs font-mono">
              <div>
                <span className="text-[10px] text-coolgray-400 uppercase block">Max Permitted Leverage</span>
                <span className="text-lg font-bold text-teal-bright">{traderProfile.maxLeverage}x Max</span>
              </div>
              <div>
                <span className="text-[10px] text-coolgray-400 uppercase block">Initial Margin Requirement</span>
                <span className="text-lg font-bold text-white">{traderProfile.initialMarginReq}%</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/5">
                <span className="text-[10px] text-coolgray-400 uppercase block">Attested Address:</span>
                <span className="text-xs text-coolgray-200">{traderProfile.address}</span>
              </div>
            </div>

            {/* Attestation Hash */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-coolgray-400">
              <span className="truncate max-w-[200px]">Hash: {creditProfile.attestationHash}</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-teal-bright hover:underline"
              >
                <Share2 className="w-3 h-3" />
                <span>{copied ? 'Copied Link!' : 'Share Passport'}</span>
              </button>
            </div>
          </div>

          {/* "What Improves My Tier" What-if Simulator Slider */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sunrise-light" />
              <h3 className="text-sm font-display font-bold text-white uppercase">
                What-If Tier Simulation Engine
              </h3>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-coolgray-400 mb-1">
                <span>Simulated Volume:</span>
                <span className="text-white font-bold">${whatIfVolume.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="25000"
                value={whatIfVolume}
                onChange={(e) => setWhatIfVolume(Number(e.target.value))}
                className="w-full accent-sunrise cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-coolgray-400 mb-1">
                <span>Historical Liquidations:</span>
                <span className={whatIfRepayments === 0 ? 'text-teal-bright font-bold' : 'text-coral font-bold'}>
                  {whatIfRepayments} defaults
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={whatIfRepayments}
                onChange={(e) => setWhatIfRepayments(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-background-deep border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-coolgray-400">Simulated Result:</span>
              <span className="font-bold text-sunrise-light">
                Tier {simulatedTier} ({simulatedTier === 'Summit' ? '20x' : simulatedTier === 'Ridge' ? '8x' : '3x'} Leverage)
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Onchain Verified Signal Rings */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-display font-bold text-white">
              Transparent Scoring Signals (CreditRisk.sol)
            </h3>
            <span className="text-xs font-mono text-coolgray-400">
              Ethereum Mainnet Archive
            </span>
          </div>

          <div className="space-y-4">
            {creditProfile.signals.map((sig, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-teal/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{sig.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-coolgray-300">
                      Weight: {sig.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-coolgray-400 mt-1 font-light">{sig.description}</p>
                  <div className="text-[10px] font-mono text-teal-bright mt-2 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Source: {sig.source}</span>
                  </div>
                </div>

                <div className="text-right sm:min-w-[140px] pl-4 sm:border-l border-white/10">
                  <div className="text-lg font-mono font-bold text-white">{sig.value}</div>
                  <div className="w-full bg-background-deep h-2 rounded-full mt-2 overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-teal to-teal-bright h-full transition-all duration-500"
                      style={{ width: `${sig.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-teal-bright mt-1 block">
                    {sig.score}/100 Confidence
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-surface/80 border border-white/10 text-xs text-coolgray-300 font-mono flex items-start gap-3">
            <Cpu className="w-4 h-4 text-sunrise-light shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Architecture Notice:</strong> Testnet wallets have zero natural transaction history. 
              BlockPerp computes signals from read-only Ethereum mainnet archive state; our relayer attests the tier hash directly to the testnet <code className="text-teal-bright">CreditRisk.sol</code> contract.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
