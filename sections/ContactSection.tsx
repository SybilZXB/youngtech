"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const details = [
  { label: "商务合作 · BUSINESS", value: "hi@youngtech.com", href: "mailto:hi@youngtech.com" },
  { label: "品牌合作 · PR", value: "pr@youngtech.com", href: "mailto:pr@youngtech.com" },
  { label: "所在地 · Based in", value: "中国 · 源起西藏", href: null },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-sand">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-24 md:pb-36">

        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-24 md:mb-40"
        >
          <div className="section-number mb-2">.04</div>
          <div className="section-label">联系我们 · Contact</div>
        </motion.div>

        {/* Hero statement — generous whitespace */}
        <div className="mb-28 md:mb-48">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-bold text-ink"
            style={{ fontSize: "clamp(2rem, 7vw, 7rem)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            准备好
            <br />
            <span className="text-accent">探索未知</span> 了吗？
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-14 md:mt-20"
          >
            <p className="body-lg max-w-sm">
              商务合作、渠道分销与媒体咨询，<br className="hidden md:block" />我们期待与每一位探索者对话。
            </p>
          </motion.div>
        </div>

        {/* Details row — airy, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-border pt-12"
        >
          {details.map((d) => (
            <div key={d.label}>
              <div className="section-label mb-4">{d.label}</div>
              {d.href ? (
                <a
                  href={d.href}
                  className="text-lg md:text-xl font-medium text-ink hover:text-accent transition-colors tracking-tight"
                >
                  {d.value}
                </a>
              ) : (
                <span className="text-lg md:text-xl font-medium text-ink tracking-tight">{d.value}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Oversized wordmark — quiet, lots of air */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="mt-32 md:mt-52"
        >
          <div
            className="font-bold text-ink/[0.07] hover:text-accent/90 transition-colors duration-500 leading-none tracking-tighter select-none cursor-default"
            style={{ fontSize: "clamp(3.5rem, 17vw, 17rem)" }}
          >
            YOUNG TECH
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.25em] text-ink-3 uppercase">
            <span>氧太科技</span>
            <span className="text-border">/</span>
            <span>Young Tech with U</span>
            <span className="text-border">/</span>
            <span>源起西藏 · 为极限而生</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
