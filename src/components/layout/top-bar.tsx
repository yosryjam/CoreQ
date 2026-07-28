"use client";

import { usePathname } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { navIndex } from "@/config/navigation";

export function TopBar() {
  const pathname = usePathname();
  const current = navIndex[pathname];
  const title = current?.label ?? "מרכז בקרה";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-6">
      <div className="flex items-center gap-2 text-[13px] text-fg-subtle">
        <span>CoreQ</span>
        <span className="text-border-strong">/</span>
        <span className="font-medium text-fg">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute inset-inline-start-2.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
          <input
            type="text"
            placeholder="חיפוש נכס, חדר, תקלה…"
            className="h-9 w-64 rounded-md border border-border bg-surface-muted ps-8 pe-3 text-[13px] text-fg placeholder:text-fg-subtle focus:border-primary focus:bg-surface"
          />
        </div>

        {/* Alerts */}
        <button
          type="button"
          aria-label="התראות"
          className="relative grid size-9 place-items-center rounded-md border border-border text-fg-muted hover:bg-surface-muted"
        >
          <Bell className="size-[18px]" />
          <span className="absolute end-2 top-2 size-1.5 rounded-full bg-danger" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 border-s border-border ps-3">
          <div className="grid size-8 place-items-center rounded-full bg-primary-tint text-[12px] font-semibold text-primary">
            יג
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[13px] font-medium text-fg">מנהל מערכת</p>
            <p className="text-[11px] text-fg-subtle">ADMIN</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button type="submit" aria-label="יציאה" className="grid size-8 place-items-center rounded-md text-fg-muted hover:bg-surface-muted">
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
