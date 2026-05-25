"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  alphaSpeed: number;
  color: string;
}

const COLORS = [
  "rgba(255,255,255,",
  "rgba(102,143,214,",
  "rgba(160,190,240,",
  "rgba(200,220,255,",
  "rgba(130,160,210,",
];

function spawn(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    // Strong upward bias: ~85% of particles drift upward, all move noticeably
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.85) * 0.55,
    radius: Math.random() * 1.5 + 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    alphaDir: 1,
    // Faster twinkling for more visual energy
    alphaSpeed: Math.random() * 0.008 + 0.002,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const stateRef = useRef<{ particles: Particle[]; w: number; h: number }>({
    particles: [],
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const measure = () => {
      const w = window.innerWidth;
      const fullH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 4
      );
      // On mobile: cap canvas to 2× viewport — a full-page canvas at 60fps
      // forces the GPU to composite a 390×5000+ layer every frame, causing jank
      const h = isTouch ? Math.min(fullH, window.innerHeight * 2) : fullH;
      canvas.width = w;
      canvas.height = h;
      stateRef.current.w = w;
      stateRef.current.h = h;
      const maxParticles = isTouch ? 80 : 320;
      const count = Math.min(Math.floor((w * h) / 9000), maxParticles);
      stateRef.current.particles = Array.from({ length: count }, () => spawn(w, h));
    };

    measure();

    const onResize = () => {
      measure();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      const { particles, w, h } = stateRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;

        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha >= 0.65) { p.alpha = 0.65; p.alphaDir = -1; }
        if (p.alpha <= 0.04) { p.alpha = 0.04; p.alphaDir = 1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
