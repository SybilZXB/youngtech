// Supabase 连接配置。
// 优先读环境变量；若部署环境（如 Hostinger）未注入，则回退到内置默认值。
//
// 安全说明：这里的 URL 与 publishable key 本就是「可公开」的——
// publishable key 设计上会出现在浏览器端，数据安全由数据库 RLS 策略保证
// （匿名角色仅允许 INSERT，无法读取任何提交内容）。因此写入仓库是安全的。
// 切勿在此放置 service_role / secret key。
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://derujopiwzfswionfgdd.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_kHOeAZWeajzomMAIpHbkLw_ZV5oupx-";
