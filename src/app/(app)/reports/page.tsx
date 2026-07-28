import { FileSpreadsheet, FileText } from "lucide-react";
import { Button, Card, CardBody, PageHeader } from "@/components/ui";

interface ReportDef {
  title: string;
  period: string;
  description: string;
}

const reports: ReportDef[] = [
  { title: "דוח תפעול יומי", period: "יומי", description: "פתיחת יום, בדיקות מכונה, תקלות ושיבוץ צוות" },
  { title: "סיכום תחזוקה שבועי", period: "שבועי", description: "תחזוקה מונעת, כיולים ותקלות שנסגרו" },
  { title: "דוח מדדים חודשי", period: "חודשי", description: "זמינות, MTTR, עמידה בתחזוקה וכשירות" },
  { title: "דוח היערכות שנתי", period: "שנתי", description: "מוכנות לביקורת משרד הבריאות וחידוש רישיון" },
  { title: "מלאי נכסים", period: "לפי דרישה", description: "כלל מכונות ההרדמה והציוד הרפואי" },
  { title: "יומן תקלות", period: "לפי דרישה", description: "כל התקלות לפי טווח תאריכים, עדיפות וסטטוס" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="דוחות"
        description="הפקת דוחות יומיים, שבועיים, חודשיים ושנתיים · Excel · PDF · תואם Power BI"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.title}>
            <CardBody className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-md bg-primary-tint text-primary">
                  <FileText className="size-[18px]" />
                </span>
                <span className="rounded-md bg-neutral-tint px-2 py-0.5 text-[11px] font-medium text-neutral">
                  {r.period}
                </span>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-fg">{r.title}</h3>
              <p className="mt-1 flex-1 text-[13px] text-fg-muted">{r.description}</p>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1">
                  <FileText className="size-4" />
                  PDF
                </Button>
                <Button className="flex-1">
                  <FileSpreadsheet className="size-4" />
                  Excel
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
