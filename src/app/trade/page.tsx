'use client';

import React from 'react';
import MountainHeroBackground from '@/components/common/MountainHeroBackground';
import PriceChart from '@/components/terminal/PriceChart';
import OrderBook from '@/components/terminal/OrderBook';
import OrderEntryPanel from '@/components/terminal/OrderEntryPanel';
import PositionsTable from '@/components/terminal/PositionsTable';
import LiquidationModal from '@/components/terminal/LiquidationModal';

export default function TradePage() {
  return (
    <div className="relative min-h-[calc(100vh-65px)] p-4 lg:p-6 pb-20">
      {/* Calm subtle mountain backdrop at bottom */}
      <MountainHeroBackground isSubtle={true} />

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6">
        
        {/* Terminal Grid: Chart, Book & Order Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Price Action & Candlestick Chart */}
          <div className="lg:col-span-6 xl:col-span-7">
            <PriceChart />
          </div>

          {/* Real-Time Onchain Order Book */}
          <div className="lg:col-span-3 xl:col-span-2">
            <OrderBook />
          </div>

          {/* Trade Execution & Margin Calculation Panel */}
          <div className="lg:col-span-3 xl:col-span-3">
            <OrderEntryPanel />
          </div>
        </div>

        {/* Positions & Account Portfolio Table */}
        <PositionsTable />

      </div>

      {/* Liquidation Moment Demo Modal */}
      <LiquidationModal />
    </div>
  );
}
