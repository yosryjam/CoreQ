import { Plus } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  PageHeader,
  StatCard,
  StatusDot,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/data-table";
import { faults } from "@/data/mock";
import { faultStatus, priorityLabel } from "@/lib/status";
import type { Fault } from "@/domain/types";

const columns: Column<Fault>[] = [
  { key: "id", header: "מזהה", render: (f) => <span className="tabular text-fg-muted">{f.id}</span> },
  { key: "title", header: "תיאור", render: (f) => <span className="font-medium">{f.title}</span> },
  { key: "asset", header: "נכס", render: (f) => <span className="tabular">{f.asset}</span> },
  { key: "loc", header: "מיקום", render: (f) => f.location },
  {
    key: "pri",
    header: "עדיפות",
    render: (f) => (
      <Badge tone={priorityLabel[f.priority].tone}>
        <StatusDot tone={priorityLabel[f.priority].tone} />
        {priorityLabel[f.priority].label}
      </Badge>
    ),
  },
  {
    key: "assignee",
    header: "אחראי",
    render: (f) => f.assignee ?? <span className="text-fg-subtle">לא שויך</span>,
  },
  { key: "sla", header: "SLA", align: "center", render: (f) => <span className="tabular">{f.slaHours} ש׳</span> },
  {
    key: "status",
    header: "סטטוס",
    align: "end",
    render: (f) => <Badge tone={faultStatus[f.status].tone}>{faultStatus[f.status].label}</Badge>,
  },
];

export default function FaultsPage() {
  const open = faults.filter((f) => f.status !== "resolved");

  return (
    <div className="space-y-6">
      <PageHeader
        title="ניהול תקלות"
        description="פתיחה, שיוך טכנאי, עדיפות, יומן תיקון ומעקב SLA"
        actions={
          <Button variant="primary">
            <Plus className="size-4" />
            פתיחת תקלה
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="תקלות פתוחות" value={`${open.length}`} tone="danger" />
        <StatCard label="קריטיות" value={`${faults.filter((f) => f.priority === "critical" && f.status !== "resolved").length}`} tone="danger" />
        <StatCard label="בטיפול" value={`${faults.filter((f) => f.status === "in_progress").length}`} tone="info" />
        <StatCard label="נסגרו החודש" value="12" delta={8} tone="success" />
      </div>

      <Card>
        <CardHeader title="כל התקלות" description="לפי עדיפות וזמן פתיחה" />
        <DataTable columns={columns} rows={faults} keyOf={(f) => f.id} />
      </Card>
    </div>
  );
}
