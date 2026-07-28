import {
  Boxes,
  Building2,
  ChevronLeft,
  Factory,
  MapPin,
  Shield,
  Users,
} from "lucide-react";
import { Badge, Card, CardHeader, PageHeader } from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/data-table";
import type { StatusTone } from "@/domain/types";

interface SettingGroup {
  title: string;
  description: string;
  Icon: typeof Users;
  count: string;
}

const groups: SettingGroup[] = [
  { title: "משתמשים", description: "ניהול חשבונות מערכת", Icon: Users, count: "42 משתמשים" },
  { title: "תפקידים והרשאות", description: "בקרת גישה מבוססת תפקיד", Icon: Shield, count: "6 תפקידים" },
  { title: "מחלקות", description: "מבנה ארגוני", Icon: Building2, count: "3 מחלקות" },
  { title: "קטגוריות ציוד", description: "סיווג נכסים", Icon: Boxes, count: "9 קטגוריות" },
  { title: "יצרנים", description: "ספקים ויצרני ציוד", Icon: Factory, count: "12 יצרנים" },
  { title: "מיקומים", description: "חדרים ואזורי אחסון", Icon: MapPin, count: "18 מיקומים" },
];

interface UserRow {
  id: string;
  name: string;
  role: string;
  status: "active" | "suspended";
}

const users: UserRow[] = [
  { id: "u-1", name: "ד״ר יוסרי ג׳מיל", role: "מנהל מערכת", status: "active" },
  { id: "u-2", name: "ד״ר נועה לוי", role: "רופא בכיר", status: "active" },
  { id: "u-3", name: "רון ביטון", role: "טכנאי הרדמה", status: "active" },
  { id: "u-4", name: "מירב אזולאי", role: "אחות אחראית", status: "active" },
  { id: "u-5", name: "משתמש אורח", role: "צפייה בלבד", status: "suspended" },
];

const statusMeta: Record<UserRow["status"], { label: string; tone: StatusTone }> = {
  active: { label: "פעיל", tone: "success" },
  suspended: { label: "מושהה", tone: "neutral" },
};

const userColumns: Column<UserRow>[] = [
  { key: "name", header: "שם", render: (u) => <span className="font-medium">{u.name}</span> },
  { key: "role", header: "תפקיד מערכת", render: (u) => u.role },
  {
    key: "status",
    header: "סטטוס",
    align: "end",
    render: (u) => <Badge tone={statusMeta[u.status].tone}>{statusMeta[u.status].label}</Badge>,
  },
];

export default function AdministrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ניהול מערכת"
        description="מחלקות, משתמשים, הרשאות, תפקידים, קטגוריות, יצרנים ומיקומים"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const Icon = g.Icon;
          return (
            <button
              key={g.title}
              type="button"
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 text-start shadow-[var(--shadow-card)] transition-colors hover:bg-surface-muted"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-primary-tint text-primary">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-fg">{g.title}</span>
                  <span className="block text-[12px] text-fg-muted">{g.description}</span>
                  <span className="mt-0.5 block text-[11px] text-fg-subtle">{g.count}</span>
                </span>
              </span>
              <ChevronLeft className="size-4 text-fg-subtle" />
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader title="משתמשים אחרונים" description="ניהול חשבונות וגישה" />
        <DataTable columns={userColumns} rows={users} keyOf={(u) => u.id} />
      </Card>
    </div>
  );
}
