import { AlertTriangle, HeartPulse, Users } from "lucide-react";
import { Badge, Card, CardBody, PageHeader, StatusDot } from "@/components/ui";
import { rooms } from "@/data/mock";
import { roomStatus } from "@/lib/status";

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="חדרי ניתוח"
        description="פרופיל חדר, צוות משובץ, מכונה, פרוצדורה וסטטוס תקלות"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => {
          const meta = roomStatus[room.status];
          return (
            <Card key={room.id}>
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <h3 className="text-[15px] font-semibold text-fg">{room.name}</h3>
                <Badge tone={meta.tone}>
                  <StatusDot tone={meta.tone} />
                  {meta.label}
                </Badge>
              </div>
              <CardBody className="space-y-3">
                <Row
                  icon={<HeartPulse className="size-4 text-fg-subtle" />}
                  label="פרוצדורה"
                  value={room.currentProcedure ?? "—"}
                />
                <Row
                  icon={<Users className="size-4 text-fg-subtle" />}
                  label="צוות"
                  value={room.team ?? "—"}
                />
                <Row
                  icon={<HeartPulse className="size-4 text-fg-subtle" />}
                  label="מכונה"
                  value={room.machine ?? "—"}
                />
                <Row
                  icon={<AlertTriangle className="size-4 text-fg-subtle" />}
                  label="תקלות פתוחות"
                  value={
                    room.openFaults > 0 ? (
                      <Badge tone="danger">{room.openFaults}</Badge>
                    ) : (
                      "0"
                    )
                  }
                />
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="flex items-center gap-2 text-fg-muted">
        {icon}
        {label}
      </span>
      <span className="text-end font-medium text-fg">{value}</span>
    </div>
  );
}
