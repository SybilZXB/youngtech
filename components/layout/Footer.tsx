"use client";

import Image from "next/image";

const columns = [
  {
    title: "产品系列",
    links: [
      { label: "Bottle 1", href: "#products" },
      { label: "Bottle 1S", href: "#products" },
      { label: "Bottle E", href: "#products" },
      { label: "UV Hat", href: "#products" },
      { label: "UV Camera", href: "#products" },
    ],
  },
  {
    title: "品牌",
    links: [
      { label: "使命叙事", href: "#mission" },
      { label: "品牌故事", href: "#story" },
      { label: "世界群峰", href: "#peaks" },
      { label: "户外重装 Heavy", href: "#products" },
      { label: "城市轻系列 Light", href: "#products" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "hello@youngtech.com", href: "mailto:hello@youngtech.com" },
      { label: "商务合作", href: "mailto:hello@youngtech.com" },
      { label: "媒体咨询", href: "mailto:hello@youngtech.com" },
      { label: "联系我们", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-sand/8 py-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="YOUNG TECH" width={88} height={43} className="h-8 w-auto mb-2" />
              <span className="text-[10px] tracking-[0.32em] text-sand/30">氧太科技</span>
            </div>
            <p className="text-sand/25 text-xs font-light leading-relaxed max-w-[180px]">
              源起西藏的户外科技品牌。为极端环境而生的智能装备。
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="section-label text-sand/30 mb-5">{col.title}</div>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-xs text-sand/35 hover:text-accent-ice transition-colors mb-2.5 font-light"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-sand/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sand/20 text-[10px] tracking-widest">
            © 2026 YOUNG TECH · 氧太科技. 保留所有权利.
          </span>
          <div className="flex gap-6">
            {["隐私政策", "服务条款", "专利"].map((l) => (
              <a key={l} href="#" className="text-sand/20 text-[10px] tracking-widest hover:text-sand/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
