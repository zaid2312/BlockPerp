import type { Metadata } from 'next';
import '@/styles/globals.css';
import Sidebar from '@/components/common/Sidebar';
import TopBar from '@/components/common/TopBar';
import DemoTourModal from '@/components/tour/DemoTourModal';
import CursorGlow from '@/components/common/CursorGlow';

export const metadata: Metadata = {
  title: 'BlockPerp | The Summit Ledger | Fully Onchain Perpetual Futures',
  description: 'Fully onchain perpetual futures exchange. Per-block funding, verifiable onchain credit tiers, and 100% visible settlement on fast-finality EVM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background-navy text-slate-100 antialiased flex relative selection:bg-teal selection:text-white overflow-x-hidden">
        {/* Animated glowing cursor follower & shadow effect */}
        <CursorGlow />

        {/* Modern Collapsible Left Sidebar */}
        <Sidebar />

        {/* Main Content Area with TopBar */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <TopBar />
          <main className="flex-1 relative z-10 overflow-y-auto">
            {children}
          </main>
        </div>

        <DemoTourModal />
      </body>
    </html>
  );
}
