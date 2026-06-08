"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

/**
 * MISSION EXPERIENCE — cinematic scroll narrative.
 * A pinned, scroll-driven journey from sea level → Everest → space.
 *
 * Background is a live canvas particle system whose color / motion track
 * scroll progress (city dust → snow → wind → oxygen orbs → stars).
 *
 * To layer real cinematic footage behind it later, drop an MP4 at
 * /public/video/mission.mp4 and set BACKGROUND_VIDEO below.
 */
const BACKGROUND_VIDEO: string | null = null; // e.g. "/video/mission.mp4"

// ── per-scene fade helper ──
function useScene(p: MotionValue<number>, range: [number, number, number, number]) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [50, 0, 0, -50]);
  return { opacity, y };
}

// ── live particle background ──
function ParticleCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pRef = useRef(0);

  useMotionValueEvent(progress, "change", (v) => {
    pRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const N = 180;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2, // depth → size/speed
      seed: Math.random() * Math.PI * 2,
    }));

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    let t = 0;

    function draw() {
      if (!ctx) return;
      t += 0.005;
      const p = pRef.current;
      ctx.clearRect(0, 0, w, h);

      // phase-driven palette + motion
      // 0 city · 0.3 alpine · 0.5 glacier · 0.7 summit · 1 space
      let r: number, g: number, b: number, drift: number, wind: number, twinkle: number;
      if (p < 0.25) {
        const k = p / 0.25;
        r = lerp(210, 200, k); g = lerp(180, 205, k); b = lerp(150, 230, k);
        drift = -0.0004; wind = 0; twinkle = 0.1;
      } else if (p < 0.5) {
        const k = (p - 0.25) / 0.25;
        r = lerp(200, 150, k); g = lerp(205, 200, k); b = lerp(230, 240, k);
        drift = lerp(-0.0004, 0.0008, k); wind = lerp(0, 0.0014, k); twinkle = 0.15;
      } else if (p < 0.72) {
        const k = (p - 0.5) / 0.22;
        r = lerp(150, 140, k); g = lerp(200, 210, k); b = lerp(240, 245, k);
        drift = lerp(0.0008, 0.00005, k); wind = lerp(0.0014, 0.0001, k); twinkle = lerp(0.15, 0.5, k);
      } else {
        const k = (p - 0.72) / 0.28;
        r = lerp(140, 230, k); g = lerp(210, 235, k); b = lerp(245, 255, k);
        drift = 0.00002; wind = 0; twinkle = lerp(0.5, 0.9, k);
      }

      for (const pt of particles) {
        // motion
        pt.y += drift * pt.z * 3;
        pt.x += wind * pt.z + Math.sin(t + pt.seed) * 0.0002;
        if (pt.y < -0.02) pt.y = 1.02;
        if (pt.y > 1.02) pt.y = -0.02;
        if (pt.x < -0.02) pt.x = 1.02;
        if (pt.x > 1.02) pt.x = -0.02;

        const px = pt.x * w;
        const py = pt.y * h;
        const size = pt.z * (p > 0.72 ? 1.6 : 2.4) + 0.3;
        const alpha = (0.25 + Math.sin(t * 2 + pt.seed) * twinkle) * (0.4 + pt.z * 0.6);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.max(0, alpha)})`;
        ctx.fill();
      }

      // oxygen / neural network links near the summit→space transition
      if (p > 0.58) {
        const linkStrength = Math.min(1, (p - 0.58) / 0.3);
        ctx.strokeStyle = `rgba(155,212,245,${0.12 * linkStrength})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 4) {
          for (let j = i + 4; j < particles.length; j += 4) {
            const a = particles[i], bb = particles[j];
            const dx = (a.x - bb.x) * w, dy = (a.y - bb.y) * h;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(bb.x * w, bb.y * h);
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ── animated numeric readout ──
function Readout({ value, suffix = "" }: { value: MotionValue<string>; suffix?: string }) {
  return (
    <span className="tabular-nums">
      <motion.span>{value}</motion.span>
      {suffix}
    </span>
  );
}

export default function MissionExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // background color across the climb
  const bg = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.72, 1],
    ["#0d0b0a", "#0a1420", "#0b1d31", "#040608", "#000000"]
  );

  // scenes
  const s1 = useScene(scrollYProgress, [0.0, 0.02, 0.1, 0.14]);
  const s2 = useScene(scrollYProgress, [0.14, 0.17, 0.23, 0.27]);
  const s3 = useScene(scrollYProgress, [0.27, 0.31, 0.39, 0.44]);
  const s4 = useScene(scrollYProgress, [0.44, 0.48, 0.56, 0.61]);
  const s5 = useScene(scrollYProgress, [0.61, 0.65, 0.71, 0.76]);
  const s6 = useScene(scrollYProgress, [0.76, 0.79, 0.85, 0.89]);
  const s7 = useScene(scrollYProgress, [0.89, 0.93, 1.0, 1.0]);

  // data readouts
  const spo2 = useTransform(scrollYProgress, [0.30, 0.35, 0.40], [98, 92, 88]);
  const spo2Str = useTransform(spo2, (v) => Math.round(v).toString());

  // altitude ticker (shown top-left throughout)
  const alt = useTransform(
    scrollYProgress,
    [0.0, 0.14, 0.27, 0.44, 0.61, 0.76, 1.0],
    [0, 0, 3000, 5000, 8848, 8848, 8848]
  );
  const altStr = useTransform(alt, (v) => Math.round(v).toLocaleString());

  // breathing scale for summit scene
  const breathe = useTransform(scrollYProgress, [0.61, 0.665, 0.72], [1, 1.18, 1]);

  // photo finale — fades in during Scene 6/7
  const progressRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => { progressRef.current = v; });
  const photoOpacity = useTransform(scrollYProgress, [0.68, 0.8, 1], [0, 1, 1]);
  const photoScale  = useTransform(scrollYProgress, [0.68, 1],     [1.06, 1.0]);
  const particleOpacity = useTransform(scrollYProgress, [0.68, 0.84], [1, 0.15]);

  return (
    <section id="mission" ref={containerRef} className="relative h-[750vh] bg-dark">
      {/* pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* color base */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: bg }} />

        {/* optional cinematic video — blurred, dimmed climbing footage behind the particles.
            Drop an MP4 at /public/video/mission.mp4 and set BACKGROUND_VIDEO above. */}
        {BACKGROUND_VIDEO && (
          <>
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              style={{ filter: "blur(6px) saturate(1.1)", transform: "scale(1.08)" }}
              src={BACKGROUND_VIDEO}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-dark/55" />
          </>
        )}

        {/* live particles */}
        <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0">
          <ParticleCanvas progress={scrollYProgress} />
        </motion.div>

        {/* Real climbing photo — Manaslu 8163m, CC BY 3.0. Fades in for Scene 6/7 finale. */}
        <motion.div
          style={{ opacity: photoOpacity, scale: photoScale }}
          className="absolute inset-0 z-[5] pointer-events-none"
        >
          <Image
            src="/mission/manaslu_climber.jpg"
            alt="Climber on Manaslu 8163m"
            fill
            priority
            className="object-cover object-center"
          />
          {/* cinematic grade: keep it moody, not blown out */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(5,10,18,0.55) 0%, rgba(5,10,18,0.15) 45%, rgba(5,10,18,0.72) 100%)" }}
          />
        </motion.div>

        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

        {/* persistent altitude HUD */}
        <div className="absolute top-24 left-6 md:left-12 z-20 flex items-center gap-3">
          <span className="w-8 h-px bg-accent-ice/40" />
          <span className="text-xs tracking-[0.25em] text-accent-ice/80 tabular-nums">
            海拔 <Readout value={altStr} /> m
          </span>
        </div>

        {/* ── Scene 1 · intro ── */}
        <motion.div style={{ opacity: s1.opacity, y: s1.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <h2 className="font-bold text-white leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}>
            THE LIMIT<br />IS ONLY<br /><span className="text-accent-ice">THE BEGINNING</span>
          </h2>
          <p className="mt-8 text-white/60 text-base md:text-xl font-light max-w-md leading-relaxed">
            当空气开始稀薄，<br />真正的科技才开始工作。
          </p>
          <div className="mt-14 flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] tracking-[0.3em] uppercase">向下滚动 · 开始任务</span>
            <span className="text-lg">↓</span>
          </div>
        </motion.div>

        {/* ── Scene 2 · 0m city ── */}
        <motion.div style={{ opacity: s2.opacity, y: s2.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="section-label text-accent-ice/70 mb-6">海拔 0M · 城市</div>
          <h3 className="font-bold text-white leading-tight tracking-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}>
            EVERY JOURNEY<br />STARTS HERE
          </h3>
          <p className="mt-6 text-white/50 text-base md:text-lg font-light">每一次远征，都始于平凡的起点。</p>
        </motion.div>

        {/* ── Scene 3 · 3000m ── */}
        <motion.div style={{ opacity: s3.opacity, y: s3.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="section-label text-accent-ice/70 mb-6">海拔 3,000M · 高山地带</div>
          <h3 className="font-bold text-white leading-tight tracking-tight mb-10" style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)" }}>
            氧气下降 30%<br />体能开始流失
          </h3>
          <div className="flex items-end gap-3">
            <span className="text-xs tracking-[0.25em] text-white/40 uppercase mb-2">SpO₂</span>
            <span className="text-6xl md:text-8xl font-bold text-accent-ice tabular-nums">
              <Readout value={spo2Str} />
            </span>
            <span className="text-2xl text-white/40 mb-2">%</span>
          </div>
        </motion.div>

        {/* ── Scene 4 · 5000m ── */}
        <motion.div style={{ opacity: s4.opacity, y: s4.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="section-label text-accent-ice/70 mb-6">海拔 5,000M · 无人区</div>
          <h3 className="font-bold text-white leading-tight tracking-tight mb-10" style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}>
            THE BODY SLOWS.<br />THE MIND FADES.
          </h3>
          <div className="flex gap-8 md:gap-14 mb-12">
            {[
              { v: "−20°C", l: "环境温度" },
              { v: "65 km/h", l: "风速" },
              { v: "LOW", l: "含氧量" },
            ].map((d) => (
              <div key={d.l} className="text-center">
                <div className="text-xl md:text-3xl font-bold text-white tabular-nums">{d.v}</div>
                <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">{d.l}</div>
              </div>
            ))}
          </div>
          <p className="text-accent-ice text-sm md:text-lg tracking-[0.25em] uppercase">Technology Becomes Survival</p>
        </motion.div>

        {/* ── Scene 5 · 8848m summit ── */}
        <motion.div style={{ opacity: s5.opacity, y: s5.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ scale: breathe }} className="absolute w-[60vmin] h-[60vmin] rounded-full" >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(155,212,245,0.10) 0%, transparent 70%)" }} />
          </motion.div>
          <div className="section-label text-accent-ice/70 mb-6 relative">海拔 8,848M · 珠峰之巅</div>
          <h3 className="font-bold text-white leading-tight tracking-tight relative" style={{ fontSize: "clamp(2.2rem, 6vw, 6rem)" }}>
            ONE BREATH<br />CHANGES<br />EVERYTHING
          </h3>
          <p className="mt-8 text-white/40 text-sm tracking-[0.2em] uppercase relative">每一次呼吸，都被重新定义</p>
        </motion.div>

        {/* ── Scene 6 · mission ── */}
        <motion.div style={{ opacity: s6.opacity, y: s6.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="section-label text-accent-ice/70 mb-10">氧太使命 · Our Mission</div>
          <p className="font-bold text-white leading-snug tracking-tight max-w-4xl" style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.4rem)" }}>
            我们不只是制造装备。<br />
            <span className="text-accent-ice">我们在自然不予庇护之处，<br />为人类构筑信心。</span>
          </p>
          <p className="mt-10 text-white/35 text-xs tracking-[0.3em] uppercase max-w-lg leading-relaxed">
            We don&apos;t build gear. We build confidence where nature offers none.
          </p>
        </motion.div>

        {/* ── Scene 7 · climax ── */}
        <motion.div style={{ opacity: s7.opacity, y: s7.y }} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="flex gap-10 md:gap-20 mb-14">
            {[
              { v: "40+", l: "Expeditions · 远征任务" },
              { v: "120,000+", l: "Hours in Extreme Conditions" },
            ].map((d) => (
              <div key={d.l} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-accent-ice tabular-nums">{d.v}</div>
                <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-2 max-w-[140px]">{d.l}</div>
              </div>
            ))}
          </div>
          <h3 className="font-bold text-white leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.6rem, 8vw, 9rem)" }}>
            ENGINEERED<br />FOR THE<br /><span className="text-accent-ice">UNKNOWN</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
