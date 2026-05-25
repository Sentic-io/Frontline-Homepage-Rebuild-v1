"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowUpRight } from "lucide-react";

const rows = [
  { label: "Long evaluations", others: true, frontline: false, frontlineLabel: "Instant funding available" },
  { label: "7+ days to get paid", others: true, frontline: false, frontlineLabel: "Fast payouts" },
  { label: "High activation fees", others: true, frontline: false, frontlineLabel: "No activation fees" },
  { label: "2+ days to pass", others: true, frontline: false, frontlineLabel: "Pass in just 1 day (Rapid)" },
  { label: "Hidden rules", others: true, frontline: false, frontlineLabel: "No hidden rules" },
  { label: "Payout denials", others: true, frontline: false, frontlineLabel: "No payout denials" },
];

export function Comparison() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#668fd6] mb-4">
            The difference
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#e0e0e0] uppercase max-w-md leading-tight">
            No hidden rules
            <br />
            or extra fees.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/8 rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#111] border-b border-white/8 px-6 py-4">
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#777] col-span-1">
              Feature
            </div>
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#777] text-center">
              Other Prop Firms
            </div>
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#668fd6] text-center">
              Frontline
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-3 items-center px-6 py-4 border-b border-white/5 last:border-0 ${
                i % 2 === 0 ? "bg-[#0b0b0b]" : "bg-[#090909]"
              }`}
            >
              <span className="text-sm text-[#888]">{row.label}</span>
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                  <X className="w-3 h-3 text-[#444]" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#668fd6]/10">
                  <Check className="w-3 h-3 text-[#668fd6]" />
                </div>
                <span className="text-[10px] text-[#668fd6] text-center font-mono hidden sm:block mt-0.5">
                  {row.frontlineLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Discount CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-white/8 rounded-xl bg-[#111]"
        >
          <div>
            <p className="text-sm font-semibold text-[#e0e0e0]">
              Save $24 with code{" "}
              <span className="text-[#668fd6] font-black tracking-widest">FREEDOM</span>
            </p>
            <p className="text-sm text-[#777] mt-0.5">
              One-time discount on your first challenge.
            </p>
          </div>
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-linear-to-r from-[#4a70b0] via-[#668fd6] to-[#7aa0e0] opacity-40 blur transition-opacity duration-500 group-hover:opacity-80 rounded-full pointer-events-none" />
            <a
              href="#pricing"
              className="relative z-10 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full overflow-hidden bg-zinc-900 border border-white/12 text-sm font-bold text-white uppercase tracking-wide hover:border-white/22 transition-all duration-200 whitespace-nowrap"
            >
              <span>Start Instant 10K Challenge</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
