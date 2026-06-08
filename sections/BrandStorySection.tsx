"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const pillars = [
  { en: "Young",       zh: "年轻",   desc: "年轻不是年龄，而是一种好奇、行动、不设限的状态。" },
  { en: "Tech",        zh: "科技",   desc: "技术的价值，不在炫技，而在于让每一次体验更可依赖。" },
  { en: "Outdoor",     zh: "户外",   desc: "山野、风、光与呼吸感，是我们最重要的设计起点。" },
  { en: "Human First", zh: "以人为本", desc: "无论技术如何演进，最终都要回到真实体验与情绪感受。" },
];

const STORY_IMAGES = ["/story/s1.jpg", "/story/s2.jpg", "/story/s6.jpg", "/story/s7.jpg", "/story/s8.jpg"];

function StorySlideshowBg() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STORY_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none">
      {STORY_IMAGES.map((src, i) => (
        <Image key={src} src={src} alt="" fill priority={i === 0}
          className="object-cover object-center transition-opacity duration-[2000ms]"
          style={{ opacity: idx === i ? 1 : 0 }} sizes="100vw"
        />
      ))}
      {/* fog/haze layers */}
      <div className="absolute inset-0" style={{ background: "rgba(4,10,22,0.45)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,10,22,0.45) 0%, rgba(4,10,22,0.05) 45%, rgba(4,10,22,0.55) 100%)" }} />
    </div>
  );
}

// ── altitude scenes ──
const SCENES = [
  {
    alt: 0, altLabel: "0 m", zone: "海平面 · Sea Level",
    o2: 100, state: "最佳状态",
    headline: "人类文明诞生于这里。",
    sub: "空气充足，呼吸自然。",
    bg: "#06101e",
    range: [0.0, 0.04, 0.13, 0.18] as [number,number,number,number],
  },
  {
    alt: 2000, altLabel: "2,000 m", zone: "稀薄开始",
    o2: 84, state: "轻微影响",
    headline: "身体第一次意识到，",
    sub: "氧气并非理所当然。",
    bg: "#050d1a",
    range: [0.18, 0.22, 0.31, 0.36] as [number,number,number,number],
  },
  {
    alt: 4000, altLabel: "4,000 m", zone: "高原区域",
    o2: 63, state: "呼吸加快",
    headline: "每一步都需要更多能量。",
    sub: "呼吸开始加快。",
    bg: "#040a14",
    range: [0.36, 0.40, 0.49, 0.54] as [number,number,number,number],
  },
  {
    alt: 6000, altLabel: "6,000 m", zone: "极限边缘",
    o2: 47, state: "高度危险",
    headline: "这里已经不是",
    sub: "大多数人的世界。",
    bg: "#030710",
    range: [0.54, 0.58, 0.67, 0.72] as [number,number,number,number],
  },
  {
    alt: 8000, altLabel: "8,000 m", zone: "死亡地带",
    o2: 33, state: "生存极限",
    headline: "每一次呼吸都变得珍贵。",
    sub: "长期生存几乎不可能。",
    bg: "#020408",
    range: [0.72, 0.76, 0.84, 0.89] as [number,number,number,number],
  },
  {
    alt: 8848, altLabel: "8,848 m", zone: "珠穆朗玛峰顶",
    o2: 31, state: "人类极限",
    headline: "在这里，",
    sub: "每一次呼吸都决定下一步。",
    bg: "#000000",
    range: [0.89, 0.93, 1.0, 1.0] as [number,number,number,number],
  },
];

// ── canvas: atmosphere particles ──
function AtmosphereCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pRef = useRef(0);
  useMotionValueEvent(progress, "change", (v) => { pRef.current = v; });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random() * 0.65,
      r: Math.random() * 1.2 + 0.3, seed: Math.random() * Math.PI * 2,
    }));
    const snowflakes = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      z: Math.random() * 0.7 + 0.3, seed: Math.random() * Math.PI * 2,
    }));

    let t = 0, raf = 0;
    function draw() {
      if (!ctx) return;
      t += 0.004;
      const p = pRef.current;
      ctx.clearRect(0, 0, w, h);

      // stars: appear above 6000m (p > 0.54)
      const starA = Math.max(0, (p - 0.54) / 0.3);
      for (const s of stars) {
        const a = starA * (0.4 + Math.sin(t * 1.2 + s.seed) * 0.2);
        if (a < 0.01) continue;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,228,255,${a})`;
        ctx.fill();
      }

      // snow: appear above 4000m (p > 0.36)
      const snowA = Math.max(0, (p - 0.36) / 0.3);
      for (const sf of snowflakes) {
        sf.y += (0.0005 + sf.z * 0.0007) * (1 + snowA * 3);
        sf.x += Math.sin(t + sf.seed) * 0.0003 * snowA;
        if (sf.y > 1.02) { sf.y = -0.02; sf.x = Math.random(); }
        const a = snowA * (0.12 + Math.sin(t * 2 + sf.seed) * 0.06) * sf.z;
        if (a < 0.01) continue;
        ctx.beginPath();
        ctx.arc(sf.x * w, sf.y * h, sf.z * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── scene layer ──
function SceneLayer({ s, progress }: { s: typeof SCENES[0]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, s.range, [0, 1, 1, 0]);
  const y = useTransform(progress, s.range, [48, 0, 0, -48]);
  const barWidth = useTransform(progress, [s.range[0], s.range[1]], ["0%", `${s.o2}%`]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-24 pointer-events-none">
      {/* zone tag */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-px bg-accent-ice/60" />
        <span className="text-[10px] tracking-[0.4em] text-accent-ice/70 uppercase font-mono">{s.altLabel}</span>
        <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-mono">· {s.zone}</span>
      </div>

      {/* headline */}
      <h3 className="font-bold text-white leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)" }}>
        {s.headline}
        <br />
        <span className="text-white/55">{s.sub}</span>
      </h3>

      {/* O2 data */}
      <div className="mt-12 max-w-xs">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-mono">O₂ 可利用率</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-bold text-accent-ice font-mono tabular-nums">{s.o2}</span>
            <span className="text-sm text-white/35 font-mono">%</span>
          </div>
        </div>
        <div className="h-[1.5px] bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-accent-ice to-accent-ice/60" style={{ width: barWidth }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-mono">人体状态</span>
          <span className="text-[9px] tracking-[0.2em] text-white/40 uppercase font-mono">{s.state}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── brand finale ──
function Finale({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.93, 1.0], [0, 1]);
  const scale = useTransform(progress, [0.93, 1.0], [0.97, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-x-0 top-0 z-20 flex flex-col items-center pt-8 text-center px-8 pointer-events-none">
      <p className="text-[9px] tracking-[0.5em] text-accent-ice/40 uppercase font-mono mb-3">YOUNG TECH · 氧太科技</p>
      <h2 className="font-bold text-white leading-tight tracking-tight mb-2" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)" }}>
        The Air Gets Thinner. <span className="text-accent-ice">Human Ambition Doesn't.</span>
      </h2>
      <p className="text-white/35 tracking-[0.08em]" style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}>
        空气会越来越稀薄。人类的探索不会。
      </p>
    </motion.div>
  );
}

// ── altitude map — cinematic scroll ──
function AltitudeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // background color
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.89, 1],
    ["#06101e", "#050d1a", "#040a14", "#030710", "#020408", "#010204", "#000000"]
  );

  // altitude counter
  const alt = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.89, 1],
    [0, 2000, 4000, 6000, 8000, 8848, 8848]
  );
  const altStr = useTransform(alt, (v) => Math.round(v).toLocaleString());

  // atmosphere opacity (sky gradient fades in as altitude rises)
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.85]);

  return (
    <div ref={containerRef} className="relative h-[800vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* bg */}
        <motion.div className="absolute inset-0 z-[1]" style={{ backgroundColor: bgColor }} />

        {/* background slideshow */}
        <StorySlideshowBg />

        {/* atmospheric haze — radial blue glow at horizon */}
        <motion.div
          style={{ opacity: atmosphereOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 100% 40% at 50% 100%, rgba(30,80,160,0.25) 0%, transparent 70%)"
          }} />
        </motion.div>

        {/* particles */}
        <AtmosphereCanvas progress={scrollYProgress} />

        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)"
        }} />

        {/* altitude — giant watermark number */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-10 pointer-events-none select-none">
          <div className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-mono mb-2">ALTITUDE</div>
          <div className="font-bold text-white/10 font-mono tabular-nums leading-none" style={{ fontSize: "clamp(6rem, 22vw, 20rem)", letterSpacing: "-0.04em" }}>
            <motion.span>{altStr}</motion.span>
          </div>
          <div className="text-[11px] tracking-[0.4em] text-white/20 uppercase font-mono -mt-4">metres</div>
        </div>

        {/* scenes */}
        {SCENES.map((s) => (
          <SceneLayer key={s.alt} s={s} progress={scrollYProgress} />
        ))}

        {/* finale */}
        <Finale progress={scrollYProgress} />
      </div>
    </div>
  );
}

export default function BrandStorySection() {
  return (
    <section id="story" className="bg-stone">
      <div className="py-28 md:py-40 max-w-[1200px] mx-auto px-6 md:px-12">

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
            <p className="body-lg">
              每一件氧太产品，都源于对人与自然关系的尊重。我们相信，科技应当让人更自由地走进山野，而非隔绝其间。轻出发，向自然生长。
            </p>
          </motion.div>
        </div>

        {/* brand pillars */}
        <div className="mb-28 md:mb-40">
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
                <h3 className="text-xl font-bold mb-1 text-accent">{p.en}</h3>
                <p className="text-xs text-ink-3 tracking-widest uppercase mb-4">{p.zh}</p>
                <p className="body-sm text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* cinematic altitude journey — full width, breaks out of container */}
      <AltitudeJourney />
    </section>
  );
}
