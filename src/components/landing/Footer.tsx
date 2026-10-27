'use client';

import React from 'react';
import Link from 'next/link';
import { Mountain, Github, Twitter, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 glass-panel bg-background-deep/95 mt-20 pt-14 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand & Team */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal/20 border border-teal/40 flex items-center justify-center text-teal-bright">
              <Mountain className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-wider">BLOCK<span className="text-sunrise">PERP</span></span>
          </div>

          <p className="mt-3 text-xs text-coolgray-400 max-w-md leading-relaxed">
            Finance where the rules, execution and settlement are visible onchain. 
            Built for <span className="text-white font-medium">Hack in Hills 26</span> (Track PS 02: Onchain Finance & Trading).
          </p>

          <div className="mt-4 p-3 rounded-xl bg-surface/60 border border-white/5 max-w-md">
            <span className="text-[10px] font-mono uppercase text-coolgray-400 block mb-1">Engineered by Team Cache & Crew</span>
            <div className="text-xs font-semibold text-white flex flex-wrap gap-x-4 gap-y-1">
              <span>Himangi Gupta</span>
              <span>•</span>
              <span>Tanisha Dabas</span>
              <span>•</span>
              <span>Zaid Moris</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase text-coolgray-400 tracking-wider mb-3">Protocol Modules</h4>
          <ul className="space-y-2 text-xs font-mono text-coolgray-300">
            <li><Link href="/trade" className="hover:text-teal-bright transition-colors">Trade Terminal (ETH-PERP)</Link></li>
            <li><Link href="/funding" className="hover:text-teal-bright transition-colors">Per-Block Funding Heartbeat</Link></li>
            <li><Link href="/credit" className="hover:text-teal-bright transition-colors">Credit Passport (Onchain)</Link></li>
            <li><Link href="/verify" className="hover:text-teal-bright transition-colors">Proof & Lifecycle Trace</Link></li>
          </ul>
        </div>

        {/* External & Verification */}
        <div>
          <h4 className="text-xs font-mono uppercase text-coolgray-400 tracking-wider mb-3">Verification & Oracles</h4>
          <ul className="space-y-2 text-xs font-mono text-coolgray-300">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-bright" />
              <span>Pyth Hermes Oracle Feed</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sunrise" />
              <span>Blockscout / Alchemy Indexer</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-bright" />
              <span>Solidity / Foundry Testnet</span>
            </li>
          </ul>
          <div className="mt-4 text-[10px] font-mono text-coolgray-500">
            "Funding that moves every block, not every hour."
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-coolgray-400">
        <div>© 2026 BlockPerp. Cache & Crew. All smart contract states verifiable onchain.</div>
        <div className="flex items-center gap-3">
          <span className="text-teal-bright">Track PS 02</span>
          <span>•</span>
          <span className="text-sunrise-light">Hack in Hills 26</span>
        </div>
      </div>
    </footer>
  );
}
