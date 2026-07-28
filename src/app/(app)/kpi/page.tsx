import { Download } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
} from "@/components/ui";
import { kpis } from "@/data/mock";

export default function KpiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="מרכז מדדים"
        description="מדדי ביצוע חודשיים · זמינות, כשלים, זמני תגובה ועמידה בתחזוקה"
        actions={
          <Button>
            <Download className="size-4" />
            ייצוא ל-Excel
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <Card key={k.key}>
            <CardBody>
              <div className="flex items-start justify-between">
                <p className="text-[13px] font-medium text-fg-muted">{k.label}</p>
                <Badge tone={k.tone}>
                  {k.delta > 0 ? "+" : ""}
                  {k.delta}%
                </Badge>
              </div>
              <p className="mt-3 text-3xl font-semibold tabular text-fg">{k.value}</p>
              <p className="mt-1 text-[12px] text-fg-subtle">יעד: {k.target}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="מגמת זמינות מכונות — 6 חודשים אחרונים"
          description="נתוני הדגמה"
        />
        <CardBody>
          <MiniTrend values={[96.1, 96.8, 97.0, 96.4, 97.9, 97.4]} />
        </CardBody>
      </Card>
    </div>
  );
}

/** Lightweight inline bar trend — no chart lib in the scaffold. */
function MiniTrend({ values }: { values: number[] }) {
  const months = ["פבר", "מרץ", "אפר", "מאי", "יונ", "יול"];
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 0.5;
  return (
    <div className="flex items-end gap-4">
      {values.map((v, i) => {
        const h = ((v - min) / (max - min)) * 140 + 20;
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[11px] tabular text-fg-muted">{v}%</span>
            <div
              className="w-full rounded-t-md bg-primary/85"
              style={{ height: `${h}px` }}
            />
            <span className="text-[11px] text-fg-subtle">{months[i]}</span>
          </div>
        );
      })}
    </div>
  );
}
