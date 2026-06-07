"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    idx: "01",
    en: "Young",
    zh: "年轻",
    desc: "年轻不是年龄，而是一种状态——好奇、热爱、行动、不设限。我们愿与心态年轻的人站在一起，回应对新鲜体验、自由节奏与真实表达的渴望。",
  },
  {
    idx: "02",
    en: "Tech",
    zh: "科技",
    desc: "科技的价值，不在于炫技，而在于让体验更美好。我们以科技为底层能力，把创新转化为可感知、可依赖、可持续的产品价值。",
  },
  {
    idx: "03",
    en: "Outdoor",
    zh: "户外",
    desc: "户外不是附加场景，而是我们的起点。山野、风、光、运动与呼吸感，是我们最重要的灵感来源，决定了我们理解产品的方式。",
  },
  {
    idx: "04",
    en: "Lifestyle",
    zh: "生活方式",
    desc: "我们关注的不只是产品本身，更是产品背后的生活方式——帮助你更自然地进入一种健康、自由、有质感的生活状态。",
  },
  {
    idx: "05",
    en: "Human First",
    zh: "以人为本",
    desc: "无论技术如何演进，最终都要回到「人」。我们重视真实体验、情绪感受、身体反馈与长期陪伴。轻出发，向自然生长。",
  },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-28 md:py-40 bg-sand">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 md:mb-28 border-b border-border pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-number mb-2">.00</div>
            <div className="section-label mb-8">品牌理念 · Philosophy</div>
            <h2 className="section-heading text-ink">
              与心态年轻的人，<br />站在一起。
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="body-lg mb-5">
              氧太是专注于户外运动设备的科技消费品牌，聚焦户外与自然真实的使用场景。
            </p>
            <p className="body-sm text-ink-3">
              西藏，是我们品牌的精神来源——辽阔心境、纯净感受、本真自然的生命状态。
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-16 items-start py-8 md:py-10 border-b border-border group"
            >
              <div className="flex items-baseline gap-5">
                <span className="section-number group-hover:text-accent transition-colors">.{pillar.idx}</span>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-none mb-1.5">
                    {pillar.en}
                  </h3>
                  <p className="text-sm text-ink-3 tracking-[0.2em]">{pillar.zh}</p>
                </div>
              </div>
              <p className="body-sm md:pt-1.5 max-w-xl">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
