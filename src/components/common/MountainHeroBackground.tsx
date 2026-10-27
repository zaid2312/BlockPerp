'use client';

import React, { useEffect, useState } from 'react';
import { useBlockPerpStore } from '@/lib/store';

export default function MountainHeroBackground({ isSubtle = false }: { isSubtle?: boolean }) {
  const currentBlock = useBlockPerpStore((s) => s.currentBlock);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Aurora radial glow blobs */}
      <div 
        className="absolute -top-32 left-1/4 w-[650px] h-[450px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #2DD4BF 0%, #1F8A99 50%, transparent 80%)',
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />
      <div 
        className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #F28C28 0%, #FFB454 40%, transparent 75%)',
          transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Glowing "Block Counter" Orb / Mountain Dawn Sun */}
      {!isSubtle && (
        <div 
          className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-transform duration-700"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 0.2}px), ${mousePos.y * 0.2}px)`,
          }}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center">
            {/* Sunrise halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sunrise/40 via-sunrise-light/20 to-transparent blur-2xl animate-pulse-slow" />
            <div className="absolute inset-4 rounded-full border border-sunrise/30 bg-gradient-to-b from-sunrise/20 to-transparent backdrop-blur-sm" />
            
            {/* Core block counter orb */}
            <div className="relative z-10 text-center px-4 py-2 rounded-xl bg-background-deep/80 border border-sunrise/40 shadow-sunrise-glow">
              <span className="text-[10px] uppercase tracking-widest text-sunrise-light font-mono block">EVM MINED BLOCK</span>
              <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-wider">#{currentBlock}</span>
              <span className="text-[9px] text-teal-bright flex items-center justify-center gap-1 font-mono mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-bright animate-ping" /> FAST FINALITY
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Procedural Isometric "Block" Cubes */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1F8A99" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="orangeCubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB454" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F28C28" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Drifting Cube 1 */}
          <g transform={`translate(${150 + mousePos.x * -0.6}, ${180 + mousePos.y * -0.6}) scale(0.7)`}>
            <polygon points="40,10 70,25 40,40 10,25" fill="url(#cubeGrad)" stroke="#2DD4BF" strokeWidth="0.8" />
            <polygon points="10,25 40,40 40,75 10,60" fill="#0A1020" stroke="#2DD4BF" strokeWidth="0.8" opacity="0.8" />
            <polygon points="40,40 70,25 70,60 40,75" fill="#111A2E" stroke="#2DD4BF" strokeWidth="0.8" opacity="0.9" />
          </g>

          {/* Drifting Cube 2 */}
          <g transform={`translate(${windowWidthSafe(1100) + mousePos.x * 0.8}, ${140 + mousePos.y * 0.7}) scale(0.6)`}>
            <polygon points="40,10 70,25 40,40 10,25" fill="url(#orangeCubeGrad)" stroke="#F28C28" strokeWidth="0.8" />
            <polygon points="10,25 40,40 40,75 10,60" fill="#0A1020" stroke="#F28C28" strokeWidth="0.8" opacity="0.8" />
            <polygon points="40,40 70,25 70,60 40,75" fill="#111A2E" stroke="#F28C28" strokeWidth="0.8" opacity="0.9" />
          </g>
        </svg>
      </div>

      {/* Multi-layered Procedural SVG Mountain Ridgelines (The Summit Ledger) */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          height: isSubtle ? '220px' : '520px',
        }}
      >
        <svg 
          viewBox="0 0 1440 520" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sunrise backdrop glow gradient */}
            <linearGradient id="skySunrise" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F28C28" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#1F8A99" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0A1020" stopOpacity="0" />
            </linearGradient>

            {/* Back Mountain Layer (Furthest peaks) */}
            <linearGradient id="peakBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C2844" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0E1628" stopOpacity="0.9" />
            </linearGradient>

            {/* Mid Mountain Layer */}
            <linearGradient id="peakMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#132038" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0A1222" stopOpacity="0.98" />
            </linearGradient>

            {/* Front Mountain Layer (Foreground Summit) */}
            <linearGradient id="peakFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0D1629" />
              <stop offset="100%" stopColor="#060A14" />
            </linearGradient>
          </defs>

          {/* Horizon Sunrise Glow Band */}
          <rect y="160" width="1440" height="240" fill="url(#skySunrise)" />

          {/* Layer 1: Distant Everest/K2 Sharp Peaks (Parallax speed 0.15) */}
          <path
            d="M0 320 L120 250 L260 300 L380 200 L490 280 L620 180 L760 260 L920 160 L1060 250 L1200 170 L1340 270 L1440 220 L1440 520 L0 520 Z"
            fill="url(#peakBack)"
            stroke="#1F8A99"
            strokeWidth="0.75"
            strokeOpacity="0.3"
            style={{
              transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.08}px)`,
              transition: 'transform 0.1s linear',
            }}
          />

          {/* Layer 2: Mid Ridgeline with Digital Topo Contour Lines (Speed 0.3) */}
          <path
            d="M0 380 L180 290 L320 340 L450 260 L600 320 L750 230 L900 310 L1080 240 L1240 330 L1380 280 L1440 320 L1440 520 L0 520 Z"
            fill="url(#peakMid)"
            stroke="#2DD4BF"
            strokeWidth="0.9"
            strokeOpacity="0.4"
            style={{
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.15}px)`,
              transition: 'transform 0.1s linear',
            }}
          />

          {/* Layer 3: Foreground Summit Ridge with Block Ledger Facets (Speed 0.5) */}
          <path
            d="M0 430 L160 360 L290 410 L480 320 L660 390 L840 300 L1020 370 L1210 320 L1360 390 L1440 350 L1440 520 L0 520 Z"
            fill="url(#peakFront)"
            stroke="#F28C28"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            style={{
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.25}px)`,
              transition: 'transform 0.1s linear',
            }}
          />

          {/* Crest highlight dots on key summits */}
          <circle cx="620" cy="180" r="2.5" fill="#2DD4BF" className="animate-ping" />
          <circle cx="920" cy="160" r="3" fill="#FFB454" />
          <circle cx="750" cy="230" r="2" fill="#2DD4BF" />
          <circle cx="840" cy="300" r="3.5" fill="#F28C28" />
        </svg>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
    </div>
  );
}

function windowWidthSafe(fallback: number) {
  if (typeof window !== 'undefined') {
    return Math.min(window.innerWidth - 120, fallback);
  }
  return fallback;
}
