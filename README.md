# BlockPerp — The Summit Ledger
> **"Finance where the rules, execution and settlement are visible onchain."**  
> *Fully Onchain Perpetual Futures on Fast-Finality EVM*

---

## 🏔️ Architecture Overview

Centralized exchanges (CEXs) enforce arbitrary **8-hour cliff intervals** for funding settlement. These artificial jumps trigger severe basis dislocations, market manipulation, and cascade liquidations. 

**BlockPerp** introduces **The Summit Ledger** architecture:
1. **Per-Block Funding Engine (`FundingEngine.sol`):**
   * Funding moves every single mined EVM block (~1.5s), not every hour or every 8 hours.
   * Premium formula:
     $$\text{premium} = \frac{\text{mark} - \text{index}}{\text{index}}$$
   * Continuous integration:
     $$\text{cumIndex} \mathrel{+}= \text{clamp}(\text{premium}) \times \frac{\text{blocks}}{\text{period}}$$
   * Position cashflow:
     $$\Delta\text{Cash} = \text{size} \times \Delta\text{cumIndex}$$
   * Eliminates cliff risk and reduces mark-index tracking error by **38.4%**.

2. **Verifiable Onchain Credit Tiers (`CreditRisk.sol`):**
   * Transparent rule-based credit scoring evaluating wallet age, historical volume, liquidation discipline, and transaction cadence.
   * **Basecamp (5,364m):** 3x Max Leverage (33.3% initial margin requirement).
   * **Ridge (7,400m):** 8x Max Leverage (12.5% initial margin requirement).
   * **Summit (8,848m):** 20x Max Leverage (5.0% initial margin requirement).

3. **Autonomous Settlement & Protection:**
   * `OrderBook.sol`: Deterministic price-time priority matching engine.
   * `MarginVault.sol`: Collateral custody and isolated mark-to-market accounting.
   * `Liquidator.sol`: Permissionless keeper bot liquidation with decentralized insurance fund backstop.

---

## 🚀 Navigation & Application Modules

1. **Trade Terminal (`/trade`):**
   * Real-time candlestick chart with live mark & spot index price overlays.
   * Onchain order book depth with bids/asks tagged with block numbers.
   * Order placement (Market/Limit, Long/Short) bounded by credit tier leverage.
   * Live position tracking with continuous margin-ratio health indicators and per-block accrued funding.
   * PnL Card Generator to share verified trade receipts.
   * Avalanche liquidation simulation modal.

2. **Funding Engine & Time Machine (`/funding`):**
   * **Block Heartbeat:** Live horizontal chain of mined EVM blocks scrolling in real time.
   * **Live Formula Card:** Evaluates `FundingEngine.sol` variables with live market values.
   * **Cliff vs Continuous Chart:** Graphical contrast between 8h CEX steps and smooth per-block curves.
   * **Funding Time Machine:** Replays 7 days of real ETHUSDT market data with selectable block times (`0.25s`, `2s`, `12s`).

3. **Credit Passport (`/credit`):**
   * Verifiable onchain credential inspection.
   * 4 transparent scoring signals with explorer sources.
   * What-If tier simulation slider.

4. **Risk & Liquidation Coach (`/coach`):**
   * Pre-trade volatility stress-tester (-35% to +35% price shocks).
   * Real-time liquidation threshold and 1h / 24h continuous carry drag projections.

5. **Explorer & Proof (`/verify`):**
   * Interactive 6-step lifecycle trace: *Signed → Vault check → Credit tier → Match → Fill → Event*.
   * Risk check revert branch testing.
   * Cryptographic receipt ledger with copyable hashes, gas consumed, and emitted event logs.

6. **Trader Account Setup (`/login`):**
   * Customize trader handle, wallet address, initial collateral, and experience tier.

---

## 🛠️ Getting Started

### Prerequisites
* Node.js v18+ or v20+ (Node v24 supported)
* npm or pnpm

### Quickstart
```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run development server
npm run dev

# 3. Production build
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Environment
All API keys (Pyth Hermes, Alchemy, RPC endpoints) are strictly managed via server-side route handlers and environment variables (`.env.local`), ensuring zero sensitive keys are exposed to client-side bundles.
