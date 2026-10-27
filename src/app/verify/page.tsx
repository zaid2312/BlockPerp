'use client';

import React from 'react';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import ProofVerifyView from '@/components/proof/ProofVerifyView';

export default function VerifyPage() {
  return (
    <div className="relative min-h-screen pb-24">
      <MountainHeroBackground isSubtle={true} />
      <div className="relative z-10">
        <ProofVerifyView />
      </div>
    </div>
  );
}
