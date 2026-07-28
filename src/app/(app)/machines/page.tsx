import { Download, Plus } from "lucide-react";
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
import { machines } from "@/data/mock";
import { operationalStatus } from "@/lib/status";
import type { AnesthesiaMachine } from "@/domain/types";

const columns: Column<AnesthesiaMachine>[] = [
  { key: "tag", header: "מספר נכס", render: (m) => <span className="tabular font-medium">{m.assetTag}</span> },
  { key: "man", header: "יצרן", render: (m) => m.manufacturer },
  { key: "model", header: "דגם", render: (m) => m.model },
  { key: "sn", header: "מספר סידורי", render: (m) => <span className="tabular text-fg-muted">{m.serialNumber}</span> },
  { key: "loc", header: "מיקום", render: (m) => m.location },
  {
    key: "status",
    header: "סטטוס",
    render: (m) => (
      <Badge tone={operationalStatus[m.status].tone}>
        <StatusDot tone={operationalStatus[m.status].tone} />
        {operationalStatus[m.status].label}
      </Badge>
    ),
  },
  {
    key: "cal",
    header: "כיול הבא",
    align: "end",
    render: (m) => (
      <span className="tabular">
        {new Date(m.nextCalibration).toLocaleDateString("he-IL")}
      </span>
    ),
  },
];

export default function MachinesPage() {
  const counts = {
    operational: machines.filter((m) => m.status === "operational").length,
    attention: machines.filter((m) => m.status === "attention").length,
    maintenance: machines.filter((m) => m.status === "maintenance").length,
    down: machines.filter((m) => m.status === "down").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="מכונות הרדמה"
        description="מלאי מלא, פרופיל נכס, תחזוקה וכיול"
        actions={
          <>
            <Button>
              <Download className="size-4" />
              ייצוא
            </Button>
            <Button variant="primary">
              <Plus className="size-4" />
              הוספת מכונה
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="סך המכונות" value={`${machines.length}`} hint="במחלקה" tone="neutral" />
        <StatCard label="תקינות" value={`${counts.operational}`} tone="success" />
        <StatCard label="דורשות תשומת לב" value={`${counts.attention + counts.maintenance}`} tone="warning" />
        <StatCard label="מושבתות" value={`${counts.down}`} tone="danger" />
      </div>

      <Card>
        <CardHeader title="מלאי מכונות" description={`${machines.length} רשומות`} />
        <DataTable columns={columns} rows={machines} keyOf={(m) => m.id} />
      </Card>
    </div>
  );
}
