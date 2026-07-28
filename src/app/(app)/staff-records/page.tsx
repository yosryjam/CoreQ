import Link from "next/link";
import { Badge, Button, Card, CardBody, CardHeader, PageHeader, StatCard } from "@/components/ui";
import { FileWarning, ShieldCheck, UserPlus, UsersRound } from "lucide-react";

export default function StaffRecordsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="תיקי עובדים וכשירות מקצועית"
        description="שלב ראשון · רופאים מרדימים מומחים · ניהול מסמכים, קליטה, הרשאות והערכת כשירות"
        actions={<Button variant="primary"><UserPlus className="size-4" />פתיחת תיק רופא</Button>}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="רופאים מומחים" value="1" hint="נתוני הדגמה" tone="info" icon={<UsersRound className="size-4" />} />
        <StatCard label="תיקים תקינים" value="0" tone="success" />
        <StatCard label="דורשים השלמה" value="1" tone="warning" icon={<FileWarning className="size-4" />} />
        <StatCard label="כשירות מאושרת" value="0" tone="neutral" icon={<ShieldCheck className="size-4" />} />
      </div>
      <Card>
        <CardHeader title="רופאים מרדימים מומחים" description="בחר תיק כדי להתנסות בתהליך הקליטה הדיגיטלי" />
        <CardBody>
          <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-fg">ד״ר נועה לוי</h3>
                <Badge tone="warning">בתהליך קליטה</Badge>
              </div>
              <p className="mt-1 text-sm text-fg-muted">רופאה מרדימה מומחית · מספר עובד 10482 · תחילת עבודה 01.07.2026</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-fg-muted">
                <span className="rounded-md bg-surface-muted px-2 py-1">השלמה: 44%</span>
                <span className="rounded-md bg-surface-muted px-2 py-1">מסמכים חסרים: 5</span>
                <span className="rounded-md bg-surface-muted px-2 py-1">פעולות פתוחות: 8</span>
              </div>
            </div>
            <Link href="/staff-records/physician-demo" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover">פתיחת תיק הדגמה</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
