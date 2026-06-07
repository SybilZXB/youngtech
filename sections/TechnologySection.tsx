"use client";

import { motion } from "framer-motion";

const techItems = [
  {
    idx: "01",
    title: "AI 供氧算法",
    metric: "99.2%",
    metricLabel: "供氧精度",
    desc: "基于实时生理数据与环境传感器的预测式供氧。它会学习你的生理特征，在你需要之前完成计算。",
  },
  {
    idx: "02",
    title: "紫外光谱成像",
    metric: "12K",
    metricLabel: "成像分辨率",
    desc: "多波段紫外 / 红外捕获，揭示肉眼无法看见的地形威胁与科研细节。",
  },
  {
    idx: "03",
    title: "卫星连接",
    metric: "全球",
    metricLabel: "信号覆盖",
    desc: "始终在线的全球卫星网络，无盲区，无信号丢失。",
  },
  {
    idx: "04",
    title: "紧急响应网络",
    metric: "<2 min",
    metricLabel: "SOS 响应时间",
    desc: "一键 SOS 触发多渠道紧急响应，2 分钟内触达救援网络。",
  },
  {
    idx: "05",
    title: "环境智能",
    metric: "Edge AI",
    metricLabel: "实时处理",
    desc: "微气候预测、雪崩风险与紫外线指数预报，由边缘 AI 驱动，无需网络。",
  },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-28 md:py-40 bg-stone">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 md:mb-28 border-b border-border pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-number mb-2">.03</div>
            <div className="section-label mb-8">核心技术 · Core Technology</div>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="section-heading text-ink"
            >
              足以守护生命<br />的技术。
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-sm max-w-xs md:text-right"
            >
              五套集成智能系统，合而为一，协同运转。
            </motion.p>
          </div>
        </div>

        {/* Tech list */}
        <div>
          {techItems.map((item, i) => (
            <motion.div
              key={item.idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="grid md:grid-cols-[80px_1fr_200px] gap-6 md:gap-12 items-start py-10 md:py-12 border-b border-border group"
            >
              <div className="section-number text-lg group-hover:text-accent transition-colors">.{item.idx}</div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-4">{item.title}</h3>
                <p className="body-sm max-w-xl">{item.desc}</p>
              </div>
              <div className="md:text-right pt-1">
                <div className="text-2xl md:text-3xl font-bold text-accent">{item.metric}</div>
                <div className="section-label mt-1">{item.metricLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
