import { create } from 'zustand';
import { 
  Order, 
  Position, 
  OrderBookLevel, 
  FundingBlock, 
  CreditProfile, 
  TransactionReceipt, 
  OrderSide, 
  OrderType, 
  CreditTierName,
  TraderProfile
} from './types';
import { sound } from './audio';

interface BlockPerpState {
  // Trader Identity & Auth
  traderProfile: TraderProfile;
  setTraderProfile: (updates: Partial<TraderProfile>) => void;
  depositCollateral: (amount: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  // Global Engine & Chain
  currentBlock: number;
  blockTimeMs: number;
  isMockMode: boolean;
  toggleMockMode: () => void;
  setBlockTime: (ms: number) => void;
  
  // Market Prices (Real Live baseline from Binance / Pyth)
  markPrice: number;
  indexPrice: number;
  premium: number;
  cumulativeIndex: number;
  priceHistory: { time: number; mark: number; index: number; open: number; high: number; low: number; close: number; volume: number }[];
  
  // Funding
  fundingBlocks: FundingBlock[];
  annualizedFundingRate: number;
  
  // Order Book
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  lastTradePrice: number;
  
  // Portfolio & State
  creditProfile: CreditProfile;
  positions: Position[];
  orders: Order[];
  receipts: TransactionReceipt[];
  insuranceFundBalance: number;
  
  // Interactive Demos
  activeTourStep: number | null;
  startDemoTour: () => void;
  nextDemoTourStep: () => void;
  endDemoTour: () => void;
  liquidationModalOpen: boolean;
  setLiquidationModalOpen: (open: boolean) => void;
  
  // Actions
  syncRealMarketPrice: () => Promise<void>;
  placeOrder: (params: { side: 'BUY' | 'SELL'; size: number; price?: number; leverage: number; type: OrderType }) => Promise<TransactionReceipt>;
  closePosition: (positionId: string) => Promise<void>;
  triggerSimulatedLiquidation: () => Promise<void>;
  tickBlock: () => void;
}

// Generate realistic live order book around price
function generateOrderBook(basePrice: number, block: number): { bids: OrderBookLevel[]; asks: OrderBookLevel[] } {
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  
  let bidTotal = 0;
  for (let i = 1; i <= 8; i++) {
    const price = Math.round((basePrice - i * 0.35 + (Math.random() * 0.08 - 0.04)) * 100) / 100;
    const size = Math.round((1.2 + Math.random() * 5.8) * 100) / 100;
    bidTotal += size;
    bids.push({
      price,
      size,
      total: Math.round(bidTotal * 100) / 100,
      depthPercent: Math.min(100, (bidTotal / 40) * 100),
      blockNumber: block - Math.floor(Math.random() * 2),
    });
  }

  let askTotal = 0;
  for (let i = 1; i <= 8; i++) {
    const price = Math.round((basePrice + i * 0.35 + (Math.random() * 0.08 - 0.04)) * 100) / 100;
    const size = Math.round((1.2 + Math.random() * 5.8) * 100) / 100;
    askTotal += size;
    asks.push({
      price,
      size,
      total: Math.round(askTotal * 100) / 100,
      depthPercent: Math.min(100, (askTotal / 40) * 100),
      blockNumber: block - Math.floor(Math.random() * 2),
    });
  }

  return { bids, asks };
}

// Generate initial real-scale klines around current market
function generateInitialKlines(basePrice: number) {
  const klines = [];
  const now = Math.floor(Date.now() / 1000);
  let price = basePrice - 18;
  
  for (let i = 60; i >= 0; i--) {
    const time = now - i * 60;
    const change = (Math.random() - 0.48) * 4.2;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 2.2;
    const low = Math.min(open, close) - Math.random() * 2.2;
    price = close;
    klines.push({
      time,
      mark: close,
      index: close - (Math.random() * 0.8 - 0.4),
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.round((18 + Math.random() * 55) * 10) / 10,
    });
  }
  return klines;
}

const initialRealPrice = 2502.13;
const initialRealIndex = 2503.58;
const initialBlock = 19482150;
const initialKlines = generateInitialKlines(initialRealPrice);
const { bids: initBids, asks: initAsks } = generateOrderBook(initialRealPrice, initialBlock);

export const useBlockPerpStore = create<BlockPerpState>((set, get) => ({
  // Dynamic Trader Profile
  traderProfile: {
    name: 'SummitTrader',
    address: '0x71C6615b130a1334E27A598aDf0DE393A33e7C28',
    collateralUsd: 25000.00,
    tier: 'Ridge',
    elevationMeters: 7400,
    compositeScore: 780,
    maxLeverage: 8,
    initialMarginReq: 12.5,
    joinedDate: 'March 2026',
    totalVolumeUsd: 184500,
    totalTrades: 42,
    liquidationsCount: 0,
  },

  setTraderProfile: (updates) => set((s) => {
    const updated = { ...s.traderProfile, ...updates };
    const tier = updated.tier;
    const maxLeverage = tier === 'Summit' ? 20 : tier === 'Ridge' ? 8 : 3;
    const initialMarginReq = tier === 'Summit' ? 5 : tier === 'Ridge' ? 12.5 : 33.3;

    return {
      traderProfile: {
        ...updated,
        maxLeverage,
        initialMarginReq,
      },
      creditProfile: {
        ...s.creditProfile,
        address: updated.address,
        traderName: updated.name,
        tier,
        maxLeverage,
        initialMarginReq,
      }
    };
  }),

  depositCollateral: (amount) => set((s) => {
    const newBal = s.traderProfile.collateralUsd + amount;
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const receipt: TransactionReceipt = {
      hash: txHash,
      blockNumber: s.currentBlock + 1,
      action: 'DEPOSIT_MARGIN',
      status: 'FINALIZED',
      gasUsed: 38200,
      timestamp: Date.now(),
      details: `DEPOSIT $${amount.toLocaleString()} USDC to MarginVault.sol for ${s.traderProfile.name}`,
      eventLogs: [
        `CollateralDeposited(trader: ${s.traderProfile.address.slice(0,8)}..., amount: ${amount} USDC)`,
        `MarginVaultBalanceUpdated(newBalance: ${newBal} USDC)`,
      ],
    };

    return {
      traderProfile: { ...s.traderProfile, collateralUsd: newBal },
      receipts: [receipt, ...s.receipts.slice(0, 24)],
    };
  }),

  soundEnabled: true,
  toggleSound: () => {
    const next = !get().soundEnabled;
    sound.enabled = next;
    set({ soundEnabled: next });
  },

  currentBlock: initialBlock,
  blockTimeMs: 1500,
  isMockMode: false,
  toggleMockMode: () => set(s => ({ isMockMode: !s.isMockMode })),
  setBlockTime: (ms) => set({ blockTimeMs: ms }),

  markPrice: initialRealPrice,
  indexPrice: initialRealIndex,
  premium: (initialRealPrice - initialRealIndex) / initialRealIndex,
  cumulativeIndex: 1.01842,
  priceHistory: initialKlines,

  fundingBlocks: [
    {
      blockNumber: initialBlock,
      timestamp: Date.now(),
      markPrice: initialRealPrice,
      indexPrice: initialRealIndex,
      premium: -0.000057,
      clampedPremium: -0.000057,
      blockFundingRate: -0.0000000114,
      cumIndex: 1.01842,
      annualizedRate: -1.24,
      hash: '0x8f2a...1e40',
    }
  ],
  annualizedFundingRate: -1.24,

  bids: initBids,
  asks: initAsks,
  lastTradePrice: initialRealPrice,

  creditProfile: {
    address: '0x71C6615b130a1334E27A598aDf0DE393A33e7C28',
    traderName: 'SummitTrader',
    tier: 'Ridge',
    elevationMeters: 7400,
    compositeScore: 780,
    maxLeverage: 8,
    initialMarginReq: 12.5,
    maintenanceMarginReq: 6.25,
    verifiedOnchain: true,
    attestationHash: '0x3f7b99c01824abde90412847a9ef381948201ac4',
    signals: [
      {
        name: 'Account Longevity',
        value: '194 days',
        score: 84,
        weight: 20,
        source: 'Ethereum Mainnet Archive',
        description: 'Time elapsed since first onchain contract execution',
      },
      {
        name: 'Historical Volume',
        value: '$184,500',
        score: 80,
        weight: 35,
        source: 'DeFi Liquidity & Perps Protocols',
        description: 'Cumulative verified volume without credit defaults',
      },
      {
        name: 'Margin Discipline',
        value: '0 defaults',
        score: 100,
        weight: 30,
        source: 'Liquidation Registry',
        description: 'Zero forced liquidations or socialized bad debt',
      },
      {
        name: 'Transaction Cadence',
        value: '42 txs/mo',
        score: 75,
        weight: 15,
        source: 'EVM Gas Nonce Stream',
        description: 'Consistent weekly trading activity',
      },
    ]
  },

  positions: [
    {
      id: 'pos-1',
      symbol: 'ETH-PERP',
      side: 'LONG',
      size: 2.0,
      entryPrice: 2498.40,
      markPrice: initialRealPrice,
      liquidationPrice: 2210.00,
      margin: 624.60,
      leverage: 8,
      unrealizedPnl: 7.46,
      unrealizedPnlPercent: 1.19,
      marginRatio: 12.5,
      accruedFunding: 0.0028,
      lastFundingBlock: initialBlock - 6,
      createdAtBlock: initialBlock - 40,
    }
  ],

  orders: [],
  receipts: [
    {
      hash: '0x8f2a9c148201fae7102948c0281b3749281a8b0129c71624a8d0172e91b40281',
      blockNumber: initialBlock - 8,
      action: 'PLACE_ORDER',
      status: 'FINALIZED',
      gasUsed: 52410,
      timestamp: Date.now() - 15000,
      details: 'MARKET LONG 2.00 ETH @ $2,498.40 [Tier: Ridge 8x]',
      eventLogs: [
        'OrderPlaced(market: ETH-PERP, size: 2.0e18, side: BUY)',
        'MarginLocked(vault: MarginVault.sol, collateral: 624.60 USDC)',
        'OrderMatched(fillPrice: 2498.4e18, fee: 0.00)',
      ],
    }
  ],
  insuranceFundBalance: 524800.00,

  activeTourStep: null,
  startDemoTour: () => set({ activeTourStep: 1 }),
  nextDemoTourStep: () => set(s => ({ activeTourStep: (s.activeTourStep ?? 0) + 1 })),
  endDemoTour: () => set({ activeTourStep: null }),
  liquidationModalOpen: false,
  setLiquidationModalOpen: (open) => set({ liquidationModalOpen: open }),

  // Real market sync from live Binance / Pyth API proxy
  syncRealMarketPrice: async () => {
    try {
      const res = await fetch('/api/prices/binance?symbol=ETHUSDT');
      if (res.ok) {
        const data = await res.json();
        if (data && data.markPrice) {
          const liveMark = data.markPrice;
          const liveIndex = data.indexPrice || (liveMark + 0.25);
          set(s => ({
            markPrice: liveMark,
            indexPrice: liveIndex,
          }));
        }
      }
    } catch (e) {}
  },

  tickBlock: () => {
    const state = get();
    const newBlock = state.currentBlock + 1;

    // Trigger subtle block chime
    sound.playBlockChime();

    // Micro real price walk
    const walk = (Math.random() - 0.495) * 0.45;
    const newMark = Math.round((state.markPrice + walk) * 100) / 100;
    const indexWalk = (Math.random() - 0.5) * 0.2;
    const newIndex = Math.round((state.indexPrice + (newMark - state.indexPrice) * 0.12 + indexWalk) * 100) / 100;

    const rawPremium = (newMark - newIndex) / newIndex;
    const clampedPremium = Math.max(-0.0005, Math.min(0.0005, rawPremium));
    const blockFundingDelta = clampedPremium / 50000;
    const newCumIndex = state.cumulativeIndex + blockFundingDelta;
    const annualizedRate = Math.round(clampedPremium * (365 * 24 * 3600 / 1.5) * 10000) / 100;

    const newFundingBlock: FundingBlock = {
      blockNumber: newBlock,
      timestamp: Date.now(),
      markPrice: newMark,
      indexPrice: newIndex,
      premium: Math.round(rawPremium * 1000000) / 1000000,
      clampedPremium: Math.round(clampedPremium * 1000000) / 1000000,
      blockFundingRate: blockFundingDelta,
      cumIndex: Math.round(newCumIndex * 1000000) / 1000000,
      annualizedRate: Math.max(-40, Math.min(40, annualizedRate)),
      hash: '0x' + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join(''),
    };

    const updatedPositions = state.positions.map(pos => {
      const priceDiff = pos.side === 'LONG' ? (newMark - pos.entryPrice) : (pos.entryPrice - newMark);
      const uPnl = Math.round(priceDiff * pos.size * 100) / 100;
      const uPnlPct = Math.round((uPnl / pos.margin) * 10000) / 100;
      const blockFundingFee = (pos.size * blockFundingDelta * newMark);
      const newAccrued = pos.accruedFunding + (pos.side === 'LONG' ? -blockFundingFee : blockFundingFee);
      const equity = pos.margin + uPnl + newAccrued;
      const notional = pos.size * newMark;
      const marginRatio = notional > 0 ? Math.round((equity / notional) * 1000) / 10 : 0;

      return {
        ...pos,
        markPrice: newMark,
        unrealizedPnl: uPnl,
        unrealizedPnlPercent: uPnlPct,
        accruedFunding: Math.round(newAccrued * 1000) / 1000,
        marginRatio: Math.max(0, marginRatio),
        lastFundingBlock: newBlock,
      };
    });

    const { bids, asks } = generateOrderBook(newMark, newBlock);

    // Keep candlestick stream updated
    const now = Math.floor(Date.now() / 1000);
    const lastKline = state.priceHistory[state.priceHistory.length - 1];
    let updatedHistory = [...state.priceHistory];

    if (lastKline && now - lastKline.time < 60) {
      updatedHistory[updatedHistory.length - 1] = {
        ...lastKline,
        high: Math.max(lastKline.high, newMark),
        low: Math.min(lastKline.low, newMark),
        close: newMark,
        mark: newMark,
        index: newIndex,
        volume: lastKline.volume + 0.15,
      };
    } else {
      updatedHistory.push({
        time: now,
        open: newMark,
        high: newMark,
        low: newMark,
        close: newMark,
        mark: newMark,
        index: newIndex,
        volume: 1.5,
      });
      if (updatedHistory.length > 80) updatedHistory.shift();
    }

    set({
      currentBlock: newBlock,
      markPrice: newMark,
      indexPrice: newIndex,
      premium: rawPremium,
      cumulativeIndex: newCumIndex,
      annualizedFundingRate: annualizedRate,
      fundingBlocks: [newFundingBlock, ...state.fundingBlocks.slice(0, 19)],
      positions: updatedPositions,
      bids,
      asks,
      priceHistory: updatedHistory,
    });
  },

  placeOrder: async (params) => {
    const state = get();
    sound.playOrderPlaced();

    const isBuy = params.side === 'BUY';
    const fillPrice = params.type === 'MARKET' 
      ? (isBuy ? state.asks[0]?.price || state.markPrice : state.bids[0]?.price || state.markPrice)
      : (params.price || state.markPrice);
    
    const notional = params.size * fillPrice;
    const requiredMargin = notional / params.leverage;
    const blockNum = state.currentBlock + 1;
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const newPosition: Position = {
      id: 'pos-' + Date.now(),
      symbol: 'ETH-PERP',
      side: isBuy ? 'LONG' : 'SHORT',
      size: params.size,
      entryPrice: fillPrice,
      markPrice: fillPrice,
      liquidationPrice: isBuy 
        ? Math.round(fillPrice * (1 - 0.9 / params.leverage) * 100) / 100
        : Math.round(fillPrice * (1 + 0.9 / params.leverage) * 100) / 100,
      margin: Math.round(requiredMargin * 100) / 100,
      leverage: params.leverage,
      unrealizedPnl: 0,
      unrealizedPnlPercent: 0,
      marginRatio: Math.round((100 / params.leverage) * 10) / 10,
      accruedFunding: 0,
      lastFundingBlock: blockNum,
      createdAtBlock: blockNum,
    };

    const receipt: TransactionReceipt = {
      hash: txHash,
      blockNumber: blockNum,
      action: 'PLACE_ORDER',
      status: 'FINALIZED',
      gasUsed: 54100 + Math.floor(Math.random() * 4000),
      timestamp: Date.now(),
      details: `${params.type} ${params.side} ${params.size} ETH @ $${fillPrice.toFixed(2)} [${state.traderProfile.name} • ${params.leverage}x]`,
      eventLogs: [
        `OrderPlaced(trader: ${state.traderProfile.name}, size: ${params.size}e18, side: ${params.side})`,
        `MarginVaultLocked(amount: ${requiredMargin.toFixed(2)} USD, block: ${blockNum})`,
        `OrderMatched(matchPrice: ${fillPrice.toFixed(2)}, fillSize: ${params.size} ETH)`,
      ],
    };

    set(s => ({
      currentBlock: blockNum,
      positions: [newPosition, ...s.positions],
      receipts: [receipt, ...s.receipts.slice(0, 24)],
    }));

    return receipt;
  },

  closePosition: async (positionId: string) => {
    const state = get();
    sound.playOrderPlaced();

    const pos = state.positions.find(p => p.id === positionId);
    if (!pos) return;

    const blockNum = state.currentBlock + 1;
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const receipt: TransactionReceipt = {
      hash: txHash,
      blockNumber: blockNum,
      action: 'FILL_ORDER',
      status: 'FINALIZED',
      gasUsed: 46200,
      timestamp: Date.now(),
      details: `CLOSE ${pos.side} ${pos.size} ETH-PERP for ${state.traderProfile.name} (PnL: ${pos.unrealizedPnl >= 0 ? '+' : ''}$${pos.unrealizedPnl.toFixed(2)})`,
      eventLogs: [
        `PositionClosed(trader: ${state.traderProfile.name}, pnl: ${pos.unrealizedPnl.toFixed(2)})`,
        `MarginVaultReleased(unlockedMargin: ${pos.margin.toFixed(2)} USD)`,
      ],
    };

    set(s => ({
      currentBlock: blockNum,
      positions: s.positions.filter(p => p.id !== positionId),
      receipts: [receipt, ...s.receipts.slice(0, 24)],
    }));
  },

  triggerSimulatedLiquidation: async () => {
    const state = get();
    sound.playLiquidationAlert();

    const pos = state.positions[0];
    if (!pos) return;

    const blockNum = state.currentBlock + 1;
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const receipt: TransactionReceipt = {
      hash: txHash,
      blockNumber: blockNum,
      action: 'LIQUIDATION',
      status: 'FINALIZED',
      gasUsed: 92400,
      timestamp: Date.now(),
      details: `Liquidator.sol executed on ${pos.size} ETH-PERP (${state.traderProfile.name})`,
      eventLogs: [
        `LiquidationTriggered(target: ${state.traderProfile.address.slice(0,8)}..., size: ${pos.size} ETH)`,
        `InsuranceFundAbsorbed(fundDelta: -$${(pos.margin * 0.15).toFixed(2)})`,
      ],
    };

    set(s => ({
      currentBlock: blockNum,
      liquidationModalOpen: true,
      insuranceFundBalance: s.insuranceFundBalance - pos.margin * 0.15,
      positions: s.positions.slice(1),
      receipts: [receipt, ...s.receipts.slice(0, 24)],
    }));
  },
}));
