import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface Column<T> {
  key: string;
  header: string;
  align?: "start" | "end" | "center";
  className?: string;
  render: (row: T) => ReactNode;
}

/** Professional, dense enterprise table. RTL-aware via logical properties. */
export function DataTable<T>({
  columns,
  rows,
  keyOf,
  empty = "אין נתונים להצגה",
}: {
  columns: Column<T>[];
  rows: T[];
  keyOf: (row: T) => string;
  empty?: string;
}) {
  const alignClass = {
    start: "text-start",
    end: "text-end",
    center: "text-center",
  } as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "whitespace-nowrap px-4 py-2.5 font-medium text-fg-muted",
                  alignClass[c.align ?? "start"],
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-fg-subtle"
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={keyOf(row)}
                className="border-b border-border last:border-0 hover:bg-surface-muted/60"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-3 text-fg",
                      alignClass[c.align ?? "start"],
                      c.className,
                    )}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
