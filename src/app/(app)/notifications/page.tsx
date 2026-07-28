import {
  AlertTriangle,
  Bell,
  CalendarClock,
  ClipboardList,
  Users,
  Wrench,
} from "lucide-react";
import { Badge, Button, Card, CardBody, PageHeader } from "@/components/ui";
import { notifications } from "@/data/mock";
import { priorityLabel } from "@/lib/status";
import type { NotificationItem } from "@/domain/types";

const kindMeta: Record<
  NotificationItem["kind"],
  { label: string; Icon: typeof Bell }
> = {
  calibration: { label: "כיול", Icon: CalendarClock },
  maintenance: { label: "תחזוקה", Icon: Wrench },
  fault: { label: "תקלה", Icon: AlertTriangle },
  staffing: { label: "כוח אדם", Icon: Users },
  checklist: { label: "בדיקה", Icon: ClipboardList },
};

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="התראות"
        description="תחזוקה מתקרבת, כיולים, תקלות, מחסור בכוח אדם ובדיקות חסרות"
        actions={<Button>סימון הכל כנקרא</Button>}
      />

      <Card>
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="flex items-center gap-2 text-[13px] font-medium text-fg">
            <Bell className="size-4 text-fg-muted" />
            {unread} התראות שלא נקראו
          </span>
        </div>
        <CardBody className="space-y-2">
          {notifications.map((n) => {
            const m = kindMeta[n.kind];
            const Icon = m.Icon;
            return (
              <div
                key={n.id}
                className={
                  "flex items-start gap-3 rounded-md border px-4 py-3 " +
                  (n.read ? "border-border bg-surface" : "border-primary-tint-strong bg-primary-tint/40")
                }
              >
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-surface-muted text-fg-muted">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-fg-subtle">{m.label}</span>
                    <Badge tone={priorityLabel[n.priority].tone}>
                      {priorityLabel[n.priority].label}
                    </Badge>
                    {!n.read ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                  </div>
                  <p className="mt-1 text-[13px] text-fg">{n.message}</p>
                  <p className="mt-0.5 text-[11px] text-fg-subtle">
                    {new Date(n.at).toLocaleString("he-IL", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}
