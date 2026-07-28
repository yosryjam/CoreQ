import { ClipboardCheck } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/data-table";
import { checklistRuns } from "@/data/mock";
import type { ChecklistRun } from "@/domain/types";
import type { StatusTone } from "@/domain/types";

const resultMeta: Record<string, { label: string; tone: StatusTone }> = {
  pass: { label: "עבר", tone: "success" },
  fail: { label: "נכשל", tone: "danger" },
  pending: { label: "בהמתנה", tone: "neutral" },
};

const columns: Column<ChecklistRun>[] = [
  { key: "machine", header: "מכונה", render: (c) => <span className="tabular font-medium">{c.machine}</span> },
  { key: "room", header: "חדר", render: (c) => c.room },
  { key: "by", header: "בוצע ע״י", render: (c) => c.performedBy },
  {
    key: "time",
    header: "שעה",
    render: (c) =>
      c.performedAt === "—" ? (
        <span className="text-fg-subtle">—</span>
      ) : (
        <span className="tabular">
          {new Date(c.performedAt).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
  },
  {
    key: "items",
    header: "פריטים",
    render: (c) => (
      <div className="w-28">
        <div className="mb-1 flex justify-between text-[11px] text-fg-muted">
          <span className="tabular">
            {c.itemsPassed}/{c.itemsTotal}
          </span>
        </div>
        <ProgressBar
          value={(c.itemsPassed / c.itemsTotal) * 100}
          tone={c.result === "fail" ? "danger" : c.result === "pending" ? "neutral" : "success"}
        />
      </div>
    ),
  },
  {
    key: "res",
    header: "תוצאה",
    align: "end",
    render: (c) => <Badge tone={resultMeta[c.result].tone}>{resultMeta[c.result].label}</Badge>,
  },
];

export default function MachineCheckPage() {
  const done = checklistRuns.filter((c) => c.result !== "pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="בדיקת מכונה יומית"
        description="רשימת תיוג דיגיטלית · חתימה אלקטרונית · חותמת זמן"
        actions={
          <Button variant="primary">
            <ClipboardCheck className="size-4" />
            בדיקה חדשה
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="בדיקות היום" value={`${done}/${checklistRuns.length}`} tone="info" />
        <StatCard label="עברו" value={`${checklistRuns.filter((c) => c.result === "pass").length}`} tone="success" />
        <StatCard label="נכשלו" value={`${checklistRuns.filter((c) => c.result === "fail").length}`} tone="danger" />
        <StatCard label="בהמתנה" value={`${checklistRuns.filter((c) => c.result === "pending").length}`} tone="neutral" />
      </div>

      <Card>
        <CardHeader title="בדיקות בוקר" description="סטטוס לכל מכונה" />
        <DataTable columns={columns} rows={checklistRuns} keyOf={(c) => c.id} />
      </Card>
    </div>
  );
}
