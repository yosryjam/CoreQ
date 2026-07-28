import {
  Activity,
  AlertTriangle,
  ClipboardCheck,
  DoorOpen,
  Printer,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  StatCard,
  StatusDot,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/data-table";
import { faults, notifications, rooms } from "@/data/mock";
import { faultStatus, priorityLabel, roomStatus } from "@/lib/status";
import type { OperatingRoom } from "@/domain/types";

const today = new Date().toLocaleDateString("he-IL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const roomColumns: Column<OperatingRoom>[] = [
  {
    key: "name",
    header: "חדר",
    render: (r) => <span className="font-medium">{r.name}</span>,
  },
  {
    key: "status",
    header: "סטטוס",
    render: (r) => (
      <Badge tone={roomStatus[r.status].tone}>
        <StatusDot tone={roomStatus[r.status].tone} />
        {roomStatus[r.status].label}
      </Badge>
    ),
  },
  {
    key: "proc",
    header: "פרוצדורה נוכחית",
    render: (r) => r.currentProcedure ?? <span className="text-fg-subtle">—</span>,
  },
  {
    key: "team",
    header: "צוות",
    render: (r) => r.team ?? <span className="text-fg-subtle">—</span>,
  },
  {
    key: "faults",
    header: "תקלות",
    align: "center",
    render: (r) =>
      r.openFaults > 0 ? (
        <Badge tone="danger">{r.openFaults}</Badge>
      ) : (
        <span className="text-fg-subtle">0</span>
      ),
  },
];

export default function OperationsPage() {
  const openFaults = faults.filter((f) => f.status !== "resolved");
  const activeRooms = rooms.filter((r) => r.status === "active").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="תפעול יומי"
        description={`פתיחת יום · ${today}`}
        actions={
          <>
            <Button>
              <Printer className="size-4" />
              הדפסת דוח בוקר
            </Button>
            <Button variant="primary">
              <ClipboardCheck className="size-4" />
              פתיחת יום
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="כשירות מבצעית"
          value="92%"
          delta={1}
          hint="מעל היעד"
          tone="success"
          icon={<Activity className="size-[18px]" />}
        />
        <StatCard
          label="חדרים בפעילות"
          value={`${activeRooms}/${rooms.length}`}
          hint="בזמן אמת"
          tone="info"
          icon={<DoorOpen className="size-[18px]" />}
        />
        <StatCard
          label="בדיקות בוקר הושלמו"
          value="4/5"
          delta={-20}
          hint="חדר 5 בהמתנה"
          tone="warning"
          icon={<ClipboardCheck className="size-[18px]" />}
        />
        <StatCard
          label="תקלות פתוחות"
          value={`${openFaults.length}`}
          delta={-20}
          hint="אין חריגת SLA"
          tone="danger"
          icon={<AlertTriangle className="size-[18px]" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="מצב חדרי ניתוח"
            description="תמונת מצב עדכנית לכל החדרים"
            action={<Button variant="ghost">כל החדרים</Button>}
          />
          <DataTable columns={roomColumns} rows={rooms} keyOf={(r) => r.id} />
        </Card>

        <Card>
          <CardHeader title="התראות היום" description="פריטים הדורשים טיפול" />
          <CardBody className="space-y-3">
            {notifications
              .filter((n) => !n.read)
              .map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 rounded-md border border-border bg-surface-muted p-3"
                >
                  <StatusDot tone={priorityLabel[n.priority].tone} />
                  <div className="min-w-0">
                    <p className="text-[13px] text-fg">{n.message}</p>
                    <p className="mt-0.5 text-[11px] text-fg-subtle">
                      {new Date(n.at).toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="תקלות פעילות"
          description="לפי עדיפות וזמן פתיחה"
          action={<Button variant="ghost">מעבר לניהול תקלות</Button>}
        />
        <DataTable
          columns={[
            { key: "id", header: "מזהה", render: (f) => <span className="tabular text-fg-muted">{f.id}</span> },
            { key: "title", header: "תיאור", render: (f) => <span className="font-medium">{f.title}</span> },
            { key: "loc", header: "מיקום", render: (f) => f.location },
            { key: "pri", header: "עדיפות", render: (f) => <Badge tone={priorityLabel[f.priority].tone}>{priorityLabel[f.priority].label}</Badge> },
            { key: "st", header: "סטטוס", render: (f) => <Badge tone={faultStatus[f.status].tone}>{faultStatus[f.status].label}</Badge> },
          ]}
          rows={openFaults}
          keyOf={(f) => f.id}
        />
      </Card>
    </div>
  );
}
