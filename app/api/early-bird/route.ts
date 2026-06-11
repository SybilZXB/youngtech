import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabase/config";

// 服务端代理写入 Supabase —— 浏览器只与本站同域通信，
// 由服务器去连 Supabase，避免国内直连海外 supabase.co 卡住。
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const tibetan_culture = String(body.tibetan_culture ?? "").trim();
    const climbing = String(body.climbing ?? "").trim();

    if (!email || !phone || !tibetan_culture || !climbing) {
      return Response.json({ error: "请填写所有必填项。" }, { status: 400 });
    }
    if (email.length > 200 || phone.length > 30 || tibetan_culture.length > 1000 || climbing.length > 1000) {
      return Response.json({ error: "内容超出长度限制。" }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

    const { error } = await supabase.from("early_bird_applications").insert({
      email,
      phone,
      tibetan_culture,
      climbing,
    });

    if (error) {
      return Response.json({ error: "提交失败，请稍后重试。" }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "请求异常，请稍后重试。" }, { status: 500 });
  }
}
