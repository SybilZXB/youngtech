"use client";

import { motion } from "framer-motion";

const concepts = [
  {
    idx: "01",
    name: "AI 户外助手",
    sub: "AI Outdoor Assistant",
    year: "2025",
    status: "开发中",
    desc: "自然语言地形分析、路线优化与实时危险预测。它是与你并肩前行的 AI 探险伙伴。",
    specs: ["设备端大模型", "语音指令", "地形分析", "智能路线"],
  },
  {
    idx: "02",
    name: "智能头盔 HUD",
    sub: "Smart Helmet HUD",
    year: "2026",
    status: "概念设计",
    desc: "将 AR 抬头显示集成于高海拔攀登头盔。导航、生理数据、氧气状态一目了然。",
    specs: ["AR 显示", "0.5ms 延迟", "夜视", "120° 视场"],
  },
  {
    idx: "03",
    name: "无人机协同系统",
    sub: "Drone Ecosystem",
    year: "2026",
    status: "研究阶段",
    desc: "自主微型无人机集群，在极端环境中提供空中侦察、物资投送与应急信标中继。",
    specs: ["集群智能", "8000m 升限", "应急中继", "60 分钟航时"],
  },
];

export default function InnovationLabSection() {
  return (
    <section className="py-28 md:py-40 bg-sand">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 md:mb-28 border-b border-border pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-number mb-2">.05</div>
            <div className="section-label mb-8">创新实验室 · Innovation Lab</div>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="section-heading text-ink"
            >
              未来，<br />正在被构建。
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-sm max-w-xs md:text-right"
            >
              氧太实验室正在开发的下一代概念产品，定义极端探索的明天。
            </motion.p>
          </div>
        </div>

        {/* Concept list */}
        <div>
          {concepts.map((c, i) => (
            <motion.div
              key={c.idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-start py-10 md:py-12 border-b border-border group"
            >
              <div className="section-number text-lg group-hover:text-accent transition-colors">.{c.idx}</div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">{c.name}</h3>
                  <span className="text-[10px] tracking-widest text-ink-3 border border-border px-2 py-0.5 uppercase shrink-0">
                    {c.status}
                  </span>
                </div>
                <p className="text-xs tracking-[0.2em] text-ink-3 uppercase mb-5">{c.sub}</p>
                <p className="body-sm max-w-xl mb-6">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.specs.map((spec) => (
                    <span key={spec} className="text-xs text-ink-2 border border-border px-3 py-1 tracking-wide">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="section-label text-right shrink-0 pt-1">{c.year}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
