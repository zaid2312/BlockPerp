'use client';

import React from 'react';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import CreditPassportView from '@/components/credit/CreditPassportView';

export default function CreditPage() {
  return (
    <div className="relative min-h-screen pb-24">
      <MountainHeroBackground isSubtle={true} />
      <div className="relative z-10">
        <CreditPassportView />
      </div>
    </div>
  );
}
