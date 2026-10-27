# 📖 BlockPerp User & Judge Operation Manual
> **The Complete Step-by-Step Operator Guide for BlockPerp**  
> *Track PS 02: Onchain Finance & Trading*

---

## 🚀 1. Quickstart: How to Run the App

1. **Start the local server:**
   ```bash
   npm start
   # or for development: npm run dev
   ```
2. **Open in browser:**
   Navigate to **`http://localhost:3000`**.

---

## 🧭 2. Complete Workflow & Feature Guide

### 👤 Step A: Set Up Trader Identity (`/login`)
1. Click **Account** or the Profile card at the bottom of the left sidebar.
2. Enter your **Trader Handle / Name** (e.g. `SatoshiTrader`, `Rajnish`).
3. Enter your **EVM Wallet Address** or click *"Generate New Address"*.
4. Enter your **Initial Margin Collateral** (e.g. `$25,000` USDC).
5. Choose your **Credit Experience Tier**:
   * **Basecamp (5,364m):** Safe 3x max leverage, 33.3% initial margin.
   * **Ridge (7,400m):** Experienced 8x max leverage, 12.5% initial margin.
   * **Summit (8,848m):** Premier 20x max leverage, 5.0% initial margin.
6. Click **"Save Profile & Launch Terminal"**. Every order, position, and transaction receipt across the entire app will dynamically reflect your name.

---

### ⚡ Step B: Trade Terminal Operations (`/trade`)
1. **Analyze the Chart:**
   * Toggle between **Candles** and **Mountain Area** view in the top right of the chart.
   * Hover over any candle to see the live **OHLCV Tooltip HUD** (Open, High, Low, Close, Volume, Timestamp).
   * Notice the animated pulsing beacon tracking the real-time Pyth mark price.
2. **Inspect the Onchain Order Book:**
   * Watch live bids (green) and asks (red) update in real time.
   * Notice each order level is tagged with its mined EVM block number (`#...`).
3. **Place an Order:**
   * Select **LONG (BUY)** or **SHORT (SELL)**.
   * Choose **Market** or **Limit** order type.
   * Select size in ETH (use presets `0.5`, `1.0`, `2.5`, `5.0`).
   * Drag the **Leverage slider** (automatically capped by your active Credit Tier).
   * Review required margin and estimated liquidation price.
   * Click **Open Long / Short**. A Web Audio synthesizer click plays and a receipt is instantly generated!
4. **Manage Positions:**
   * View your open position in the table below.
   * Watch the **Margin Ratio Bar** update dynamically (Green >10%, Orange 5-10%, Red <5%).
   * Watch the **Accrued Funding** column update every single block (~1.5s).
   * Click the **Share icon** to open the **PnL Win Receipt Card** and copy the card link.
   * Click **Close** to settle PnL and return margin to the vault.

---

### 🚨 Step C: Simulate Avalanche Liquidation (`/trade`)
1. In the positions table header, click **"Simulate Avalanche / Liquidation"**.
2. Watch the red pulse border and dramatic avalanche collapse animation.
3. Inspect the liquidation execution receipt:
   * Keeper bot bounty: `+$45.20 USDC`
   * Insurance fund absorbed delta: `-$163.04`
   * Zero socialized bad debt!

---

### ⏱️ Step D: The Funding Engine (`/funding`)
1. **Watch the Block Heartbeat:**
   * Look at the horizontal conveyor belt of mined EVM blocks scrolling in real time.
   * Each block displays: Block #, Mark Price, Index Price, Premium %, and $\Delta\text{cumIndex}$.
2. **Inspect the Formula Card:**
   * See live variables calculated in real time:
     $$\text{premium} = \frac{\text{mark} - \text{index}}{\text{index}}$$
     $$\text{cumIndex} \mathrel{+}= \text{clamp}(\text{premium}) \times \frac{\text{blocks}}{\text{period}}$$
     $$\text{cashflow} = \text{size} \times \Delta\text{cumIndex}$$
3. **Test the 8-Hour Scrubber Slider:**
   * Drag the time slider across the 8-hour period.
   * Notice that CEX traders pay $0 until the sudden cliff spike at 08:00 UTC, while BlockPerp traders enjoy continuous smooth carry with zero cliff risk.
4. **Replay the 7-Day Time Machine:**
   * Toggle block times (`0.25s`, `2s`, `12s`).
   * See dollar savings and tracking error reduction calculated from real 1m ETHUSDT klines.

---

### 🛡️ Step E: The Credit Passport (`/credit`)
1. View your **Elevation Tier Card** showing altitude in meters, composite score, and attested hash.
2. Inspect the **4 Onchain Scoring Signals**:
   * Account Longevity (Days onchain)
   * Historical Volume (DeFi volume)
   * Margin Discipline (Liquidation defaults)
   * Transaction Cadence (Gas nonces)
3. Use the **What-If Tier Simulation Slider** to test how increasing volume or maintaining 0 defaults unlocks the Summit 20x tier.

---

### 📜 Step F: Verify Receipts & Lifecycle Trace (`/verify`)
1. Follow the 6-step pipeline: *Signed → Vault check → Credit tier → Match → Fill → Event*.
2. Click **"Simulate Risk Revert"** to test how `CreditRisk.sol` catches invalid leverage and reverts cleanly with zero loss.
3. Review the **Verifiable Receipt Ledger** with copyable hashes, gas used, and emitted event logs.

---

### 🔊 Step G: Audio & Demo Tour
* **Sound FX:** Click the Speaker icon in the top bar to toggle Web Audio procedural sound chimes.
* **60s Judge Tour:** Click **"60s Demo Tour"** in the top bar to launch an automated guided walkthrough.
