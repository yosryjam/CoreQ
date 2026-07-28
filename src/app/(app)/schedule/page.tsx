import { CalendarDays, Printer } from "lucide-react";
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
import { staff } from "@/data/mock";
import { roleLabel, shiftLabel, staffStatus } from "@/lib/status";
import type { StaffMember } from "@/domain/types";

const columns: Column<StaffMember>[] = [
  { key: "name", header: "שם", render: (s) => <span className="font-medium">{s.name}</span> },
  { key: "role", header: "תפקיד", render: (s) => roleLabel[s.role] },
  { key: "shift", header: "משמרת", render: (s) => shiftLabel[s.shift] },
  {
    key: "room",
    header: "שיבוץ",
    render: (s) => s.room ?? <span className="text-fg-subtle">—</span>,
  },
  {
    key: "status",
    header: "סטטוס",
    align: "end",
    render: (s) => (
      <Badge tone={staffStatus[s.status].tone}>
        <StatusDot tone={staffStatus[s.status].tone} />
        {staffStatus[s.status].label}
      </Badge>
    ),
  },
];

export default function SchedulePage() {
  const byRole = (r: StaffMember["role"]) => staff.filter((s) => s.role === r).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="סידור עבודה"
        description="רופאים, אחים/אחיות וטכנאים · משמרות, כוננות וחופשות"
        actions={
          <>
            <Button>
              <Printer className="size-4" />
              הדפסה
            </Button>
            <Button variant="primary">
              <CalendarDays className="size-4" />
              עריכת סידור
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="רופאים" value={`${byRole("physician")}`} tone="info" />
        <StatCard label="אחים/אחיות" value={`${byRole("nurse")}`} tone="info" />
        <StatCard label="טכנאים" value={`${byRole("technician")}`} tone="info" />
        <StatCard
          label="נוכחים כעת"
          value={`${staff.filter((s) => s.status === "present").length}`}
          tone="success"
        />
      </div>

      <Card>
        <CardHeader title="משמרת נוכחית" description="שיבוץ צוות לפי חדר" />
        <DataTable columns={columns} rows={staff} keyOf={(s) => s.id} />
      </Card>
    </div>
  );
}
