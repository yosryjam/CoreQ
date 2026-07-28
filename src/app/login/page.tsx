"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [username, setUsername] = useState("yusrij");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, remember }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { message?: string };
        setError(result.message ?? "הכניסה נכשלה");
        return;
      }
      router.replace(search.get("next") || "/operations");
      router.refresh();
    } catch {
      setError("לא ניתן להתחבר כרגע");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06091f] text-white">
      <div className="absolute inset-0 bg-[url('/login-reference.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(4,7,30,.96),rgba(15,31,106,.74),rgba(4,7,30,.94))]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-8 py-6 lg:px-14">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Activity className="size-6" />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight">CoreQ</p>
              <p className="text-xs text-blue-100/70">Anesthesia Operations Platform</p>
            </div>
          </div>
          <div className="text-left leading-tight">
            <p className="text-sm font-semibold">הרצליה מדיקל סנטר</p>
            <p className="text-xs text-blue-100/70">מחלקת הרדמה וחדרי ניתוח</p>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center px-5 pb-16">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#07113b]/75 p-7 shadow-2xl backdrop-blur-md sm:p-9">
            <div className="mb-7 text-center">
              <h1 className="text-3xl font-semibold">כניסה לממשק ניהול</h1>
              <p className="mt-2 text-sm text-blue-100/70">גישה מאובטחת למנהלי מחלקת ההרדמה</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm text-blue-50">שם משתמש</span>
                <span className="relative block">
                  <UserRound className="absolute inset-inline-start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className="h-12 w-full rounded-lg border border-white/20 bg-white px-10 text-left text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/25" dir="ltr" />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-blue-50">סיסמה</span>
                <span className="relative block">
                  <LockKeyhole className="absolute inset-inline-start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="h-12 w-full rounded-lg border border-white/20 bg-white px-10 text-left text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/25" dir="ltr" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-inline-end-3 top-1/2 -translate-y-1/2 text-slate-500" aria-label="הצגת סיסמה">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-blue-50">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-4 accent-blue-500" />
                  זכור אותי
                </label>
                <span className="text-blue-200/80">איפוס סיסמה דרך מנהל המערכת</span>
              </div>

              {error ? <div className="rounded-lg border border-red-300/30 bg-red-500/15 px-3 py-2 text-sm text-red-100">{error}</div> : null}

              <button disabled={loading} className="mt-2 h-12 w-full rounded-lg bg-[#3478c9] font-semibold text-white transition hover:bg-[#2868b4] disabled:opacity-60">
                {loading ? "מתחבר…" : "כניסה"}
              </button>
            </form>

            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-blue-100/75">
              <p className="font-semibold text-blue-50">משתמשי הדגמה</p>
              <p className="mt-1" dir="ltr">yusrij / 123456</p>
              <p dir="ltr">yurik / 123456</p>
              <p className="mt-1">שני המשתמשים מוגדרים כ־ADMIN.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
