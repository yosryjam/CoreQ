import { Bot, Braces, Database, Network, Radio, ScanText } from "lucide-react";
import { Badge, Card, CardBody, PageHeader } from "@/components/ui";

const stages = [
  { stage: 2, title: "PostgreSQL", description: "מסד נתונים ארגוני, סכמות לפי Domain, Audit וגרסאות מסמכים", icon: Database, status: "תשתית מתוכננת" },
  { stage: 3, title: "NestJS API", description: "REST/OpenAPI, Clean Architecture, Repository Pattern והרשאות", icon: Braces, status: "תשתית מתוכננת" },
  { stage: 4, title: "Real Time", description: "SSE להתראות, סטטוס חדרים, תקלות ועדכוני כשירות", icon: Radio, status: "תשתית מתוכננת" },
  { stage: 5, title: "OCR", description: "קליטת תעודות, חילוץ שם, סוג מסמך ותאריך תפוגה עם אימות ADMIN", icon: ScanText, status: "תלוי ספק OCR" },
  { stage: 6, title: "AI Assistant", description: "חיפוש, סיכום פערים והמלצות — ללא החלטה קלינית אוטונומית", icon: Bot, status: "דורש ממשל AI" },
  { stage: 7, title: "Medical Knowledge Graph", description: "קישור עובדים, כשירויות, ציוד, נהלים, חדרים ודרישות איכות", icon: Network, status: "שלב מתקדם" },
];

export default function PlatformPage() {
  return <div className="space-y-6"><PageHeader title="תשתית CoreQ" description="מפת פיתוח טכנולוגית — שלבים 2–7. בדמו הנוכחי הרכיבים מוצגים כארכיטקטורה ואינם מחוברים לשירותי ייצור." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{stages.map((s) => { const Icon=s.icon; return <Card key={s.stage}><CardBody><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-lg bg-primary-tint text-primary"><Icon className="size-5" /></span><Badge tone="info">שלב {s.stage}</Badge></div><h2 className="mt-4 text-lg font-semibold text-fg">{s.title}</h2><p className="mt-2 min-h-12 text-sm text-fg-muted">{s.description}</p><div className="mt-4 border-t border-border pt-3 text-xs text-fg-subtle">סטטוס: {s.status}</div></CardBody></Card>})}</div><Card><CardBody><p className="text-sm text-fg-muted"><strong className="text-fg">הערת גרסה:</strong> PostgreSQL, NestJS, OCR ו-AI דורשים שירותי שרת, מפתחות, אבטחת מידע וסביבת בית חולים. גרסת ההתנסות מספקת את ממשק המשתמש וזרימת העבודה לבדיקת הדרישות לפני מימוש תשתיות הייצור.</p></CardBody></Card></div>;
}
