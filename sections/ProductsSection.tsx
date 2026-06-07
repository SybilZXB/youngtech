"use client";

import { motion } from "framer-motion";

// ── HEAVY · OUTDOOR ──
const heavyStats = [
  { value: "8848", unit: "m", label: "最高测试海拔", note: "实地珠峰大本营验证" },
  { value: "−40", unit: "°C", label: "极寒运行温度", note: "西藏冬季实际测试" },
  { value: "99.2", unit: "%", label: "血氧监测精度", note: "医疗级校准标准" },
];

const bottleProducts = [
  {
    name: "Bottle 1",
    sub: "Carbon-Fiber Oxygen Cylinder",
    desc: "入门款碳纤维高压氧气瓶。航空级脉冲阀门精准供氧，超轻量瓶身，城市到高原的可靠之选。",
    tags: ["碳纤维瓶身", "脉冲阀门", "超轻量"],
    status: "现已发售",
    available: true,
  },
  {
    name: "Bottle 1S",
    sub: "Pro Oxygen Cylinder",
    desc: "进阶款。更高储氧压力与优化脉冲算法，续航与供氧效率全面升级，专为长线高海拔远征打造。",
    tags: ["高压储氧", "脉冲算法升级", "长续航"],
    status: "现已发售",
    available: true,
  },
  {
    name: "Bottle E",
    sub: "AI Smart Oxygen",
    desc: "智能旗舰。集成 AI 供氧调节与实时血氧浓度监测，按身体状态自适应供氧。目前处于在研阶段。",
    tags: ["AI 供氧", "血氧监测", "自适应调节"],
    status: "在研阶段",
    available: false,
  },
];

// ── LIGHT · CITY ──
const uvProducts = [
  {
    name: "UV Hat",
    sub: "UV Protection Smart Hat",
    desc: "紫外防护智能帽。实时紫外线指数感知与 UPF 50+ 防护，让城市通勤与轻户外都从容应对烈日。",
    tags: ["UPF 50+", "UV 指数感知", "轻量透气"],
    status: "现已发售",
    available: true,
  },
  {
    name: "UV Camera",
    sub: "UV Multispectral Camera",
    desc: "紫外多光谱相机。捕捉肉眼不可见的紫外维度，记录皮肤防晒、城市光环境与自然中的隐藏细节。",
    tags: ["多光谱成像", "紫外可视化", "便携设计"],
    status: "现已发售",
    available: true,
  },
];

function ProductCard({ p, index }: { p: typeof bottleProducts[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-sand border border-border hover:border-ink transition-colors duration-300"
    >
      {/* Visual placeholder */}
      <div className="relative aspect-[4/3] bg-dark overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(58,147,216,0.18) 0%, transparent 65%)" }} />
        <div className="relative text-center">
          <div className="text-2xl md:text-3xl font-bold text-sand/90 tracking-tight">{p.name}</div>
          <div className="text-accent-ice text-[10px] tracking-[0.3em] uppercase mt-2">{p.sub}</div>
        </div>
        <span className={`absolute top-3 left-3 text-[10px] tracking-[0.15em] px-2.5 py-1 uppercase ${p.available ? "bg-sand/15 text-sand" : "bg-accent/90 text-sand"}`}>
          {p.status}
        </span>
        <div className="absolute bottom-3 right-3 text-[9px] tracking-[0.2em] text-sand/30 uppercase">待替换实拍</div>
      </div>

      {/* Info */}
      <div className="p-6 md:p-7">
        <h4 className="text-xl font-bold text-ink tracking-tight mb-1">{p.name}</h4>
        <div className="text-[10px] tracking-[0.2em] text-ink-3 uppercase mb-4">{p.sub}</div>
        <p className="body-sm text-xs mb-5">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] text-ink-2 border border-border px-2.5 py-1 tracking-wide">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CategoryHeader({ en, zh, tag }: { en: string; zh: string; tag: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-10 border-b-2 border-ink pb-6">
      <div>
        <h3 className="font-bold text-ink tracking-tight leading-none" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.02em" }}>
          {en}
        </h3>
        <div className="text-sm tracking-[0.25em] text-ink-2 mt-3">{zh}</div>
      </div>
      <span className="text-xs tracking-[0.2em] uppercase text-ink-3 shrink-0 mb-1">{tag}</span>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="py-28 md:py-40 bg-sand">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <div className="section-number mb-2">.03</div>
          <div className="section-label">产品系列 · Product Lines</div>
        </motion.div>

        {/* ════ HEAVY · OUTDOOR ════ */}
        <div className="mb-28 md:mb-40">
          <CategoryHeader en="HEAVY · OUTDOOR" zh="户外重装" tag="主打 · 重点推广" />

          {/* Bottle 系列 intro + credibility stats */}
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end mb-14">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-ink mb-2">Bottle 系列</div>
              <p className="text-lg text-accent font-medium mb-4">稀薄之处，给你满格氧气</p>
              <p className="body-lg max-w-xl">
                氧太户外重装线的核心——碳纤维高压氧气瓶。航空级脉冲阀门按呼吸节奏精准供氧，特种轻量新材料瓶身，在含氧量骤降的极限海拔，把每一次呼吸稳稳还给你。
              </p>
            </div>
            <div className="flex gap-8 md:gap-10 shrink-0">
              {heavyStats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-ink tracking-tight">{s.value}</span>
                    <span className="text-sm font-semibold text-accent">{s.unit}</span>
                  </div>
                  <div className="text-[10px] tracking-[0.15em] text-ink-3 uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottle products */}
          <div className="grid md:grid-cols-3 gap-6">
            {bottleProducts.map((p, i) => (
              <ProductCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>

        {/* ════ LIGHT · CITY ════ */}
        <div>
          <CategoryHeader en="LIGHT · CITY" zh="城市轻系列" tag="全新产品线" />

          <div className="mb-14">
            <div className="text-2xl md:text-3xl font-bold text-ink mb-2">UV 系列</div>
            <p className="text-lg text-accent font-medium mb-4">看见不可见的维度</p>
            <p className="body-lg max-w-xl">
              以紫外光谱技术打造的城市轻户外系列。从防护到成像，让日常出行也拥有科技底气与设计质感。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {uvProducts.map((p, i) => (
              <ProductCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
