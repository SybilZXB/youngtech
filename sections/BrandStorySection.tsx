"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const pillars = [
  { idx: "01", en: "Young", zh: "年轻", desc: "年轻不是年龄，而是一种好奇、行动、不设限的状态。", accent: false },
  { idx: "02", en: "Tech", zh: "科技", desc: "技术的价值，不在炫技，而在于让每一次体验更可依赖。", accent: false },
  { idx: "03", en: "Outdoor", zh: "户外", desc: "山野、风、光与呼吸感，是我们最重要的设计起点。", accent: false },
  { idx: "04", en: "Human First", zh: "以人为本", desc: "无论技术如何演进，最终都要回到真实体验与情绪感受。", accent: true },
];

const zones = [
  { id: "sea", alt: 0, altLabel: "0 m", label: "海平面", sub: "Sea Level", o2: "20.9%", desc: "标准大气含氧量，所有探索旅程的起点。身体处于最舒适的状态。" },
  { id: "alpine", alt: 3000, altLabel: "3,000 m", label: "高山地带", sub: "Alpine Zone", o2: "14.3%", desc: "含氧量明显下降，早期高原反应开始出现。氧太自适应监测系统在此刻启动。" },
  { id: "death", alt: 5000, altLabel: "5,000 m", label: "接近死亡地带", sub: "Near Death Zone", o2: "10.8%", desc: "临界区域。智能氧气系统实时计算并提供精准的补充氧气流量。" },
  { id: "summit", alt: 8848, altLabel: "8,848 m", label: "珠峰之巅", sub: "Everest Summit", o2: "6.9%", desc: "人类耐力的极限。唯有装备氧太科技的探险者，才能在此保持完整的认知能力。" },
];

// SVG geometry — altitude → y on a 1000×500 canvas
const VB_W = 1000, VB_H = 500, GROUND = 462, TOP = 56;
const altToY = (alt: number) => GROUND - (alt / 8848) * (GROUND - TOP);
const stations = [
  { ...zones[0], x: 90 },
  { ...zones[1], x: 340 },
  { ...zones[2], x: 590 },
  { ...zones[3], x: 880 },
];

function AltitudeJourney() {
  const [active, setActive] = useState(3); // default: summit
  const z = stations[active];

  return (
    <div className="mt-28 md:mt-40">
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="section-heading text-ink mb-4"
      >
        从海平面，<br />到世界之巅。
      </motion.h3>
      <p className="body-sm mb-14 max-w-md">点击山峰节点，感受不同海拔的含氧量与身体状态。</p>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-center">
        {/* ── Illustration ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto select-none">
            <defs>
              <linearGradient id="rangeBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cfe3f2" />
                <stop offset="100%" stopColor="#dfe7ec" />
              </linearGradient>
              <linearGradient id="rangeFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8fb8d8" />
                <stop offset="100%" stopColor="#b7cad8" />
              </linearGradient>
            </defs>

            {/* altitude gridlines */}
            {zones.map((zn) => {
              const y = altToY(zn.alt);
              return (
                <g key={zn.id}>
                  <line x1="40" y1={y} x2={VB_W - 10} y2={y} stroke="#d8d6d0" strokeWidth="1" strokeDasharray="3 5" />
                  <text x={VB_W - 6} y={y - 6} textAnchor="end" className="fill-ink-3" style={{ fontSize: 16, fontWeight: 600 }}>
                    {zn.altLabel}
                  </text>
                </g>
              );
            })}

            {/* back range */}
            <motion.path
              d="M0,462 L150,330 L300,248 L470,300 L650,170 L820,205 L1000,118 L1000,462 Z"
              fill="url(#rangeBack)"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            {/* front range — ridge ascending through the stations */}
            <motion.path
              d={`M0,462 L${stations[0].x},${altToY(0)} L200,300 L${stations[1].x},${altToY(3000)} L460,210 L${stations[2].x},${altToY(5000)} L720,130 L${stations[3].x},${altToY(8848)} L1000,150 L1000,462 Z`}
              fill="url(#rangeFront)"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 }}
            />

            {/* snow caps on the high peaks */}
            <path d={`M${stations[3].x - 26},${altToY(8848) + 40} L${stations[3].x},${altToY(8848)} L${stations[3].x + 26},${altToY(8848) + 40} L${stations[3].x + 10},${altToY(8848) + 30} L${stations[3].x},${altToY(8848) + 40} L${stations[3].x - 10},${altToY(8848) + 30} Z`} fill="#ffffff" opacity="0.95" />
            <path d={`M${stations[2].x - 20},${altToY(5000) + 34} L${stations[2].x},${altToY(5000)} L${stations[2].x + 20},${altToY(5000) + 34} Z`} fill="#ffffff" opacity="0.8" />

            {/* station markers + cartoon flags */}
            {stations.map((s, i) => {
              const y = altToY(s.alt);
              const isActive = active === i;
              return (
                <g key={s.id} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                  {/* vertical connector */}
                  <line x1={s.x} y1={y} x2={s.x} y2={GROUND} stroke={isActive ? "#3A93D8" : "#c3c1ba"} strokeWidth={isActive ? 2 : 1} strokeDasharray="2 4" />
                  {/* hit area */}
                  <circle cx={s.x} cy={y} r="26" fill="transparent" />
                  {/* pulse */}
                  {isActive && <circle cx={s.x} cy={y} r="16" fill="#3A93D8" opacity="0.15" />}
                  {/* dot */}
                  <circle cx={s.x} cy={y} r={isActive ? 8 : 5} fill={isActive ? "#3A93D8" : "#111110"} />
                  <circle cx={s.x} cy={y} r={isActive ? 8 : 5} fill="none" stroke="#ffffff" strokeWidth="2" />
                  {/* label */}
                  <text x={s.x} y={y - 18} textAnchor="middle" style={{ fontSize: 17, fontWeight: 700 }} className={isActive ? "fill-accent" : "fill-ink"}>
                    {s.label}
                  </text>
                </g>
              );
            })}

            {/* ground line */}
            <line x1="0" y1={GROUND} x2={VB_W} y2={GROUND} stroke="#bdbbb4" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* ── Detail panel ── */}
        <motion.div
          key={z.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-sand border border-border p-8 md:p-10"
        >
          <div className="section-label mb-3">{z.sub}</div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl md:text-6xl font-bold text-ink tracking-tight">{z.altLabel.replace(" m", "")}</span>
            <span className="text-lg text-ink-2 font-medium">m</span>
          </div>
          <h4 className="text-2xl font-bold text-ink mb-6">{z.label}</h4>

          <div className="border-t border-border pt-5 mb-5">
            <div className="flex items-baseline justify-between">
              <span className="section-label">大气含氧量</span>
              <span className="text-3xl font-bold text-accent">{z.o2}</span>
            </div>
            <div className="mt-3 h-1.5 bg-stone overflow-hidden rounded-full">
              <motion.div
                key={z.id + "-bar"}
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(parseFloat(z.o2) / 20.9) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <p className="body-sm">{z.desc}</p>

          {/* quick switch */}
          <div className="flex gap-2 mt-8">
            {stations.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`flex-1 text-[10px] tracking-wide py-2 border transition-colors ${
                  active === i ? "bg-ink text-sand border-ink" : "border-border text-ink-3 hover:border-ink hover:text-ink"
                }`}
              >
                {s.altLabel.replace(" m", "")}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BrandStorySection() {
  return (
    <section id="story" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

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

        {/* Altitude journey — interactive illustration */}
        <AltitudeJourney />
      </div>
    </section>
  );
}
