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
import { devices } from "@/data/mock";
import { operationalStatus } from "@/lib/status";
import type { MedicalDevice } from "@/domain/types";

const columns: Column<MedicalDevice>[] = [
  { key: "tag", header: "מספר נכס", render: (d) => <span className="tabular font-medium">{d.assetTag}</span> },
  { key: "cat", header: "קטגוריה", render: (d) => d.category },
  { key: "model", header: "דגם", render: (d) => d.model },
  { key: "vendor", header: "ספק", render: (d) => d.vendor },
  { key: "loc", header: "מיקום", render: (d) => d.location },
  {
    key: "status",
    header: "סטטוס",
    render: (d) => (
      <Badge tone={operationalStatus[d.status].tone}>
        <StatusDot tone={operationalStatus[d.status].tone} />
        {operationalStatus[d.status].label}
      </Badge>
    ),
  },
  {
    key: "warr",
    header: "תום אחריות",
    align: "end",
    render: (d) => (
      <span className="tabular">{new Date(d.warrantyEnd).toLocaleDateString("he-IL")}</span>
    ),
  },
];

export default function EquipmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ציוד רפואי"
        description="אולטרסאונד, לרינגוסקופ, ברונכוסקופ, משאבות, מכשירי הנשמה וציוד בלוקים"
        actions={
          <Button variant="primary">
            <Plus className="size-4" />
            הוספת ציוד
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="סך פריטים" value={`${devices.length}`} tone="neutral" />
        <StatCard label="זמינים" value={`${devices.filter((d) => d.status === "operational").length}`} tone="success" />
        <StatCard label="בתחזוקה" value={`${devices.filter((d) => d.status === "maintenance").length}`} tone="info" />
        <StatCard label="אחריות פגה תוך 90 יום" value="2" tone="warning" />
      </div>

      <Card>
        <CardHeader title="מלאי ציוד רפואי" description={`${devices.length} רשומות`} />
        <DataTable columns={columns} rows={devices} keyOf={(d) => d.id} />
      </Card>
    </div>
  );
}
