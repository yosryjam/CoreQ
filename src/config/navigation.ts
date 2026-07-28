import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  DoorOpen,
  FileCheck2,
  FileText,
  FolderOpen,
  HeartPulse,
  Settings,
  ShieldCheck,
  UsersRound,
  Cpu,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string; // Hebrew-first
  en: string; // English reference (localization later)
  icon: LucideIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "מרכז בקרה",
    items: [
      { href: "/operations", label: "תפעול יומי", en: "Daily Operations", icon: Activity },
      { href: "/readiness", label: "כשירות מבצעית", en: "Mission Readiness", icon: ShieldCheck },
    ],
  },
  {
    title: "ציוד ומכשור",
    items: [
      { href: "/machines", label: "מכונות הרדמה", en: "Anesthesia Machines", icon: HeartPulse },
      { href: "/equipment", label: "ציוד רפואי", en: "Medical Equipment", icon: Boxes },
      { href: "/machine-check", label: "בדיקת מכונה יומית", en: "Daily Machine Check", icon: ClipboardCheck },
      { href: "/faults", label: "ניהול תקלות", en: "Fault Management", icon: AlertTriangle },
    ],
  },
  {
    title: "חדרים וכוח אדם",
    items: [
      { href: "/rooms", label: "חדרי ניתוח", en: "Operating Rooms", icon: DoorOpen },
      { href: "/schedule", label: "סידור עבודה", en: "Work Schedule", icon: CalendarDays },
      { href: "/staff-records", label: "תיקי עובדים", en: "Staff Records", icon: UsersRound },
    ],
  },
  {
    title: "איכות ודוחות",
    items: [
      { href: "/kpi", label: "מרכז מדדים", en: "KPI Center", icon: BarChart3 },
      { href: "/audit", label: "ביקורת והסמכה", en: "Audit & Accreditation", icon: FileCheck2 },
      { href: "/reports", label: "דוחות", en: "Reports", icon: FileText },
    ],
  },
  {
    title: "מערכת",
    items: [
      { href: "/documents", label: "מרכז מסמכים", en: "Document Center", icon: FolderOpen },
      { href: "/notifications", label: "התראות", en: "Notifications", icon: Bell },
      { href: "/administration", label: "ניהול מערכת", en: "Administration", icon: Settings },
      { href: "/platform", label: "תשתית CoreQ", en: "CoreQ Platform", icon: Cpu },
    ],
  },
];

/** Flat lookup for page titles / breadcrumbs. */
export const navIndex: Record<string, NavItem> = Object.fromEntries(
  navigation.flatMap((s) => s.items).map((i) => [i.href, i]),
);
