'use client';

import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' ||
          target.closest('button') !== null ||
          target.closest('a') !== null;
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const smoothFollow = () => {
      // Eased smooth lag trailing behind cursor
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(smoothFollow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animationFrameId = requestAnimationFrame(smoothFollow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* Outer ambient aura glow (soft trailing shadow) */}
      <div
        className="absolute rounded-full blur-[70px] transition-opacity duration-300"
        style={{
          width: isPointer ? '340px' : '260px',
          height: isPointer ? '340px' : '260px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: isPointer
            ? 'radial-gradient(circle, rgba(242, 140, 40, 0.18) 0%, rgba(45, 212, 191, 0.08) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(45, 212, 191, 0.16) 0%, rgba(31, 138, 153, 0.06) 60%, transparent 80%)',
          opacity: pos.x < 0 ? 0 : 1,
        }}
      />

      {/* Inner sharp cursor shadow focal dot */}
      <div
        className="absolute rounded-full blur-[2px] transition-transform duration-150"
        style={{
          width: isClicking ? '28px' : isPointer ? '20px' : '10px',
          height: isClicking ? '28px' : isPointer ? '20px' : '10px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: isPointer
            ? 'rgba(255, 180, 84, 0.65)'
            : 'rgba(45, 212, 191, 0.55)',
          boxShadow: isPointer
            ? '0 0 15px rgba(242, 140, 40, 0.8), 0 0 30px rgba(242, 140, 40, 0.4)'
            : '0 0 15px rgba(45, 212, 191, 0.8), 0 0 30px rgba(45, 212, 191, 0.4)',
          opacity: pos.x < 0 ? 0 : 0.85,
        }}
      />
    </div>
  );
}
