/**
 * BlockPerp Smart Contract Interface & Adapter Layer
 * Connects to EVM fast-finality testnet or falls back gracefully to high-fidelity local engine.
 */

export const CONTRACT_ADDRESSES = {
  OrderBook: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
  MarginVault: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  FundingEngine: '0x274DE32C59D8FA782294101e4A220d93F7A1A9cD',
  Liquidator: '0x71C6615b130a1334E27A598aDf0DE393A33e7C28',
  CreditRisk: '0xE0f6A67500A5a7431f78F0A272AcFe3fa0f12F21',
  ETH_USD_Feed: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
};

export const CONTRACT_ABIS = {
  OrderBook: [
    {
      type: 'function',
      name: 'placeOrder',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'marketId', type: 'bytes32' },
        { name: 'isBuy', type: 'bool' },
        { name: 'price', type: 'uint256' },
        { name: 'size', type: 'uint256' },
        { name: 'orderType', type: 'uint8' },
      ],
      outputs: [{ name: 'orderId', type: 'uint256' }],
    },
    {
      type: 'event',
      name: 'OrderPlaced',
      inputs: [
        { indexed: true, name: 'orderId', type: 'uint256' },
        { indexed: true, name: 'trader', type: 'address' },
        { indexed: false, name: 'price', type: 'uint256' },
        { indexed: false, name: 'size', type: 'uint256' },
      ],
    },
    {
      type: 'event',
      name: 'OrderMatched',
      inputs: [
        { indexed: true, name: 'buyOrderId', type: 'uint256' },
        { indexed: true, name: 'sellOrderId', type: 'uint256' },
        { indexed: false, name: 'matchPrice', type: 'uint256' },
        { indexed: false, name: 'fillSize', type: 'uint256' },
      ],
    },
  ],
  MarginVault: [
    {
      type: 'function',
      name: 'depositCollateral',
      stateMutability: 'payable',
      inputs: [{ name: 'trader', type: 'address' }],
      outputs: [{ name: 'newBalance', type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'checkMarginRatio',
      stateMutability: 'view',
      inputs: [{ name: 'trader', type: 'address' }],
      outputs: [{ name: 'ratioBps', type: 'uint256' }],
    },
  ],
  FundingEngine: [
    {
      type: 'function',
      name: 'updateCumulativeIndex',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'markPrice', type: 'uint256' },
        { name: 'indexPrice', type: 'uint256' },
      ],
      outputs: [{ name: 'newCumIndex', type: 'int256' }],
    },
    {
      type: 'event',
      name: 'FundingAccrued',
      inputs: [
        { indexed: true, name: 'blockNumber', type: 'uint256' },
        { indexed: false, name: 'premium', type: 'int256' },
        { indexed: false, name: 'cumIndex', type: 'int256' },
      ],
    },
  ],
  Liquidator: [
    {
      type: 'function',
      name: 'liquidatePosition',
      stateMutability: 'nonpayable',
      inputs: [{ name: 'targetTrader', type: 'address' }],
      outputs: [{ name: 'penaltyAmount', type: 'uint256' }],
    },
    {
      type: 'event',
      name: 'LiquidationExecuted',
      inputs: [
        { indexed: true, name: 'trader', type: 'address' },
        { indexed: true, name: 'keeper', type: 'address' },
        { indexed: false, name: 'size', type: 'uint256' },
        { indexed: false, name: 'insuranceFundDelta', type: 'int256' },
      ],
    },
  ],
  CreditRisk: [
    {
      type: 'function',
      name: 'getCreditTier',
      stateMutability: 'view',
      inputs: [{ name: 'trader', type: 'address' }],
      outputs: [
        { name: 'tier', type: 'uint8' },
        { name: 'maxLeverage', type: 'uint256' },
      ],
    },
  ],
};

// Demo Wallets for Hackathon Judges
export const DEMO_WALLETS = {
  Basecamp: {
    name: 'Explorer (Basecamp)',
    address: '0x17dF009dF26A0C2d427d119C64c67086EBFeB448',
    tier: 'Basecamp' as const,
    elevationMeters: 5364,
    maxLeverage: 3,
    initialMarginReq: 33.3,
    description: 'New address, fresh testnet history. Protected with safe 3x max leverage.',
    stats: { age: '14 days', txCount: 18, volume: '$4,200', liquidations: 1 },
  },
  Ridge: {
    name: 'Alpinist (Ridge)',
    address: '0x71C6615b130a1334E27A598aDf0DE393A33e7C28',
    tier: 'Ridge' as const,
    elevationMeters: 7400,
    maxLeverage: 8,
    initialMarginReq: 12.5,
    description: 'Consistent trader with established DeFi liquidity provision. Unlocks 8x leverage.',
    stats: { age: '180 days', txCount: 142, volume: '$186,000', liquidations: 0 },
  },
  Summit: {
    name: 'Sherpa Prime (Summit)',
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    tier: 'Summit' as const,
    elevationMeters: 8848,
    maxLeverage: 20,
    initialMarginReq: 5.0,
    description: 'Top-tier onchain credit score. Flawless margin discipline. Unlocks premier 20x tier.',
    stats: { age: '730 days', txCount: 1240, volume: '$2,450,000', liquidations: 0 },
  },
};
