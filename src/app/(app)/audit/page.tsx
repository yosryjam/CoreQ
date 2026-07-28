import { CheckCircle2, CircleAlert, CircleDashed } from "lucide-react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/ui";
import type { StatusTone } from "@/domain/types";

interface AuditItem {
  requirement: string;
  category: string;
  status: "complete" | "partial" | "missing";
  evidence: string;
}

const items: AuditItem[] = [
  { requirement: "נהלי בדיקת מכונת הרדמה", category: "נהלים", status: "complete", evidence: "נוהל v4.2" },
  { requirement: "תיעוד כיול שנתי — כלל המכונות", category: "תחזוקה", status: "partial", evidence: "7/8 מכונות" },
  { requirement: "רשומות בדיקת עגלות החייאה", category: "ציוד חירום", status: "complete", evidence: "6/6 עגלות" },
  { requirement: "הסמכות צוות בתוקף", category: "כוח אדם", status: "partial", evidence: "312/320 אחים" },
  { requirement: "פרוטוקול ניהול סמים מבוקרים", category: "בטיחות תרופתית", status: "complete", evidence: "מאושר" },
  { requirement: "דוחות אירועים חריגים", category: "בטיחות המטופל", status: "missing", evidence: "טרם הוגש Q2" },
];

const meta: Record<
  AuditItem["status"],
  { label: string; tone: StatusTone; Icon: typeof CheckCircle2; iconClass: string }
> = {
  complete: { label: "הושלם", tone: "success", Icon: CheckCircle2, iconClass: "text-success" },
  partial: { label: "חלקי", tone: "warning", Icon: CircleDashed, iconClass: "text-warning" },
  missing: { label: "חסר", tone: "danger", Icon: CircleAlert, iconClass: "text-danger" },
};

export default function AuditPage() {
  const complete = items.filter((i) => i.status === "complete").length;
  const readiness = Math.round((complete / items.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="ביקורת והסמכה"
        description="היערכות לביקורת משרד הבריאות · ראיות, נהלים, תקנים ומעקב פערים"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="מוכנות לביקורת" value={`${readiness}%`} tone="warning" />
        <StatCard label="דרישות הושלמו" value={`${complete}/${items.length}`} tone="success" />
        <StatCard label="פערים חלקיים" value={`${items.filter((i) => i.status === "partial").length}`} tone="warning" />
        <StatCard label="פריטים חסרים" value={`${items.filter((i) => i.status === "missing").length}`} tone="danger" />
      </div>

      <Card>
        <CardHeader
          title="רשימת דרישות רגולטוריות"
          description="מעקב פערים לקראת חידוש רישיון שנתי"
        />
        <CardBody className="space-y-2">
          {items.map((item) => {
            const m = meta[item.status];
            const Icon = m.Icon;
            return (
              <div
                key={item.requirement}
                className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className={`size-5 shrink-0 ${m.iconClass}`} />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-fg">{item.requirement}</p>
                    <p className="text-[11px] text-fg-subtle">{item.category} · {item.evidence}</p>
                  </div>
                </div>
                <Badge tone={m.tone}>{m.label}</Badge>
              </div>
            );
          })}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="מדד היערכות כולל" />
        <CardBody>
          <ProgressBar value={readiness} tone="warning" />
        </CardBody>
      </Card>
    </div>
  );
}
