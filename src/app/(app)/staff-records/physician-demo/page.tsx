"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, MessageSquarePlus, RotateCcw, Save, ShieldCheck, Upload } from "lucide-react";
import Link from "next/link";
import { Badge, Button, Card, CardBody, CardHeader, PageHeader, ProgressBar, StatCard } from "@/components/ui";

type Item = { id: string; title: string; category: string; done: boolean; required?: boolean };
type Feedback = { id: number; text: string; area: string; createdAt: string };

const initialItems: Item[] = [
  { id: "doc-license", title: "רישיון רופא בתוקף", category: "מסמכים", done: true, required: true },
  { id: "doc-specialist", title: "תעודת מומחה בהרדמה", category: "מסמכים", done: true, required: true },
  { id: "doc-md", title: "תעודת MD", category: "מסמכים", done: false, required: true },
  { id: "doc-conf", title: "התחייבות לסודיות", category: "מסמכים", done: false, required: true },
  { id: "ori-or", title: "היכרות עם חדרי הניתוח והקצאת חדרים", category: "התמצאות", done: true, required: true },
  { id: "ori-pacu", title: "התאוששות PACU", category: "התמצאות", done: true, required: true },
  { id: "ori-mri", title: "מסלול מטופל וכללי בטיחות MRI", category: "התמצאות", done: false, required: true },
  { id: "sys-cameleon", title: "קמיליון — תיעוד הרדמה ומעקב", category: "מערכות", done: true, required: true },
  { id: "sys-pacs", title: "PACS — צפייה בדימות", category: "מערכות", done: false, required: true },
  { id: "policy-last", title: "פרוטוקול LAST", category: "נהלים", done: true, required: true },
  { id: "policy-mh", title: "Malignant Hyperthermia", category: "נהלים", done: false, required: true },
  { id: "skill-airway", title: "נתיב אוויר מתקדם ושיטת עבודה מקומית", category: "כשירויות", done: true, required: true },
  { id: "skill-regional", title: "הרדמה אזורית מונחית אולטרסאונד", category: "כשירויות", done: false },
  { id: "equip-ge", title: "GE Carestation / Aisys / Aspire", category: "ציוד", done: true, required: true },
  { id: "equip-mcgrath", title: "McGrath ו-C-MAC", category: "ציוד", done: false, required: true },
  { id: "training-acls", title: "ACLS — תוקף שנתיים", category: "הכשרות", done: true, required: true },
  { id: "training-fire", title: "בטיחות אש — שנתי", category: "הכשרות", done: false, required: true },
  { id: "access-mri", title: "הרשאת גישה ל-MRI", category: "הרשאות", done: false },
  { id: "access-drugs", title: "הרשאת ארון תרופות", category: "הרשאות", done: true, required: true },
];

const tabs = ["סקירה", "פרטים", "מסמכים", "התמצאות", "מערכות", "נהלים", "כשירויות", "ציוד", "הכשרות", "הרשאות", "הערכות", "משוב לגרסה"];

export default function PhysicianDemoPage() {
  const [active, setActive] = useState("סקירה");
  const [items, setItems] = useState<Item[]>(initialItems);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("coreq_physician_demo");
    const storedFeedback = localStorage.getItem("coreq_physician_feedback");
    if (stored) setItems(JSON.parse(stored) as Item[]);
    if (storedFeedback) setFeedback(JSON.parse(storedFeedback) as Feedback[]);
  }, []);

  const completion = Math.round((items.filter((i) => i.done).length / items.length) * 100);
  const missingRequired = items.filter((i) => i.required && !i.done).length;
  const visibleItems = active === "סקירה" ? items : items.filter((i) => i.category === active);
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);

  function toggle(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
    setSaved(false);
  }

  function save() {
    localStorage.setItem("coreq_physician_demo", JSON.stringify(items));
    localStorage.setItem("coreq_physician_feedback", JSON.stringify(feedback));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function addFeedback() {
    if (!comment.trim()) return;
    const next = [...feedback, { id: Date.now(), text: comment.trim(), area: active, createdAt: new Date().toLocaleString("he-IL") }];
    setFeedback(next);
    localStorage.setItem("coreq_physician_feedback", JSON.stringify(next));
    setComment("");
  }

  function reset() {
    setItems(initialItems);
    setFeedback([]);
    localStorage.removeItem("coreq_physician_demo");
    localStorage.removeItem("coreq_physician_feedback");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="תיק קליטה — ד״ר נועה לוי" description="רופאה מרדימה מומחית · גרסת הערכה אינטראקטיבית" actions={<><Button onClick={reset}><RotateCcw className="size-4" />איפוס הדגמה</Button><Button variant="primary" onClick={save}><Save className="size-4" />{saved ? "נשמר" : "שמירת שינויים"}</Button></>} />
      <Link href="/staff-records" className="inline-flex items-center gap-1 text-sm text-primary"><ArrowRight className="size-4" />חזרה לרשימת הרופאים</Link>

      <Card>
        <CardBody className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold text-fg">ד״ר נועה לוי</h2><Badge tone={missingRequired === 0 ? "success" : "warning"}>{missingRequired === 0 ? "מוכן לאישור" : "דורש השלמות"}</Badge><Badge tone="info">רופא מרדים מומחה</Badge></div>
            <p className="mt-2 text-sm text-fg-muted">מספר עובד 10482 · היקף משרה 80% · רופא חונך: ד״ר יורי קרילוב · יעד השלמה 30.09.2026</p>
            <div className="mt-4 max-w-xl"><div className="mb-2 flex justify-between text-sm"><span>השלמת תיק הקליטה</span><strong>{completion}%</strong></div><ProgressBar value={completion} tone={completion >= 90 ? "success" : completion >= 60 ? "info" : "warning"} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard label="הושלמו" value={`${items.filter((i) => i.done).length}/${items.length}`} tone="success" />
            <StatCard label="חובה חסרים" value={`${missingRequired}`} tone={missingRequired ? "danger" : "success"} />
            <StatCard label="הערות הערכה" value={`${feedback.length}`} tone="info" />
          </div>
        </CardBody>
      </Card>

      <div className="overflow-x-auto border-b border-border"><div className="flex min-w-max gap-1">{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`border-b-2 px-3 py-2.5 text-sm font-medium ${active === tab ? "border-primary text-primary" : "border-transparent text-fg-muted hover:text-fg"}`}>{tab}</button>)}</div></div>

      {active === "פרטים" ? <Details /> : active === "הערכות" ? <Evaluations /> : active === "משוב לגרסה" ? (
        <Card><CardHeader title="משוב על גרסת ההערכה" description="כאן ניתן לרשום תיקונים ותוספות לבדיקה שלך ושל מנהל המחלקה" /><CardBody className="space-y-4"><div className="flex gap-2"><textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="לדוגמה: להוסיף שדה תאריך קבלת מומחיות..." className="min-h-24 flex-1 rounded-md border border-border p-3 text-sm outline-none focus:border-primary" /><Button variant="primary" onClick={addFeedback}><MessageSquarePlus className="size-4" />הוספת הערה</Button></div>{feedback.length === 0 ? <p className="text-sm text-fg-subtle">טרם נרשמו הערות.</p> : <div className="space-y-2">{feedback.map((f) => <div key={f.id} className="rounded-md border border-border bg-surface-muted p-3"><div className="flex justify-between text-xs text-fg-subtle"><span>אזור: {f.area}</span><span>{f.createdAt}</span></div><p className="mt-1 text-sm text-fg">{f.text}</p></div>)}</div>}</CardBody></Card>
      ) : (
        <Card><CardHeader title={active === "סקירה" ? "כל משימות הקליטה" : active} description="סמן פריטים כדי לבדוק את זרימת העבודה. השינויים נשמרים בדפדפן בלחיצה על שמירה." action={<Button><Upload className="size-4" />העלאת מסמך</Button>} /><CardBody className="space-y-5">{active === "סקירה" ? categories.map((category) => <ItemSection key={category} title={category} items={items.filter((i) => i.category === category)} onToggle={toggle} />) : <ItemSection title={active} items={visibleItems} onToggle={toggle} />}</CardBody></Card>
      )}

      <Card><CardHeader title="החלטת כשירות" description="אישור סופי יינתן רק על ידי מנהל המחלקה" /><CardBody><div className="grid gap-3 md:grid-cols-4">{["מאושר לעבודה עצמאית", "מאושר בכפוף להשלמות", "נדרשת תקופת ליווי נוספת", "טרם מאושר לעבודה עצמאית"].map((x, i) => <button key={x} className={`rounded-lg border p-4 text-start text-sm ${i === 1 ? "border-warning bg-warning-tint text-warning" : "border-border hover:bg-surface-muted"}`}><ShieldCheck className="mb-2 size-5" />{x}</button>)}</div></CardBody></Card>
    </div>
  );
}

function ItemSection({ title, items, onToggle }: { title: string; items: Item[]; onToggle: (id: string) => void }) {
  return <section><div className="mb-2 flex items-center justify-between"><h3 className="font-semibold text-fg">{title}</h3><span className="text-xs text-fg-subtle">{items.filter((i) => i.done).length}/{items.length}</span></div><div className="divide-y divide-border rounded-lg border border-border">{items.map((item) => <label key={item.id} className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-surface-muted"><input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} className="size-4 accent-blue-600" /><span className="flex-1 text-sm text-fg">{item.title}</span>{item.required ? <Badge tone="neutral">חובה</Badge> : <Badge tone="info">לפי תפקיד</Badge>}{item.done ? <CheckCircle2 className="size-5 text-success" /> : <FileText className="size-5 text-fg-subtle" />}</label>)}</div></section>;
}

function Details() {
  const fields = [["שם מלא", "ד״ר נועה לוי"], ["מספר עובד", "10482"], ["מקצוע", "רפואה"], ["תפקיד", "רופאה מרדימה מומחית"], ["דרגה", "רופאה בכירה"], ["התמחות", "הרדמה"], ["מחלקה", "הרדמה וחדרי ניתוח"], ["אחוז משרה", "80%"], ["תאריך תחילת עבודה", "01.07.2026"], ["מנהל ישיר", "ד״ר יורי קרילוב"], ["טלפון", "050-0000000"], ["איש קשר לשעת חירום", "מידע מוגן — ADMIN בלבד"]];
  return <Card><CardHeader title="פרטים אישיים וארגוניים" description="נתוני הדגמה בלבד" /><CardBody><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fields.map(([k, v]) => <label key={k}><span className="mb-1 block text-xs font-medium text-fg-muted">{k}</span><input defaultValue={v} className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm" /></label>)}</div></CardBody></Card>;
}

function Evaluations() {
  return <div className="grid gap-4 lg:grid-cols-3">{[["משוב לאחר חודש", "01.08.2026", "ממתין"], ["משוב לאחר שלושה חודשים", "01.10.2026", "מתוכנן"], ["הערכה שנתית", "01.07.2027", "מתוכנן"]].map(([title, date, status]) => <Card key={title}><CardBody><Badge tone={status === "ממתין" ? "warning" : "neutral"}>{status}</Badge><h3 className="mt-3 font-semibold text-fg">{title}</h3><p className="mt-1 text-sm text-fg-muted">מועד יעד: {date}</p><Button className="mt-4">פתיחת טופס</Button></CardBody></Card>)}</div>;
}
