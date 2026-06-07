"use client";

const words = [
  "Young Tech", "户外科技", "极限探索", "YOLO", "氧太科技",
  "西藏精神", "自由生长", "以人为本", "Young Tech with U", "探索未知",
];

export default function MarqueeSection() {
  const doubled = [...words, ...words];

  return (
    <div className="bg-dark overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((word, i) => (
          <span key={i} className="text-sand/70 text-xs tracking-[0.3em] uppercase px-6 font-light">
            {word}
            <span className="mx-6 text-sand/20">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
