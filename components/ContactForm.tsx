"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [culture, setCulture] = useState("");
  const [climbing, setClimbing] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // 锁定背景滚动
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function reset() {
    setEmail(""); setPhone(""); setCulture(""); setClimbing("");
    setStatus("idle"); setErrorMsg("");
  }

  function close() {
    setOpen(false);
    setTimeout(reset, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    // 15s 超时保护，避免请求挂死在「提交中」
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/early-bird", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          tibetan_culture: culture.trim(),
          climbing: climbing.trim(),
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data?.error || "提交失败，请稍后重试，或邮件联系我们。");
        return;
      }
      setStatus("success");
    } catch {
      clearTimeout(timer);
      setStatus("error");
      setErrorMsg("网络超时，请检查网络后重试，或邮件联系我们。");
    }
  }

  const inputCls =
    "w-full bg-transparent border-b border-border focus:border-ink outline-none py-3 text-ink text-base placeholder:text-ink-3/60 transition-colors";

  return (
    <>
      {/* 触发按钮 */}
      <button onClick={() => setOpen(true)} className="btn-dark text-base">
        户外种子 · 早鸟计划申请 →
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-8"
          >
            {/* 遮罩 */}
            <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm" onClick={close} />

            {/* 弹窗 */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              className="relative w-full max-w-lg bg-sand max-h-[90vh] overflow-y-auto p-8 md:p-12"
            >
              {/* 关闭 */}
              <button
                onClick={close}
                aria-label="关闭"
                className="absolute top-5 right-5 text-ink-3 hover:text-ink transition-colors text-xl leading-none"
              >
                ✕
              </button>

              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="text-2xl md:text-3xl font-bold text-ink mb-3">申请已收到 ✦</div>
                  <p className="body-sm mb-8">
                    欢迎加入「户外种子」早鸟计划。<br />名额有限，我们会尽快与你联系。
                  </p>
                  <button
                    onClick={close}
                    className="text-xs tracking-[0.2em] uppercase text-ink-3 hover:text-accent transition-colors"
                  >
                    完成 →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-7">
                  <div>
                    <div className="section-label mb-2">户外种子 · Early Bird</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight leading-tight">
                      早鸟计划申请
                    </h3>
                    <p className="body-sm mt-3">填写信息，加入第一批与我们一起走向山野的探索者。</p>
                  </div>

                  <div>
                    <label className="section-label mb-3 block">邮箱 · Email</label>
                    <input
                      type="email" required maxLength={200}
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="section-label mb-3 block">电话 · Phone</label>
                    <input
                      type="tel" required maxLength={30}
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="你的联系电话" className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="section-label mb-3 block">了解藏文化吗？</label>
                    <textarea
                      required maxLength={1000} rows={2}
                      value={culture} onChange={(e) => setCulture(e.target.value)}
                      placeholder="有没有去过冈仁波齐？喜欢隆达（风马旗）吗？说说你与藏地的故事…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="section-label mb-3 block">喜欢攀登吗？</label>
                    <textarea
                      required maxLength={1000} rows={2}
                      value={climbing} onChange={(e) => setClimbing(e.target.value)}
                      placeholder="有没有去过乞力马扎罗？登顶过库克山吗？聊聊你走过的山…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && <p className="text-sm text-accent">{errorMsg}</p>}

                  <button
                    type="submit" disabled={status === "submitting"}
                    className="btn-dark text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {status === "submitting" ? "提交中…" : "提交申请 →"}
                  </button>

                  <p className="text-center text-[11px] tracking-[0.25em] text-ink-3 uppercase pt-2">
                    Young Tech with You
                  </p>
                  <p className="text-center body-sm -mt-4">
                    去探索星球之巅，去了解藏文化。
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
