/* =========================================================================
   CoreQ — Domain Layer
   Pure types / entities. No framework, no I/O. The language of the department.
   ========================================================================= */

export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type OperationalStatus =
  | "operational" // תקין
  | "attention" // דורש תשומת לב
  | "down" // מושבת
  | "maintenance"; // בתחזוקה

export type Priority = "low" | "medium" | "high" | "critical";

/** Anesthesia machine (module 2). */
export interface AnesthesiaMachine {
  id: string;
  assetTag: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  status: OperationalStatus;
  lastCheck: string; // ISO date
  nextCalibration: string; // ISO date
}

/** Medical device (module 3). */
export interface MedicalDevice {
  id: string;
  assetTag: string;
  category: string;
  model: string;
  vendor: string;
  location: string;
  status: OperationalStatus;
  warrantyEnd: string;
}

/** Operating room (module 6). */
export interface OperatingRoom {
  id: string;
  name: string;
  status: "active" | "idle" | "cleaning" | "blocked";
  currentProcedure: string | null;
  team: string | null;
  machine: string | null;
  openFaults: number;
}

/** Fault ticket (module 7). */
export interface Fault {
  id: string;
  title: string;
  asset: string;
  location: string;
  priority: Priority;
  status: "open" | "assigned" | "in_progress" | "resolved";
  assignee: string | null;
  openedAt: string;
  slaHours: number;
}

/** Staff member for scheduling (module 5). */
export interface StaffMember {
  id: string;
  name: string;
  role: "physician" | "nurse" | "technician";
  shift: "morning" | "evening" | "night" | "off";
  room: string | null;
  status: "present" | "on_call" | "leave" | "vacation";
}

/** Readiness domain reading (module 8). */
export interface ReadinessDomainReading {
  domain: string;
  score: number; // 0..100
  trend: number; // delta vs prev period
  detail: string;
}

/** KPI card reading (module 9). */
export interface KpiReading {
  key: string;
  label: string;
  value: string;
  target: string;
  delta: number; // percent change
  tone: StatusTone;
}

/** Notification item (module 13). */
export interface NotificationItem {
  id: string;
  kind: "maintenance" | "calibration" | "fault" | "staffing" | "checklist";
  message: string;
  at: string;
  priority: Priority;
  read: boolean;
}

/** Document record (module 11). */
export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  owner: string;
  updatedAt: string;
  version: string;
}

/** Machine-check checklist result (module 4). */
export interface ChecklistRun {
  id: string;
  machine: string;
  room: string;
  performedBy: string;
  performedAt: string;
  result: "pass" | "fail" | "pending";
  itemsPassed: number;
  itemsTotal: number;
}
