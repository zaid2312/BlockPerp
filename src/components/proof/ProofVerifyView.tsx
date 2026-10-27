'use client';

import React, { useState } from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  FileCheck, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  Database,
  Lock
} from 'lucide-react';

export default function ProofVerifyView() {
  const { receipts, currentBlock, traderProfile } = useBlockPerpStore();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [simulateRevert, setSimulateRevert] = useState(false);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const lifecycleSteps = [
    { name: '1. EIP-712 Sign', desc: `Signed by ${traderProfile.name} (${traderProfile.address.slice(0,6)}...)`, success: true },
    { name: '2. MarginVault Check', desc: 'Solvency & collateral verification', success: true },
    { name: '3. CreditRisk Tier', desc: `Verify ${traderProfile.tier} tier limits`, success: !simulateRevert },
    { name: '4. OrderBook Match', desc: 'Atomic price-time priority execution', success: !simulateRevert },
    { name: '5. Event Settlement', desc: 'Emit OrderPlaced / OrderMatched events', success: !simulateRevert },
    { name: '6. UI Listener Sync', desc: 'WebSocket client updates terminal state', success: !simulateRevert },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-teal/20 text-teal-bright">
            <FileCheck className="w-5 h-5" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-teal-bright font-bold">
            Zero Offchain State Trust
          </span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white">
          Onchain Proof, Receipts & Order Lifecycle Trace
        </h1>
        <p className="text-sm text-coolgray-300 mt-1 max-w-2xl font-light">
          Every order execution, funding rebalance, and liquidation produces an immutable cryptographic receipt on the EVM testnet.
        </p>
      </div>

      {/* Prominent Trust Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal/20 via-background-deep to-sunrise/20 border border-teal-bright/40 flex items-center justify-between text-xs font-mono shadow-teal-glow">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-teal-bright" />
          <span className="text-white font-bold text-sm">
            "No centralized database for core financial state."
          </span>
        </div>
        <span className="text-teal-bright hidden sm:block">100% Solidity & Foundry Contracts</span>
      </div>

      {/* Interactive Order Lifecycle Trace */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-bold text-white">
              Live Order Lifecycle Trace
            </h3>
            <p className="text-xs text-coolgray-400 mt-0.5">
              Follow an order from signature to execution or trigger the risk check revert branch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulateRevert(!simulateRevert)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                simulateRevert
                  ? 'bg-coral/20 text-coral border-coral/50'
                  : 'bg-white/5 text-coolgray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {simulateRevert ? 'Revert Branch Active' : 'Simulate Risk Revert'}
            </button>
          </div>
        </div>

        {/* 6 Lifecycle Steps Flow */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {lifecycleSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`p-3.5 rounded-2xl border text-xs font-mono relative transition-all ${
                step.success
                  ? 'bg-teal/[0.06] border-teal-bright/40 text-white'
                  : 'bg-coral/[0.08] border-coral/50 text-coral'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-coolgray-400">Step {idx + 1}</span>
                {step.success ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-bright" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-coral" />
                )}
              </div>
              <div className="font-bold mb-1 text-[11px]">{step.name}</div>
              <p className="text-[10px] text-coolgray-400 font-light leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>

        {simulateRevert && (
          <div className="p-3 rounded-xl bg-coral/10 border border-coral/30 text-xs font-mono text-coral flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>REVERT: MarginVault.sol halted transaction: requested leverage exceeds CreditRisk limit for tier. Zero gas penalty.</span>
          </div>
        )}
      </div>

      {/* Transaction Receipts Ledger */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-white text-base">
              Verifiable Transaction Receipt Ledger
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal/20 text-teal-bright">
              {receipts.length} Executed
            </span>
          </div>
          <span className="text-xs font-mono text-coolgray-400">Synced to Block #{currentBlock}</span>
        </div>

        <div className="space-y-3">
          {receipts.map((rcpt, idx) => (
            <div 
              key={rcpt.hash || idx}
              className="p-4 rounded-2xl bg-background-deep/90 border border-white/5 hover:border-teal/30 transition-all font-mono text-xs space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rcpt.action === 'LIQUIDATION' ? 'bg-coral/20 text-coral' :
                    rcpt.action === 'FUNDING_SETTLE' ? 'bg-sunrise/20 text-sunrise-light' :
                    rcpt.action === 'DEPOSIT_MARGIN' ? 'bg-sunrise/20 text-sunrise-light' :
                    'bg-teal/20 text-teal-bright'
                  }`}>
                    {rcpt.action}
                  </span>
                  <span className="text-white font-semibold">{rcpt.details}</span>
                </div>

                <div className="flex items-center gap-2 text-coolgray-400 text-[11px]">
                  <span>Block #{rcpt.blockNumber}</span>
                  <span>•</span>
                  <span>{rcpt.gasUsed.toLocaleString()} gas</span>
                </div>
              </div>

              {/* Tx Hash with Copy Morph */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-coolgray-400">
                <div className="flex items-center gap-2 truncate max-w-md">
                  <span className="text-coolgray-500">Hash:</span>
                  <span className="text-teal-bright truncate">{rcpt.hash}</span>
                  <button
                    onClick={() => handleCopy(rcpt.hash)}
                    className="p-1 rounded hover:bg-white/10 text-coolgray-400 hover:text-white"
                    title="Copy Transaction Hash"
                  >
                    {copiedHash === rcpt.hash ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-bright" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1 text-sunrise-light hover:underline cursor-pointer">
                  <span>View in Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>

              {/* Event Logs Accordion/List */}
              {rcpt.eventLogs && rcpt.eventLogs.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] text-coolgray-500 uppercase">Onchain Emitted Events:</span>
                  {rcpt.eventLogs.map((log, lIdx) => (
                    <div key={lIdx} className="text-[10px] text-coolgray-300 bg-white/[0.02] px-2 py-1 rounded">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
