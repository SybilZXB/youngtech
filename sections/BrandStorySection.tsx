"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  { idx: "01", en: "Young",       zh: "年轻",   desc: "年轻不是年龄，而是一种好奇、行动、不设限的状态。", accent: false },
  { idx: "02", en: "Tech",        zh: "科技",   desc: "技术的价值，不在炫技，而在于让每一次体验更可依赖。", accent: false },
  { idx: "03", en: "Outdoor",     zh: "户外",   desc: "山野、风、光与呼吸感，是我们最重要的设计起点。", accent: false },
  { idx: "04", en: "Human First", zh: "以人为本", desc: "无论技术如何演进，最终都要回到真实体验与情绪感受。", accent: true },
];

// Dot positions are calibrated on the K2 base-camp full-mountain photo (4:3 portrait crop used as 16/7 banner).
// x=left%, y=top% within the image container.
const stations = [
  {
    id: "sea", altLabel: "0 m", label: "海平面", sub: "Sea Level",
    o2: "20.9%", barPct: 100,
    desc: "标准大气含氧量，所有探索旅程的起点。身体处于最舒适的状态，生理机能满负荷运转。",
    // bottom-left — represents the vast plains below
    dot: { x: 10, y: 82 },
    // callout opens to the right
    callout: { side: "right" },
  },
  {
    id: "alpine", altLabel: "3,000 m", label: "高山地带", sub: "Alpine Zone",
    o2: "14.3%", barPct: 68,
    desc: "含氧量明显下降，早期高原反应开始出现。氧太自适应监测系统在此刻静默启动。",
    dot: { x: 28, y: 65 },
    callout: { side: "right" },
  },
  {
    id: "death", altLabel: "5,000 m", label: "接近死亡地带", sub: "Near Death Zone",
    o2: "10.8%", barPct: 52,
    desc: "临界区域。智能氧气系统实时计算并提供精准的补充氧气流量，将每一口吸入变得可控。",
    dot: { x: 46, y: 45 },
    callout: { side: "right" },
  },
  {
    id: "summit", altLabel: "8,848 m", label: "珠峰之巅", sub: "Everest Summit",
    o2: "6.9%", barPct: 33,
    desc: "人类耐力的极限。唯有装备氧太科技的探险者，才能在此保持完整的认知能力。",
    // near the K2 summit in the photo
    dot: { x: 54, y: 10 },
    callout: { side: "left" },
  },
];

function AltitudeMap() {
  const [active, setActive] = useState<number | null>(null);

  const handleDot = (i: number) => setActive(active === i ? null : i);

  return (
    <div className="mt-28 md:mt-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h3 className="section-heading text-ink">
          从海平面，<br />到世界之巅。
        </h3>
        <p className="body-sm mt-4 text-ink-3">点击山峰节点，感受不同海拔的含氧量与身体状态。</p>
      </motion.div>

      {/* Photo map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        {/* mountain photo */}
        <Image
          src="/mountains/k2.jpg"
          alt="K2 — 乔戈里峰 8611m"
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />

        {/* cinematic grade */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(5,10,18,0.38) 0%, rgba(5,10,18,0.05) 40%, rgba(5,10,18,0.62) 100%)"
        }} />

        {/* dashed connecting line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <line
            x1={`${stations[0].dot.x}%`} y1={`${stations[0].dot.y}%`}
            x2={`${stations[3].dot.x}%`} y2={`${stations[3].dot.y}%`}
            stroke="rgba(155,212,245,0.35)" strokeWidth="1" strokeDasharray="5 9"
          />
        </svg>

        {/* dots */}
        {stations.map((s, i) => {
          const isActive = active === i;
          return (
            <button
              key={s.id}
              onClick={() => handleDot(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${s.dot.x}%`, top: `${s.dot.y}%` }}
              aria-label={`${s.label} ${s.altLabel}`}
            >
              {/* pulse ring */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-accent-ice"
                  animate={{ scale: [1, 3.2], opacity: [0.8, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}

              {/* dot */}
              <span className={`block w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${
                isActive ? "bg-accent scale-125" : "bg-white/70 group-hover:bg-accent group-hover:scale-110"
              }`} />

              {/* altitude micro-label — always visible */}
              <span
                className="absolute whitespace-nowrap font-mono text-white/75 pointer-events-none select-none"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  left: s.callout.side === "right" ? "16px" : "auto",
                  right: s.callout.side === "left"  ? "16px" : "auto",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {s.altLabel}
              </span>
            </button>
          );
        })}

        {/* floating callout — near the active dot */}
        <AnimatePresence>
          {active !== null && (() => {
            const s = stations[active];
            const isLeft = s.callout.side === "left";
            const dotX = s.dot.x;
            const dotY = s.dot.y;
            // position callout: right or left of dot, push up if near bottom
            const calloutLeft = isLeft ? undefined : Math.min(dotX + 4, 60);
            const calloutRight = isLeft ? Math.min(100 - dotX + 4, 60) : undefined;
            const calloutTop = dotY > 65 ? undefined : dotY;
            const calloutBottom = dotY > 65 ? (100 - dotY + 2) : undefined;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-20 w-52 md:w-64 pointer-events-none"
                style={{
                  left:   calloutLeft   !== undefined ? `${calloutLeft}%`   : undefined,
                  right:  calloutRight  !== undefined ? `${calloutRight}%`  : undefined,
                  top:    calloutTop    !== undefined ? `${calloutTop}%`    : undefined,
                  bottom: calloutBottom !== undefined ? `${calloutBottom}%` : undefined,
                }}
              >
                <div className="bg-dark/85 backdrop-blur-lg p-5 md:p-6 border border-sand/10">
                  {/* zone label */}
                  <div className="section-label text-accent-ice mb-1">{s.sub}</div>

                  {/* altitude */}
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
                      {s.altLabel.replace(" m", "")}
                    </span>
                    <span className="text-base text-white/60 font-medium">m</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-4">{s.label}</div>

                  {/* O₂ bar */}
                  <div className="flex justify-between text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
                    <span>大气含氧量</span>
                    <span className="text-accent-ice font-semibold">{s.o2}</span>
                  </div>
                  <div className="h-0.5 bg-white/10 mb-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-ice"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.barPct}%` }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* description */}
                  <p className="text-white/55 text-xs leading-relaxed">{s.desc}</p>
                </div>

                {/* small connector arrow toward the dot */}
                <div
                  className="absolute top-5 w-0 h-0"
                  style={{
                    [isLeft ? "right" : "left"]: "-5px",
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    [isLeft ? "borderRight" : "borderLeft"]: "5px solid rgba(15,15,13,0.85)",
                  }}
                />
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* photo credit */}
        <div className="absolute bottom-2 right-3 text-[9px] tracking-wide text-white/25 pointer-events-none select-none">
          K2 · 乔戈里峰 8,611 m · Photo CC
        </div>
      </motion.div>
    </div>
  );
}

export default function BrandStorySection() {
  return (
    <section id="story" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <div className="section-number mb-2">.01</div>
          <div className="section-label">品牌故事 · Brand Story</div>
        </motion.div>

        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-heading text-ink">
              西藏，是我们<br />品牌的精神来源。
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="body-lg mb-6">
              西藏的辽阔心境、纯净感受与本真自然，成为我们理解产品的方式——不为过度设计，只为真实需求。
            </p>
            <p className="body-sm">
              每一件氧太产品，都源于对人与自然关系的尊重。我们相信，科技应当让人更自由地走进山野，而非隔绝其间。轻出发，向自然生长。
            </p>
          </motion.div>
        </div>

        {/* YOUNG TECH OUTDOOR — brand pillars */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label mb-10"
          >
            YOUNG TECH OUTDOOR
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="border-t-2 border-ink pt-6"
              >
                <div className="section-number mb-3">.{p.idx}</div>
                <h3 className={`text-xl font-bold mb-1 ${p.accent ? "text-accent" : "text-ink"}`}>{p.en}</h3>
                <p className="text-xs text-ink-3 tracking-widest uppercase mb-4">{p.zh}</p>
                <p className="body-sm text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Altitude journey — interactive mountain photo */}
        <AltitudeMap />
      </div>
    </section>
  );
}
