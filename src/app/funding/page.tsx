'use client';

import React from 'react';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import BlockHeartbeat from '@/components/funding/BlockHeartbeat';
import FundingComparisonChart from '@/components/funding/FundingComparisonChart';
import FundingFormulaCard from '@/components/funding/FundingFormulaCard';
import FundingTimeMachine from '@/components/funding/FundingTimeMachine';

export default function FundingPage() {
  return (
    <div className="relative min-h-screen p-4 lg:p-8 pb-24">
      <MountainHeroBackground isSubtle={true} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Star Feature: Block Heartbeat */}
        <BlockHeartbeat />

        {/* Live Interactive Evaluation of the Formula */}
        <FundingFormulaCard />

        {/* Side-by-Side CEX 8h vs BlockPerp Per-Block Comparison */}
        <FundingComparisonChart />

        {/* 7-Day Real Market Data Time Machine */}
        <FundingTimeMachine />

      </div>
    </div>
  );
}
