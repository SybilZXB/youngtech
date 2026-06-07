"use client";

import { motion } from "framer-motion";

export default function YoloSection() {
  return (
    <section className="py-28 md:py-40 bg-dark overflow-hidden">
      {/* Scrolling ticker */}
      <div className="mb-20 md:mb-32 overflow-hidden border-y border-sand/8 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, gi) =>
            ["YOLO", "YOU ONLY LIVE ONCE", "YOUNG TECH WITH U", "轻出发", "向自然生长"].map((w, i) => (
              <span key={`${gi}-${i}`} className="text-sand/20 text-xs tracking-[0.35em] uppercase px-8 font-light">
                {w}<span className="ml-8 text-sand/10">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-label mb-10 text-sand/30"
        >
          You Only Live Once
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-sand leading-none tracking-tight mb-8"
          style={{ fontSize: "clamp(5rem, 20vw, 18rem)", letterSpacing: "-0.04em" }}
        >
          YOLO
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sand/50 text-lg md:text-2xl font-light mb-6"
        >
          你只活一次。所以，<span className="text-sand">轻出发，向自然生长。</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs tracking-[0.4em] text-sand/25 uppercase"
        >
          Young Tech with U
        </motion.p>
      </div>
    </section>
  );
}
