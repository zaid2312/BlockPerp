'use client';

import React, { useState, useRef } from 'react';
import { useBlockPerpStore } from '@/lib/store';
import { 
  BarChart2, 
  TrendingUp, 
  Activity, 
  Maximize2, 
  Eye, 
  Layers, 
  Sparkles,
  Sliders
} from 'lucide-react';

export default function PriceChart() {
  const { markPrice, indexPrice, priceHistory, currentBlock } = useBlockPerpStore();
  
  const [activeInterval, setActiveInterval] = useState('1m');
  const [chartMode, setChartMode] = useState<'candles' | 'area'>('candles');
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    price: number;
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const history = priceHistory.slice(-48);
  const minPrice = Math.min(...history.map(h => h.low), indexPrice) * 0.9992;
  const maxPrice = Math.max(...history.map(h => h.high), markPrice) * 1.0008;
  const range = maxPrice - minPrice || 1;

  const chartWidth = 820;
  const chartHeight = 360;
  const candleSpacing = chartWidth / (history.length || 1);
  const candleWidth = Math.max(6, candleSpacing * 0.65);

  // 24h stats calculated from history
  const high24h = Math.max(...history.map(h => h.high), markPrice);
  const low24h = Math.min(...history.map(h => h.low), indexPrice);
  const totalVol = history.reduce((acc, h) => acc + h.volume, 0).toFixed(1);

  // Generate SVG smooth area path for area mode
  const points = history.map((candle, idx) => {
    const x = idx * candleSpacing + candleSpacing / 2;
    const y = 30 + ((maxPrice - candle.close) / range) * 260;
    return `${x},${y}`;
  });
  const areaPathD = points.length > 0 
    ? `M ${points[0]} L ${points.join(' L ')} L ${chartWidth},300 L 0,300 Z` 
    : '';
  const linePathD = points.length > 0 
    ? `M ${points.join(' L ')}` 
    : '';

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * chartWidth;
    
    const index = Math.min(
      history.length - 1, 
      Math.max(0, Math.floor(svgX / candleSpacing))
    );
    const candle = history[index];
    if (candle) {
      const y = 30 + ((maxPrice - candle.close) / range) * 260;
      const date = new Date(candle.time * 1000);
      setHoverData({
        x: index * candleSpacing + candleSpacing / 2,
        y,
        price: candle.close,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
        time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="p-5 rounded-3xl glass-panel border border-white/10 flex flex-col h-[520px] shadow-2xl relative select-none">
      
      {/* Top Header Controls Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 font-mono text-xs">
        
        {/* Market Title & Real Tickers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white text-sm">
            <span className="text-teal-bright">ETH-PERP</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal/20 text-teal-bright border border-teal/30">
              PYTH ONCHAIN
            </span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div>
              <span className="text-coolgray-400 text-[10px] block">MARK</span>
              <span className="text-teal-bright font-bold">${markPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-coolgray-400 text-[10px] block">INDEX</span>
              <span className="text-coolgray-200">${indexPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 24h High, Low & Volume HUD */}
        <div className="hidden xl:flex items-center gap-4 text-[11px] text-coolgray-400">
          <div>24h High: <span className="text-white">${high24h.toFixed(2)}</span></div>
          <div>24h Low: <span className="text-white">${low24h.toFixed(2)}</span></div>
          <div>24h Vol: <span className="text-white">{totalVol} ETH</span></div>
        </div>

        {/* Timeframes & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Chart Display Mode Toggle */}
          <div className="flex items-center bg-background-deep p-0.5 rounded-lg border border-white/5 text-[11px]">
            <button
              onClick={() => setChartMode('candles')}
              className={`px-2 py-1 rounded transition-colors ${
                chartMode === 'candles' ? 'bg-teal/20 text-teal-bright font-bold' : 'text-coolgray-400 hover:text-white'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartMode('area')}
              className={`px-2 py-1 rounded transition-colors ${
                chartMode === 'area' ? 'bg-teal/20 text-teal-bright font-bold' : 'text-coolgray-400 hover:text-white'
              }`}
            >
              Mountain Area
            </button>
          </div>

          {/* Timeframes */}
          <div className="flex items-center bg-background-deep p-0.5 rounded-lg border border-white/5 text-[11px]">
            {['1m', '5m', '15m', '1h', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveInterval(tf)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeInterval === tf ? 'bg-teal/20 text-teal-bright font-bold' : 'text-coolgray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Hover OHLC HUD Bar */}
      <div className="h-6 mt-1 flex items-center justify-between text-[11px] font-mono text-coolgray-400">
        {hoverData ? (
          <div className="flex items-center gap-3">
            <span className="text-teal-bright">T: {hoverData.time}</span>
            <span>O: <strong className="text-white">${hoverData.open.toFixed(2)}</strong></span>
            <span>H: <strong className="text-white">${hoverData.high.toFixed(2)}</strong></span>
            <span>L: <strong className="text-white">${hoverData.low.toFixed(2)}</strong></span>
            <span>C: <strong className="text-teal-bright">${hoverData.close.toFixed(2)}</strong></span>
            <span>Vol: <strong className="text-coolgray-300">{hoverData.volume.toFixed(2)}</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-coolgray-500">
            <Activity className="w-3.5 h-3.5 text-teal-bright animate-pulse" />
            <span>Hover chart for historical candle HUD • Synced to Pyth onchain feed</span>
          </div>
        )}
        <div className="text-[10px] text-teal-bright">
          Block #{currentBlock}
        </div>
      </div>

      {/* Main Interactive SVG Chart Canvas */}
      <div ref={containerRef} className="relative flex-1 w-full my-1 overflow-hidden">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-full cursor-crosshair select-none"
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* Mountain Teal Area Glow Gradient */}
            <linearGradient id="chartMountainGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#1F8A99" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0A1020" stopOpacity="0.0" />
            </linearGradient>

            {/* Neon line glow filter */}
            <filter id="neonTealGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines & price labels */}
          {[0.15, 0.35, 0.55, 0.75].map((pct, i) => {
            const y = pct * 280 + 20;
            const priceLevel = maxPrice - pct * range;
            return (
              <g key={i}>
                <line 
                  x1="0" 
                  y1={y} 
                  x2={chartWidth - 65} 
                  y2={y} 
                  stroke="rgba(255, 255, 255, 0.04)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={chartWidth - 60} 
                  y={y + 3} 
                  fill="#64748B" 
                  fontSize="10" 
                  fontFamily="JetBrains Mono"
                >
                  ${priceLevel.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Volume Histogram Bars at Bottom */}
          {history.map((candle, idx) => {
            const x = idx * candleSpacing + (candleSpacing - candleWidth) / 2;
            const maxVol = 70;
            const barHeight = Math.min(50, (candle.volume / maxVol) * 50);
            const y = chartHeight - barHeight - 10;
            const isGreen = candle.close >= candle.open;

            return (
              <rect
                key={`vol-${idx}`}
                x={x}
                y={y}
                width={candleWidth}
                height={barHeight}
                fill={isGreen ? '#2DD4BF' : '#E5484D'}
                opacity="0.22"
                rx="1"
              />
            );
          })}

          {/* Mode 1: Mountain Glow Area */}
          {chartMode === 'area' && (
            <g>
              <path 
                d={areaPathD} 
                fill="url(#chartMountainGlow)" 
                className="transition-all duration-300"
              />
              <path 
                d={linePathD} 
                fill="none" 
                stroke="#2DD4BF" 
                strokeWidth="2.5" 
                filter="url(#neonTealGlow)"
                className="transition-all duration-300"
              />
            </g>
          )}

          {/* Mode 2: Professional Candlesticks */}
          {chartMode === 'candles' && history.map((candle, idx) => {
            const x = idx * candleSpacing + (candleSpacing - candleWidth) / 2;
            const isGreen = candle.close >= candle.open;
            const openY = 30 + ((maxPrice - candle.open) / range) * 260;
            const closeY = 30 + ((maxPrice - candle.close) / range) * 260;
            const highY = 30 + ((maxPrice - candle.high) / range) * 260;
            const lowY = 30 + ((maxPrice - candle.low) / range) * 260;

            const rectY = Math.min(openY, closeY);
            const rectHeight = Math.max(2, Math.abs(openY - closeY));
            const color = isGreen ? '#2DD4BF' : '#E5484D';

            return (
              <g key={`candle-${idx}`} className="transition-all duration-200">
                {/* Candle Wick */}
                <line 
                  x1={x + candleWidth / 2} 
                  y1={highY} 
                  x2={x + candleWidth / 2} 
                  y2={lowY} 
                  stroke={color} 
                  strokeWidth="1.2" 
                />
                {/* Candle Body */}
                <rect 
                  x={x} 
                  y={rectY} 
                  width={candleWidth} 
                  height={rectHeight} 
                  fill={color} 
                  rx="1.5" 
                  opacity="0.9" 
                />
              </g>
            );
          })}

          {/* Live Current Mark Price Glowing Dashed Line & Pulse Radar */}
          {(() => {
            const currentY = 30 + ((maxPrice - markPrice) / range) * 260;
            return (
              <g>
                <line 
                  x1="0" 
                  y1={currentY} 
                  x2={chartWidth - 65} 
                  y2={currentY} 
                  stroke="#2DD4BF" 
                  strokeWidth="1.4" 
                  strokeDasharray="4 4" 
                />
                {/* Animated Pulsing Beacon Dot */}
                <circle cx={chartWidth - 75} cy={currentY} r="6" fill="#2DD4BF" opacity="0.3" className="animate-ping" />
                <circle cx={chartWidth - 75} cy={currentY} r="3" fill="#2DD4BF" />

                {/* Right price pill */}
                <rect x={chartWidth - 65} y={currentY - 10} width="65" height="20" rx="5" fill="#2DD4BF" />
                <text x={chartWidth - 61} y={currentY + 4} fill="#0A1020" fontSize="10.5" fontFamily="JetBrains Mono" fontWeight="bold">
                  ${markPrice.toFixed(1)}
                </text>
              </g>
            );
          })()}

          {/* Index Price Dotted Line */}
          {(() => {
            const indexY = 30 + ((maxPrice - indexPrice) / range) * 260;
            return (
              <line 
                x1="0" 
                y1={indexY} 
                x2={chartWidth - 65} 
                y2={indexY} 
                stroke="#F28C28" 
                strokeWidth="1" 
                strokeDasharray="2 3" 
                opacity="0.75" 
              />
            );
          })()}

          {/* Interactive Mouse Hover Crosshair */}
          {hoverData && (
            <g>
              {/* Vertical line */}
              <line 
                x1={hoverData.x} 
                y1="0" 
                x2={hoverData.x} 
                y2={chartHeight - 15} 
                stroke="rgba(255, 255, 255, 0.3)" 
                strokeDasharray="2 2" 
              />
              {/* Horizontal line */}
              <line 
                x1="0" 
                y1={hoverData.y} 
                x2={chartWidth - 65} 
                y2={hoverData.y} 
                stroke="rgba(255, 255, 255, 0.3)" 
                strokeDasharray="2 2" 
              />
              {/* Cursor focal point circle */}
              <circle cx={hoverData.x} cy={hoverData.y} r="4" fill="#FFFFFF" stroke="#2DD4BF" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      {/* Chart Footer: Legend */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-coolgray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-teal-bright rounded" /> Mark Price (Pyth)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-sunrise rounded" /> Spot Index Price
          </span>
        </div>
        <div className="text-coolgray-400">
          Fast-Finality Block Settlement: ~1.5s
        </div>
      </div>

    </div>
  );
}
