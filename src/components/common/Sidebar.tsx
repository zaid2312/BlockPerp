'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBlockPerpStore } from '@/lib/store';
import { 
  Home, 
  Layers, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Mountain,
  Wallet,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { traderProfile } = useBlockPerpStore();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/', icon: Home },
    { label: 'Trade Terminal', href: '/trade', icon: Layers, badge: 'LIVE' },
    { label: 'Funding Engine', href: '/funding', icon: Activity, badge: 'PER-BLOCK' },
    { label: 'Credit Passport', href: '/credit', icon: ShieldCheck },
    { label: 'Risk & Liquidation', href: '/coach', icon: TrendingUp },
    { label: 'Explorer & Proof', href: '/verify', icon: Cpu },
  ];

  return (
    <aside 
      className={`shrink-0 z-40 glass-panel border-r border-white/10 flex flex-col justify-between transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link href="/trade" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-bright/25 to-sunrise/20 border border-teal-bright/40 flex items-center justify-center shadow-teal-glow shrink-0">
              <svg className="w-5 h-5 text-teal-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 20L9 8L14 16L17 12L21 20H3Z" fill="url(#sideLogoGrad)" />
                <defs>
                  <linearGradient id="sideLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F28C28" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="font-display font-extrabold text-lg text-white tracking-wider block">
                  BLOCK<span className="text-sunrise">PERP</span>
                </span>
                <span className="text-[9px] text-teal-bright font-mono uppercase tracking-widest block -mt-1">
                  The Summit Ledger
                </span>
              </div>
            )}
          </Link>

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-coolgray-400 hover:text-white transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Tabs List */}
        <div className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all font-mono text-xs ${
                  isActive
                    ? 'text-white bg-teal/20 border border-teal-bright/40 shadow-teal-glow font-bold'
                    : 'text-coolgray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-bright' : 'text-coolgray-400'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                        item.badge === 'PER-BLOCK' ? 'bg-sunrise/20 text-sunrise-light' : 'bg-teal/20 text-teal-bright'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Account Card */}
      <div className="p-3 border-t border-white/10 space-y-2">
        {!collapsed ? (
          <div className="p-3 rounded-2xl bg-background-deep/90 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <div className="w-2 h-2 rounded-full bg-teal-bright animate-ping" />
                <span className="font-bold text-white text-xs truncate font-mono">
                  {traderProfile.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal/20 text-teal-bright border border-teal/30">
                {traderProfile.tier}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-coolgray-400 pt-1 border-t border-white/5">
              <span>Collateral:</span>
              <span className="text-teal-bright font-bold">${traderProfile.collateralUsd.toLocaleString()}</span>
            </div>

            <Link
              href="/login"
              className="w-full mt-1 py-1.5 rounded-xl text-center text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-coolgray-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors block"
            >
              <User className="w-3 h-3 text-teal-bright" />
              <span>Change Account</span>
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-full p-2.5 rounded-xl bg-background-deep border border-white/10 hover:border-teal/40 flex items-center justify-center text-teal-bright"
            title={`${traderProfile.name} (${traderProfile.tier})`}
          >
            <User className="w-4 h-4" />
          </Link>
        )}
      </div>
    </aside>
  );
}
