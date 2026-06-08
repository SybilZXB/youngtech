import { createBrowserClient } from "@supabase/ssr";

/**
 * 浏览器端 Supabase 客户端。
 * 使用 publishable key（可安全暴露给前端）。
 * 当前应用无需用户认证 —— 仅用于公开表单提交。
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
