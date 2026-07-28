import type {
  OperationalStatus,
  Priority,
  StatusTone,
} from "@/domain/types";

export const operationalStatus: Record<
  OperationalStatus,
  { label: string; tone: StatusTone }
> = {
  operational: { label: "תקין", tone: "success" },
  attention: { label: "דורש תשומת לב", tone: "warning" },
  maintenance: { label: "בתחזוקה", tone: "info" },
  down: { label: "מושבת", tone: "danger" },
};

export const priorityLabel: Record<Priority, { label: string; tone: StatusTone }> = {
  low: { label: "נמוכה", tone: "neutral" },
  medium: { label: "בינונית", tone: "info" },
  high: { label: "גבוהה", tone: "warning" },
  critical: { label: "קריטית", tone: "danger" },
};

export const roomStatus: Record<string, { label: string; tone: StatusTone }> = {
  active: { label: "בפעילות", tone: "success" },
  idle: { label: "פנוי", tone: "neutral" },
  cleaning: { label: "ניקיון", tone: "info" },
  blocked: { label: "חסום", tone: "danger" },
};

export const faultStatus: Record<string, { label: string; tone: StatusTone }> = {
  open: { label: "פתוחה", tone: "danger" },
  assigned: { label: "שויכה", tone: "warning" },
  in_progress: { label: "בטיפול", tone: "info" },
  resolved: { label: "נסגרה", tone: "success" },
};

export const staffStatus: Record<string, { label: string; tone: StatusTone }> = {
  present: { label: "נוכח", tone: "success" },
  on_call: { label: "כוננות", tone: "info" },
  leave: { label: "היעדרות", tone: "warning" },
  vacation: { label: "חופשה", tone: "neutral" },
};

export const roleLabel: Record<string, string> = {
  physician: "רופא/ה",
  nurse: "אח/ות",
  technician: "טכנאי/ת",
};

export const shiftLabel: Record<string, string> = {
  morning: "בוקר",
  evening: "ערב",
  night: "לילה",
  off: "מנוחה",
};
