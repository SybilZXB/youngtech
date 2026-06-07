"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Peak = {
  id: string;
  name: string;
  en: string;
  altitude: number; // meters
  continent: string;
  location: string;
  desc: string;
};

const peaks: Peak[] = [
  { id: "everest", name: "珠穆朗玛峰", en: "Everest", altitude: 8849, continent: "亚洲", location: "中国 / 尼泊尔", desc: "地球之巅，世界最高峰。喜马拉雅山脉的精神象征，每一位探索者心中的终极坐标。" },
  { id: "k2", name: "乔戈里峰", en: "K2", altitude: 8611, continent: "亚洲", location: "中国 / 巴基斯坦", desc: "世界第二高峰，喀喇昆仑山脉之王。以攀登难度极高著称，被称为「野蛮之峰」。" },
  { id: "kangchenjunga", name: "干城章嘉峰", en: "Kangchenjunga", altitude: 8586, continent: "亚洲", location: "尼泊尔 / 印度", desc: "世界第三高峰，「五座宝藏之雪」。当地视其为神山，至今保留登顶礼仪传统。" },
  { id: "gongga", name: "贡嘎山", en: "Gongga", altitude: 7556, continent: "亚洲", location: "中国 · 四川", desc: "横断山脉最高峰，「蜀山之王」。东方雪山美学的代表，氧太精神的故土坐标。" },
  { id: "aconcagua", name: "阿空加瓜山", en: "Aconcagua", altitude: 6961, continent: "南美洲", location: "阿根廷", desc: "美洲最高峰，安第斯山脉之巅。亚洲以外的世界最高点，七大洲最高峰之一。" },
  { id: "chimborazo", name: "钦博拉索山", en: "Chimborazo", altitude: 6263, continent: "南美洲", location: "厄瓜多尔", desc: "若从地心计算，其峰顶是离地心最远的地表点——比珠峰更接近宇宙。" },
  { id: "denali", name: "迪纳利山", en: "Denali", altitude: 6190, continent: "北美洲", location: "美国 · 阿拉斯加", desc: "北美最高峰，极地严寒的试炼场。从基底到峰顶的垂直落差为全球之最。" },
  { id: "orizaba", name: "奥里萨巴峰", en: "Pico de Orizaba", altitude: 5636, continent: "北美洲", location: "墨西哥", desc: "墨西哥最高峰，北美第三高峰。常年积雪的休眠火山，俯瞰中美洲大地。" },
  { id: "kilimanjaro", name: "乞力马扎罗山", en: "Kilimanjaro", altitude: 5895, continent: "非洲", location: "坦桑尼亚", desc: "非洲最高峰，赤道旁的雪顶。从热带雨林到极地冰川，一山纵览五个气候带。" },
  { id: "kenya", name: "肯尼亚山", en: "Mount Kenya", altitude: 5199, continent: "非洲", location: "肯尼亚", desc: "非洲第二高峰，古老的死火山。陡峭的岩峰与赤道冰川并存，地貌罕见。" },
  { id: "elbrus", name: "厄尔布鲁士峰", en: "Elbrus", altitude: 5642, continent: "欧洲", location: "俄罗斯 · 高加索", desc: "欧洲最高峰，沉睡的双头火山。横跨欧亚分界的雪原，七大洲最高峰之一。" },
  { id: "montblanc", name: "勃朗峰", en: "Mont Blanc", altitude: 4808, continent: "欧洲", location: "法国 / 意大利", desc: "阿尔卑斯山脉最高峰，「白色之山」。现代登山运动的发源地与圣殿。" },
  { id: "matterhorn", name: "马特洪峰", en: "Matterhorn", altitude: 4478, continent: "欧洲", location: "瑞士 / 意大利", desc: "阿尔卑斯的标志性金字塔尖峰，世界上被拍摄最多的山峰之一。" },
  { id: "puncakjaya", name: "查亚峰", en: "Puncak Jaya", altitude: 4884, continent: "大洋洲", location: "印度尼西亚", desc: "大洋洲最高峰，赤道热带的冰川奇观。七大洲最高峰中最难抵达者之一。" },
  { id: "cook", name: "库克山", en: "Aoraki", altitude: 3724, continent: "大洋洲", location: "新西兰", desc: "新西兰最高峰，毛利语意为「云端之巅」。南阿尔卑斯山脉的冰雪王者。" },
  { id: "vinson", name: "文森峰", en: "Vinson", altitude: 4892, continent: "南极洲", location: "南极洲", desc: "南极洲最高峰，地球最后的极寒荒原。人迹罕至，是终极探险的代名词。" },
];

const continentOrder = ["全部", "亚洲", "南美洲", "北美洲", "非洲", "欧洲", "大洋洲", "南极洲"];

export default function GlobalPeaksSection() {
  const [filter, setFilter] = useState("全部");
  const [selected, setSelected] = useState<Peak | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "全部" ? peaks : peaks.filter((p) => p.continent === filter);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // reset scroll when filter changes
  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [filter]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 380;
    el.scrollBy({ left: dir * amount * 1.5, behavior: "smooth" });
  };

  return (
    <section id="peaks" className="py-28 md:py-40 bg-stone overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-number mb-2">.02</div>
            <div className="section-label mb-8">世界群峰 · Global Peaks</div>
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
              transition={{ duration: 0.7, delay: 0.18 }}
              className="body-sm max-w-xs md:text-right"
            >
              横跨七大洲的极限坐标。左右滑动，点击任意山峰，感受星球之巅。
            </motion.p>
          </div>
        </div>

        {/* Filter + arrows */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {continentOrder.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs tracking-[0.1em] px-3.5 py-1.5 border transition-all duration-200 ${
                  filter === c ? "bg-ink text-sand border-ink" : "border-border text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            <button onClick={() => scrollBy(-1)} aria-label="上一组" className="w-11 h-11 border border-border hover:border-ink hover:bg-ink hover:text-sand transition-colors flex items-center justify-center">←</button>
            <button onClick={() => scrollBy(1)} aria-label="下一组" className="w-11 h-11 border border-border hover:border-ink hover:bg-ink hover:text-sand transition-colors flex items-center justify-center">→</button>
          </div>
        </div>
      </div>

      {/* Carousel — full-bleed, scroll-snap */}
      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-12 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((peak, i) => (
            <motion.button
              layout
              data-card
              key={peak.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(peak)}
              className="group relative shrink-0 snap-start w-[84vw] sm:w-[440px] lg:w-[520px] aspect-[4/3] overflow-hidden bg-dark text-left"
            >
              <Image
                src={`/mountains/${peak.id}.jpg`}
                alt={peak.name}
                fill
                sizes="(max-width: 640px) 84vw, 520px"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

              {/* index */}
              <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-white/70">
                {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              </div>
              {/* continent */}
              <div className="absolute top-5 right-5">
                <span className="text-[10px] tracking-[0.18em] text-white/90 border border-white/30 px-2.5 py-1 uppercase backdrop-blur-sm">
                  {peak.continent}
                </span>
              </div>

              {/* bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
                    {peak.altitude.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/70 font-medium">m</span>
                </div>
                <div className="text-lg font-semibold text-white">{peak.name}</div>
                <div className="text-[10px] tracking-[0.2em] text-white/55 uppercase mt-1">{peak.en} · {peak.location}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-accent-ice uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  查看详情 <span>↗</span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
        {/* trailing spacer */}
        <div className="shrink-0 w-1 md:w-6" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-sand max-w-4xl w-full max-h-[88vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="关闭"
              >
                ✕
              </button>
              <div className="relative w-full aspect-[16/9]">
                <Image src={`/mountains/${selected.id}.jpg`} alt={selected.name} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                  <div className="text-xs tracking-[0.2em] text-white/80 uppercase mb-3">{selected.continent} · {selected.location}</div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{selected.name}</h3>
                  <div className="text-sm tracking-[0.2em] text-white/70 uppercase mt-1">{selected.en}</div>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12">
                  <div>
                    <div className="section-label mb-2">海拔高度</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-accent tracking-tight">{selected.altitude.toLocaleString()}</span>
                      <span className="text-lg text-ink-2 font-medium">m</span>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="section-label mb-2">所在地</div>
                      <div className="text-sm text-ink">{selected.location}</div>
                    </div>
                  </div>
                  <div>
                    <div className="section-label mb-3">山峰简介</div>
                    <p className="body-lg">{selected.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
