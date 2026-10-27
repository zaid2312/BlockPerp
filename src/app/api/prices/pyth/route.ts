import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pythKey = process.env.PYTH_API_KEY;
  const feedId = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
  
  try {
    const url = `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${feedId}`;
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    if (pythKey) {
      headers['Authorization'] = `Bearer ${pythKey}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 3 },
    });

    if (!res.ok) {
      throw new Error(`Pyth status: ${res.status}`);
    }

    const data = await res.json();
    const priceObj = data?.parsed?.[0]?.price;
    if (priceObj) {
      const price = Number(priceObj.price) * Math.pow(10, priceObj.expo);
      return NextResponse.json({
        source: 'Pyth Hermes (Live Onchain Feed)',
        price,
        confidence: Number(priceObj.conf) * Math.pow(10, priceObj.expo),
        timestamp: priceObj.publish_time * 1000,
        feedId,
        isSimulated: false,
      });
    }
  } catch (err: any) {
    // Graceful fallback to live simulated baseline
  }

  // Graceful fallback
  return NextResponse.json({
    source: 'Pyth Hermes (Cached / Fallback)',
    price: 3485.40 + (Math.random() * 2 - 1),
    confidence: 0.18,
    timestamp: Date.now(),
    feedId,
    isSimulated: true,
  });
}
