import { FileText, Search, Upload } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  PageHeader,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/data-table";
import { documents } from "@/data/mock";
import type { DocumentRecord } from "@/domain/types";

const columns: Column<DocumentRecord>[] = [
  {
    key: "name",
    header: "שם המסמך",
    render: (d) => (
      <span className="flex items-center gap-2 font-medium">
        <FileText className="size-4 text-fg-subtle" />
        {d.name}
      </span>
    ),
  },
  { key: "type", header: "סוג", render: (d) => <Badge tone="neutral">{d.type}</Badge> },
  { key: "owner", header: "בעלים", render: (d) => d.owner },
  { key: "ver", header: "גרסה", render: (d) => <span className="tabular">{d.version}</span> },
  {
    key: "updated",
    header: "עודכן",
    align: "end",
    render: (d) => <span className="tabular">{new Date(d.updatedAt).toLocaleDateString("he-IL")}</span>,
  },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="מרכז מסמכים"
        description="נהלים, תעודות, דוחות תחזוקה ומסמכי בית חולים · תמיכת OCR"
        actions={
          <Button variant="primary">
            <Upload className="size-4" />
            העלאת מסמך
          </Button>
        }
      />

      <Card>
        <CardHeader
          title="ספריית מסמכים"
          description={`${documents.length} מסמכים`}
          action={
            <div className="relative">
              <Search className="pointer-events-none absolute inset-inline-start-2.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
              <input
                type="text"
                placeholder="חיפוש מסמך…"
                className="h-9 w-56 rounded-md border border-border bg-surface-muted ps-8 pe-3 text-[13px] text-fg placeholder:text-fg-subtle focus:border-primary focus:bg-surface"
              />
            </div>
          }
        />
        <DataTable columns={columns} rows={documents} keyOf={(d) => d.id} />
      </Card>
    </div>
  );
}
