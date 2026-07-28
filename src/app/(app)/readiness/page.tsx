import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  ProgressBar,
} from "@/components/ui";
import { readiness } from "@/data/mock";
import type { StatusTone } from "@/domain/types";

function toneFor(score: number): StatusTone {
  if (score >= 95) return "success";
  if (score >= 85) return "info";
  if (score >= 70) return "warning";
  return "danger";
}

export default function ReadinessPage() {
  const overall = Math.round(
    readiness.reduce((sum, r) => sum + r.score, 0) / readiness.length,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="כשירות מבצעית"
        description="מוכנות ציוד, צוות, תרופות, עגלות החייאה, חדרים ותשתיות"
      />

      {/* Overall gauge */}
      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between sm:px-10">
          <div className="text-center sm:text-start">
            <p className="text-[13px] font-medium text-fg-muted">מדד כשירות כולל</p>
            <p className="mt-1 text-5xl font-semibold tabular text-fg">{overall}%</p>
            <p className="mt-1 text-[13px] text-success">מעל היעד המחלקתי (90%)</p>
          </div>
          <div className="w-full max-w-md">
            <ProgressBar value={overall} tone={toneFor(overall)} />
            <div className="mt-2 flex justify-between text-[11px] text-fg-subtle">
              <span>0%</span>
              <span>יעד 90%</span>
              <span>100%</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Domains */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readiness.map((r) => {
          const tone = toneFor(r.score);
          return (
            <Card key={r.domain}>
              <CardHeader title={r.domain} />
              <CardBody className="space-y-3">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-semibold tabular text-fg">
                    {r.score}%
                  </span>
                  <span
                    className={
                      "flex items-center gap-1 text-[12px] font-medium " +
                      (r.trend > 0
                        ? "text-success"
                        : r.trend < 0
                          ? "text-danger"
                          : "text-fg-subtle")
                    }
                  >
                    {r.trend > 0 ? (
                      <TrendingUp className="size-3.5" />
                    ) : r.trend < 0 ? (
                      <TrendingDown className="size-3.5" />
                    ) : null}
                    {r.trend > 0 ? "+" : ""}
                    {r.trend}
                  </span>
                </div>
                <ProgressBar value={r.score} tone={tone} />
                <p className="text-[12px] text-fg-muted">{r.detail}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
