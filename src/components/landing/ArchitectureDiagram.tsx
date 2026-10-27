'use client';

import React, { useState } from 'react';
import { CONTRACT_ADDRESSES } from '@/lib/contracts';
import { Layers, ShieldCheck, Activity, Cpu, ArrowRight, Zap, RefreshCw, FileCode } from 'lucide-react';

interface ContractInfo {
  name: string;
  solFile: string;
  address: string;
  role: string;
  inputs: string;
  events: string;
  accent: string;
}

const CONTRACTS: Record<string, ContractInfo> = {
  OrderBook: {
    name: 'OrderBook.sol',
    solFile: 'contracts/OrderBook.sol',
    address: CONTRACT_ADDRESSES.OrderBook,
    role: 'Onchain price-time priority matching engine. Eliminates MEV front-running with deterministic block execution.',
    inputs: 'placeOrder(marketId, isBuy, price, size, orderType)',
    events: 'OrderPlaced, OrderMatched, OrderCancelled',
    accent: '#2DD4BF',
  },
  MarginVault: {
    name: 'MarginVault.sol',
    solFile: 'contracts/MarginVault.sol',
    address: CONTRACT_ADDRESSES.MarginVault,
    role: 'Isolated collateral custody, mark-to-market PnL accounting, and real-time margin check enforcement.',
    inputs: 'depositCollateral(trader), lockMargin(trader, notional)',
    events: 'CollateralDeposited, MarginLocked, PnlSettled',
    accent: '#1F8A99',
  },
  FundingEngine: {
    name: 'FundingEngine.sol',
    solFile: 'contracts/FundingEngine.sol',
    address: CONTRACT_ADDRESSES.FundingEngine,
    role: 'Per-block cumulative index calculation. Samples Pyth mark vs spot index and accrues continuous funding.',
    inputs: 'updateCumulativeIndex(markPrice, indexPrice)',
    events: 'FundingAccrued(blockNumber, premium, cumIndex)',
    accent: '#F28C28',
  },
  Liquidator: {
    name: 'Liquidator.sol',
    solFile: 'contracts/Liquidator.sol',
    address: CONTRACT_ADDRESSES.Liquidator,
    role: 'Permissionless keeper liquidation bot interface and decentralized insurance fund backstop.',
    inputs: 'liquidatePosition(targetTrader)',
    events: 'LiquidationExecuted(trader, keeper, size, fundDelta)',
    accent: '#E5484D',
  },
  CreditRisk: {
    name: 'CreditRisk.sol',
    solFile: 'contracts/CreditRisk.sol',
    address: CONTRACT_ADDRESSES.CreditRisk,
    role: 'Onchain credit scoring engine. Reads historical wallet attestations to dynamically adjust max leverage & margin requirements.',
    inputs: 'getCreditTier(trader) -> (tier, maxLeverage)',
    events: 'CreditTierAttested(trader, tier, score)',
    accent: '#FFB454',
  },
};

export default function ArchitectureDiagram() {
  const [selectedContract, setSelectedContract] = useState<string>('FundingEngine');

  const current = CONTRACTS[selectedContract];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-sunrise-light px-3 py-1 rounded-full bg-sunrise/10 border border-sunrise/30">
          Modular Smart Contract Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4">
          Five Smart Contracts, Zero Offchain Black Boxes
        </h2>
        <p className="text-coolgray-400 mt-3 text-sm sm:text-base">
          Hover or tap any contract to trace state transitions, function inputs, and event settlement pipelines.
        </p>
      </div>

      {/* Interactive System Pipeline Flow */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel-elevated border border-white/10 shadow-glass">
        
        {/* Top Flow Line: Ingress -> Contracts -> Egress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-10 pb-8 border-b border-white/10">
          
          {/* Step 1: User / Wallet */}
          <div className="p-4 rounded-xl bg-background-deep/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal/20 text-teal-bright flex items-center justify-center font-bold">
              01
            </div>
            <div>
              <div className="text-xs font-mono text-coolgray-400">INGRESS</div>
              <div className="text-sm font-semibold text-white">Trader Wallet (Wagmi / Viem)</div>
              <div className="text-[11px] text-teal-bright font-mono">EIP-712 Signed Orders</div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="hidden md:flex justify-center text-coolgray-400">
            <div className="flex items-center gap-2 font-mono text-xs text-sunrise-light animate-pulse">
              <span>Fast Finality Call</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Step 3: Event Listener & Indexer */}
          <div className="p-4 rounded-xl bg-background-deep/80 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sunrise/20 text-sunrise-light flex items-center justify-center font-bold">
              03
            </div>
            <div>
              <div className="text-xs font-mono text-coolgray-400">EGRESS & STATE</div>
              <div className="text-sm font-semibold text-white">WebSocket Event Listener</div>
              <div className="text-[11px] text-sunrise-light font-mono">Real-time Terminal Sync</div>
            </div>
          </div>

        </div>

        {/* Core: The 5 Contracts Matrix */}
        <div className="mb-8">
          <div className="text-xs font-mono text-coolgray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-bright" />
            <span>The 5 Core Contracts (Solidity / Foundry Testnet)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(CONTRACTS).map(([key, c]) => {
              const isSelected = selectedContract === key;
              return (
                <button
                  key={key}
                  onMouseEnter={() => setSelectedContract(key)}
                  onClick={() => setSelectedContract(key)}
                  className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-surface border-2 shadow-lg scale-[1.02]'
                      : 'bg-background-deep/60 border border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    borderColor: isSelected ? c.accent : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-coolgray-300">
                      SOLIDITY
                    </span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                  </div>

                  <h3 className="text-base font-bold text-white font-mono">{c.name}</h3>
                  <p className="text-[11px] text-coolgray-400 mt-1 line-clamp-2">
                    {c.role}
                  </p>

                  <div className="mt-3 text-[10px] font-mono text-teal-bright flex items-center gap-1">
                    <span>Inspect Spec</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Card for Selected Contract */}
        <div 
          className="p-6 rounded-2xl bg-surface/90 border border-white/15 transition-all"
          style={{ borderLeft: `4px solid ${current.accent}` }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-bold text-white">{current.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-coolgray-300">
                  {current.solFile}
                </span>
              </div>
              <p className="text-xs text-coolgray-300 mt-1 max-w-2xl">{current.role}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-coolgray-400 block uppercase">Testnet Contract Address</span>
              <span className="text-xs font-mono text-teal-bright">{current.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-background-deep/80 border border-white/5">
              <span className="text-[10px] text-coolgray-400 uppercase block mb-1">Target Entrypoint Function:</span>
              <span className="text-sunrise-light">{current.inputs}</span>
            </div>
            <div className="p-3 rounded-xl bg-background-deep/80 border border-white/5">
              <span className="text-[10px] text-coolgray-400 uppercase block mb-1">Onchain Emitted Events:</span>
              <span className="text-teal-bright">{current.events}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
