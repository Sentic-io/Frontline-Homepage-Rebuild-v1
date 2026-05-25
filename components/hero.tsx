"use client";

import React, { useEffect, useRef, Suspense, lazy } from "react";
import { ArrowUpRight } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function SplineBackground() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    >
      <Spline
        style={{ width: "100%", height: "100vh", pointerEvents: "auto" }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      {/* Blocks touch input on touchscreen devices — pointer-events:none on desktop so mouse drag still works */}
      <div className="spline-touch-blocker" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />
      {/* Edge + bottom fade so content below reads clean */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: `
            linear-gradient(to right, rgba(9,9,9,0.82), transparent 28%, transparent 70%, rgba(9,9,9,0.82)),
            linear-gradient(to bottom, rgba(9,9,9,0.30) 0%, transparent 20%, transparent 52%, rgba(9,9,9,1) 96%)
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function LogoDisplay({
  logoRef,
}: {
  logoRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={logoRef} className="flex items-center justify-center py-20 px-6">
      <div className="relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(102,143,214,0.14) 0%, transparent 70%)",
            filter: "blur(20px)",
            transform: "scale(1.6)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-white.png"
          alt="Frontline"
          className="relative w-[200px] sm:w-[300px] lg:w-[400px] h-auto object-contain opacity-70"
        />
      </div>
    </div>
  );
}

export function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        // Skip translateY parallax on touch — JS-driven transform on scroll causes
        // dropped frames on mobile because the element isn't compositor-promoted
        if (!isTouch && logoRef.current) {
          logoRef.current.style.transform = `translateY(-${scrollY * 0.4}px)`;
        }
        if (heroContentRef.current) {
          const opacity = 1 - Math.min(scrollY / 360, 1);
          heroContentRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Full-screen Spline galaxy */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-auto bg-[#090909]">
          <Suspense fallback={<div className="w-full h-screen bg-[#090909]" />}>
            <SplineBackground />
          </Suspense>
        </div>

        {/* Content overlay — fades as user scrolls */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 z-10 flex items-center pointer-events-none"
          style={{ transition: "opacity 0.04s linear" }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 sm:px-10">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(3.4rem,8.5vw,7.8rem)] font-black leading-[0.87] tracking-[-0.035em] text-white uppercase">
                GET
                <br />
                <span className="text-[#668fd6]">FUNDED.</span>
                <br />
                KEEP MORE.
              </h1>

              <p className="mt-7 text-[#b0b0b0] text-lg sm:text-xl max-w-[440px] leading-relaxed font-normal">
                Up to{" "}
                <span className="text-white font-semibold">$150,000</span>{" "}
                in funding. Keep up to{" "}
                <span className="text-white font-semibold">95%</span>{" "}
                of your profits. Clear rules, instant payouts.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap gap-3 pointer-events-auto">
                {/* Primary — ButtonColorful */}
                <div className="relative group">
                  <div className="absolute inset-0 -m-1 rounded-full bg-linear-to-r from-[#4a70b0] via-[#668fd6] to-[#7aa0e0] opacity-40 blur transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" />
                  <a
                    href="#"
                    className="relative z-10 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-zinc-900 border border-white/12 text-white text-sm font-bold uppercase tracking-widest hover:border-white/22 transition-all duration-200 overflow-hidden"
                  >
                    Get Funded Now
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
                  </a>
                </div>

                {/* Secondary */}
                <a
                  href="#"
                  className="inline-flex items-center h-12 px-6 text-sm font-medium text-[#aaa] border border-white/12 rounded-full hover:text-white hover:border-white/24 transition-all duration-200 bg-black/20 pointer-events-auto"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  How it works
                </a>
              </div>

              {/* Stat strip */}
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 pointer-events-auto">
                {[
                  { label: "Max Funding", value: "$150K" },
                  { label: "Profit Split", value: "Up to 95%" },
                  { label: "Evaluation", value: "Instant or 72hr" },
                  { label: "Min Payout", value: "$200" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] text-[#555] uppercase tracking-widest">
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold text-[#d0d0d0] tracking-tight uppercase">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div
            style={{
              width: 1,
              height: 50,
              background:
                "linear-gradient(to bottom, rgba(102,143,214,0.5), transparent)",
              animation: "flowHint 2.2s infinite ease-in-out",
            }}
          />
        </div>
      </div>

      {/* Logo parallax section */}
      <div className="relative z-10" style={{ marginTop: "-10vh" }}>
        <LogoDisplay logoRef={logoRef} />
      </div>

      <style>{`
        @keyframes flowHint {
          0%,100%{transform:scaleY(0);transform-origin:top}
          48%{transform:scaleY(1);transform-origin:top}
          52%{transform:scaleY(1);transform-origin:bottom}
        }
        @media (pointer: coarse) {
          .spline-touch-blocker { pointer-events: auto !important; }
        }
      `}</style>
    </div>
  );
}
