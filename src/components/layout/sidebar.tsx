"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-e border-border bg-sidebar">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
        <div className="grid size-8 place-items-center rounded-md bg-primary text-fg-inverse">
          <Activity className="size-[18px]" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight text-fg">CoreQ</p>
          <p className="text-[11px] text-fg-subtle">Anesthesia Operations</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-fg-subtle">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-primary-tint text-primary"
                          : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                      )}
                    >
                      <Icon
                        className="size-[18px] shrink-0"
                        strokeWidth={active ? 2.25 : 1.9}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <p className="text-[11px] text-fg-subtle">מרכז רפואי הרצליה</p>
        <p className="text-[11px] text-fg-subtle">גרסה 0.1.0 · סביבת פיתוח</p>
      </div>
    </aside>
  );
}
