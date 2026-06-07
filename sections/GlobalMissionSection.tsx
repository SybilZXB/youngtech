"use client";

import { motion } from "framer-motion";

const locations = [
  { name: "喜马拉雅", sub: "Himalaya", alt: "8848 m" },
  { name: "安第斯山脉", sub: "Andes", alt: "6962 m" },
  { name: "阿拉斯加", sub: "Alaska", alt: "6190 m" },
  { name: "南极洲", sub: "Antarctica", alt: "4897 m" },
];

export default function GlobalMissionSection() {
  return (
    <section id="mission" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 md:mb-28 border-b border-border pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-number mb-2">.06</div>
            <div className="section-label mb-8">全球使命 · Global Mission</div>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="section-heading text-ink"
            >
              探索者所至，<br />皆有氧太。
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-sm max-w-xs md:text-right"
            >
              从世界屋脊到地球两极，氧太科技陪伴每一次远征。
            </motion.p>
          </div>
        </div>

        {/* Bold statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <blockquote
            className="font-bold text-ink leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            "技术的价值，不在实验室里被测量，<br className="hidden md:block" />
            而是在世界最高点、最冷的地方被证明。"
          </blockquote>
        </motion.div>

        {/* Locations grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="border-t border-border pt-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent mb-4" />
              <div className="text-lg font-bold text-ink mb-1">{loc.name}</div>
              <div className="text-xs text-ink-3 tracking-widest uppercase mb-2">{loc.sub}</div>
              <div className="text-sm font-semibold text-accent">{loc.alt}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
