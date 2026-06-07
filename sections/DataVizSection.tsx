"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1800;
    const update = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, target]);

  return <span ref={ref}>{current}{suffix}</span>;
}

const metrics = [
  { label: "最大测试海拔", value: 8848, suffix: "m", note: "珠峰之巅，已完成实地测试" },
  { label: "最长极限续航", value: 72, suffix: "h", note: "极寒 −40°C 环境下连续运行" },
  { label: "血氧监测精度", value: 99.2, suffix: "%", isFloat: true, note: "AI 算法实时校准" },
  { label: "SOS 响应时间", value: 2, suffix: "min", note: "全球卫星网络触达救援" },
];

export default function DataVizSection() {
  return (
    <section className="py-28 md:py-40 bg-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 md:mb-28 border-b border-sand/10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-number mb-2 text-sand/30">.04</div>
            <div className="section-label mb-8 text-sand/30">数据智能 · Data Intelligence</div>
            <h2 className="section-heading text-sand">
              实数，<br />证明一切。
            </h2>
          </motion.div>
        </div>

        {/* Metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.09 }}
              className="border-t border-sand/10 pt-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-sand tracking-tight mb-2">
                {m.isFloat ? (
                  <span>
                    <AnimatedFloatNumber target={m.value} suffix={m.suffix} />
                  </span>
                ) : (
                  <>
                    <AnimatedNumber target={m.value} />
                    <span className="text-accent text-2xl ml-0.5">{m.suffix}</span>
                  </>
                )}
              </div>
              <div className="text-sand/40 text-xs tracking-widest uppercase mb-2">{m.label}</div>
              <p className="text-sand/25 text-xs leading-relaxed">{m.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedFloatNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1800;
    const update = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {current.toFixed(1)}
      <span className="text-accent text-2xl ml-0.5">{suffix}</span>
    </span>
  );
}
