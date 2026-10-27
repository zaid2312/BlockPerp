export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'LIMIT' | 'MARKET';
export type PositionSide = 'LONG' | 'SHORT';

export interface TraderProfile {
  name: string;
  address: string;
  collateralUsd: number;
  tier: CreditTierName;
  elevationMeters: number;
  compositeScore: number;
  maxLeverage: number;
  initialMarginReq: number;
  joinedDate: string;
  totalVolumeUsd: number;
  totalTrades: number;
  liquidationsCount: number;
}

export interface Order {
  id: string;
  price: number;
  size: number;
  side: OrderSide;
  type: OrderType;
  leverage: number;
  blockNumber: number;
  timestamp: number;
  status: 'OPEN' | 'FILLED' | 'CANCELLED';
  trader: string;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  depthPercent: number;
  blockNumber: number;
}

export interface Position {
  id: string;
  symbol: string;
  side: PositionSide;
  size: number; // in ETH
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  margin: number; // in USD
  leverage: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  marginRatio: number; // 0 - 100%
  accruedFunding: number; // in USD
  lastFundingBlock: number;
  createdAtBlock: number;
}

export interface FundingBlock {
  blockNumber: number;
  timestamp: number;
  markPrice: number;
  indexPrice: number;
  premium: number; // (mark - index) / index
  clampedPremium: number;
  blockFundingRate: number; // clamp(premium) * blocks / period
  cumIndex: number;
  annualizedRate: number;
  hash: string;
}

export type CreditTierName = 'Basecamp' | 'Ridge' | 'Summit';

export interface CreditSignal {
  name: string;
  value: string | number;
  score: number; // 0 - 100
  weight: number;
  source: string;
  description: string;
}

export interface CreditProfile {
  address: string;
  traderName: string;
  tier: CreditTierName;
  elevationMeters: number;
  compositeScore: number; // 0 - 1000
  maxLeverage: number;
  initialMarginReq: number;
  maintenanceMarginReq: number;
  signals: CreditSignal[];
  verifiedOnchain: boolean;
  attestationHash: string;
}

export interface TransactionReceipt {
  hash: string;
  blockNumber: number;
  action: 'PLACE_ORDER' | 'FILL_ORDER' | 'FUNDING_SETTLE' | 'LIQUIDATION' | 'CREDIT_ATTEST' | 'DEPOSIT_MARGIN';
  status: 'PENDING' | 'INCLUDED' | 'FINALIZED' | 'REVERTED';
  gasUsed: number;
  timestamp: number;
  details: string;
  eventLogs: string[];
}
