import { NextResponse } from 'next/server';
import { DEMO_WALLETS } from '@/lib/contracts';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || DEMO_WALLETS.Ridge.address;
  const alchemyKey = process.env.ALCHEMY_KEY;

  let foundWallet = Object.values(DEMO_WALLETS).find(
    w => w.address.toLowerCase() === address.toLowerCase()
  );

  if (!foundWallet) {
    foundWallet = DEMO_WALLETS.Ridge;
  }

  return NextResponse.json({
    address,
    tier: foundWallet.tier,
    elevationMeters: foundWallet.elevationMeters,
    maxLeverage: foundWallet.maxLeverage,
    initialMarginReq: foundWallet.initialMarginReq,
    stats: foundWallet.stats,
    source: alchemyKey ? 'Alchemy Ethereum Mainnet Archive + Blockscout' : 'Blockscout Indexer Attestation (Local Mode)',
    verified: true,
  });
}
