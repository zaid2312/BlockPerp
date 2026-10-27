'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useBlockPerpStore } from '@/lib/store';
import { 
  Play, 
  ChevronRight, 
  X, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Activity, 
  FileText 
} from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Select Verifiable Credit Persona',
    desc: 'BlockPerp does not use a black-box KYC. Credit terms are derived transparently from wallet history (Ethereum mainnet archive) and verified onchain by CreditRisk.sol.',
    target: '/credit',
    actionLabel: 'Inspect Credit Passport',
    icon: ShieldCheck,
  },
  {
    step: 2,
    title: 'Order Placement & Margin Check',
    desc: 'Place an ETH-PERP order. MarginVault.sol locks collateral according to your credit tier (e.g. 8x max for Ridge, 20x for Summit).',
    target: '/trade',
    actionLabel: 'Open Trade Terminal',
    icon: Layers,
  },
  {
    step: 3,
    title: 'Price-Time Onchain OrderBook',
    desc: 'Inspect the live bids and asks. Every single limit and market order is matched transparently onchain and tagged with its exact EVM block number.',
    target: '/trade',
    actionLabel: 'Watch Order Book',
    icon: Sparkles,
  },
  {
    step: 4,
    title: 'Per-Block Funding Heartbeat',
    desc: 'Our key differentiator: funding that moves every block, not every hour. See mark vs index premium calculated and integrated every ~1.5s.',
    target: '/funding',
    actionLabel: 'View Funding Heartbeat',
    icon: Activity,
  },
  {
    step: 5,
    title: 'Historical Funding Time Machine',
    desc: 'Simulate the last 7 days of real ETHUSDT market data. Compare BlockPerp per-block tracking vs Binance 8h and Hyperliquid 1h funding.',
    target: '/funding',
    actionLabel: 'Explore Time Machine',
    icon: Play,
  },
  {
    step: 6,
    title: 'Verify & Order Lifecycle Trace',
    desc: 'Full transparency: Signed → MarginVault check → Credit tier → Match → Fill → Event. Every action produces a verifiable onchain receipt.',
    target: '/verify',
    actionLabel: 'Verify Receipts & Proofs',
    icon: FileText,
  },
];

export default function DemoTourModal() {
  const router = useRouter();
  const { activeTourStep, nextDemoTourStep, endDemoTour } = useBlockPerpStore();

  if (!activeTourStep || activeTourStep > TOUR_STEPS.length) return null;

  const current = TOUR_STEPS[activeTourStep - 1];
  const Icon = current.icon;

  const handleAction = () => {
    router.push(current.target);
    if (activeTourStep < TOUR_STEPS.length) {
      nextDemoTourStep();
    } else {
      endDemoTour();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 glass-panel-elevated rounded-2xl border-2 border-sunrise/60 shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sunrise/20 text-sunrise-light border border-sunrise/40">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sunrise/20 text-sunrise-light font-bold">
                Judge Walkthrough Step {activeTourStep} / 6
              </span>
            </div>
            <h4 className="text-sm font-display font-bold text-white mt-0.5">{current.title}</h4>
          </div>
        </div>
        <button 
          onClick={endDemoTour}
          className="text-coolgray-400 hover:text-white p-1 rounded-md hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-coolgray-300 mt-2.5 leading-relaxed">
        {current.desc}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-background-deep h-1.5 rounded-full mt-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-bright to-sunrise h-full transition-all duration-300"
          style={{ width: `${(activeTourStep / TOUR_STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t border-white/10">
        <button
          onClick={endDemoTour}
          className="text-[11px] font-mono text-coolgray-400 hover:text-white"
        >
          Exit Tour
        </button>
        <button
          onClick={handleAction}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sunrise to-sunrise-light text-background-deep shadow-sunrise-glow hover:brightness-110 active:scale-95 transition-all"
        >
          <span>{current.actionLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
