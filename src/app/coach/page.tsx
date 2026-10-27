'use client';

import React from 'react';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import LiquidationCoachView from '@/components/coach/LiquidationCoachView';

export default function CoachPage() {
  return (
    <div className="relative min-h-screen pb-24">
      <MountainHeroBackground isSubtle={true} />
      <div className="relative z-10">
        <LiquidationCoachView />
      </div>
    </div>
  );
}
