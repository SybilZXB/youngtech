import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "氧太科技 YOUNG TECH — 为极限海拔而生",
  description: "下一代智能户外生存科技。高原智能氧气系统、UV 多光谱探索相机、智能穿戴设备，为极端环境探索者提供下一代智能生存科技。",
  keywords: "氧太科技, YOUNG TECH, 智能氧气系统, 高原供氧, UV 相机, 极限海拔, 户外科技, 智能穿戴, 高海拔装备",
  openGraph: {
    title: "氧太科技 YOUNG TECH — 为极限海拔而生",
    description: "下一代智能户外生存科技，为极端环境探索者而打造。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-sand text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
