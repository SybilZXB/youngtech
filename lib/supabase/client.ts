import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabase/config";

/**
 * 浏览器端 Supabase 客户端。
 * 使用 publishable key（可安全暴露给前端）。
 * 当前应用无需用户认证 —— 仅用于公开表单提交。
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
