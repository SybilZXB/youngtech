"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8848", unit: "m", label: "极限海拔" },
  { value: "99.2", unit: "%", label: "血氧浓度" },
  { value: "−40", unit: "°C", label: "工作温度" },
  { value: "10", unit: "H", label: "极限续航" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-sand">
      <div className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-32 pb-16">

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="section-label mb-16"
        >
          YOUNG TECH · 氧太科技 · Founded 2026 · From Tibet
        </motion.div>

        {/* Headline */}
        <div className="mb-10">
          {["探索者，", "从不等待", "准备好的那天。"].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: "102%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="display-cjk text-ink block"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Sub row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="body-lg max-w-md">
            源起西藏的户外科技品牌，专注于极端环境下的智能装备，让每次探索更安全、更深入、更自由。
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <a href="#products" className="btn-dark">
              探索产品 →
            </a>
            <a href="#story" className="text-sm tracking-[0.12em] text-ink-3 hover:text-ink transition-colors">
              品牌故事
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.9 }}
        className="border-t border-border"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex gap-12 md:gap-20">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-2xl md:text-3xl font-bold text-ink tracking-tight">{stat.value}</span>
                <span className="text-sm font-medium text-accent ml-0.5">{stat.unit}</span>
              </div>
              <div className="section-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
