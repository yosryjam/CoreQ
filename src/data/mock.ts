import type {
  AnesthesiaMachine,
  ChecklistRun,
  DocumentRecord,
  Fault,
  KpiReading,
  MedicalDevice,
  NotificationItem,
  OperatingRoom,
  ReadinessDomainReading,
  StaffMember,
} from "@/domain/types";

/* =========================================================================
   CoreQ — Mock Data (infrastructure stand-in)
   Replaced later by real repositories backed by the NestJS API / PostgreSQL.
   Everything here is illustrative demo data.
   ========================================================================= */

export const machines: AnesthesiaMachine[] = [
  { id: "m-01", assetTag: "AN-1042", manufacturer: "Dräger", model: "Perseus A500", serialNumber: "PSA5-88213", location: "חדר ניתוח 1", status: "operational", lastCheck: "2026-07-28", nextCalibration: "2026-09-14" },
  { id: "m-02", assetTag: "AN-1043", manufacturer: "GE Healthcare", model: "Aisys CS²", serialNumber: "ACS2-40917", location: "חדר ניתוח 2", status: "operational", lastCheck: "2026-07-28", nextCalibration: "2026-08-05" },
  { id: "m-03", assetTag: "AN-1044", manufacturer: "Dräger", model: "Perseus A500", serialNumber: "PSA5-88240", location: "חדר ניתוח 3", status: "attention", lastCheck: "2026-07-27", nextCalibration: "2026-08-02" },
  { id: "m-04", assetTag: "AN-1045", manufacturer: "Philips", model: "IntelliSave", serialNumber: "ISV-11902", location: "חדר ניתוח 4", status: "operational", lastCheck: "2026-07-28", nextCalibration: "2026-10-01" },
  { id: "m-05", assetTag: "AN-1046", manufacturer: "GE Healthcare", model: "Carestation 650", serialNumber: "CS650-7731", location: "חדר ניתוח 5", status: "maintenance", lastCheck: "2026-07-24", nextCalibration: "2026-07-30" },
  { id: "m-06", assetTag: "AN-1047", manufacturer: "Getinge", model: "Flow-i C20", serialNumber: "FIC20-5518", location: "חדר התאוששות", status: "operational", lastCheck: "2026-07-28", nextCalibration: "2026-09-22" },
  { id: "m-07", assetTag: "AN-1048", manufacturer: "Dräger", model: "Fabius Tiro", serialNumber: "FBT-30144", location: "מלאי חירום", status: "down", lastCheck: "2026-07-20", nextCalibration: "2026-08-18" },
  { id: "m-08", assetTag: "AN-1049", manufacturer: "GE Healthcare", model: "Aisys CS²", serialNumber: "ACS2-40988", location: "חדר לידה", status: "operational", lastCheck: "2026-07-28", nextCalibration: "2026-08-29" },
];

export const devices: MedicalDevice[] = [
  { id: "d-01", assetTag: "US-201", category: "אולטרסאונד", model: "Sonosite Edge II", vendor: "Fujifilm", location: "חדר ניתוח 2", status: "operational", warrantyEnd: "2027-03-01" },
  { id: "d-02", assetTag: "VL-118", category: "וידאו לרינגוסקופ", model: "GlideScope Core", vendor: "Verathon", location: "חדר ניתוח 1", status: "operational", warrantyEnd: "2026-11-15" },
  { id: "d-03", assetTag: "BR-055", category: "ברונכוסקופ", model: "Ambu aScope 5", vendor: "Ambu", location: "מלאי חירום", status: "attention", warrantyEnd: "2026-08-20" },
  { id: "d-04", assetTag: "IP-330", category: "משאבת עירוי", model: "Alaris GP Plus", vendor: "BD", location: "חדר התאוששות", status: "operational", warrantyEnd: "2028-01-10" },
  { id: "d-05", assetTag: "VN-402", category: "מכשיר הנשמה", model: "Hamilton-C6", vendor: "Hamilton", location: "טיפול נמרץ", status: "maintenance", warrantyEnd: "2027-06-30" },
  { id: "d-06", assetTag: "RB-077", category: "ציוד בלוקים", model: "Stimuplex HNS 12", vendor: "B.Braun", location: "חדר ניתוח 4", status: "operational", warrantyEnd: "2026-12-05" },
];

export const rooms: OperatingRoom[] = [
  { id: "r-1", name: "חדר ניתוח 1", status: "active", currentProcedure: "כריתת כיס מרה לפרוסקופית", team: "צוות א׳", machine: "Dräger Perseus A500", openFaults: 0 },
  { id: "r-2", name: "חדר ניתוח 2", status: "active", currentProcedure: "החלפת מפרק ירך", team: "צוות ב׳", machine: "GE Aisys CS²", openFaults: 0 },
  { id: "r-3", name: "חדר ניתוח 3", status: "cleaning", currentProcedure: null, team: null, machine: "Dräger Perseus A500", openFaults: 1 },
  { id: "r-4", name: "חדר ניתוח 4", status: "idle", currentProcedure: null, team: "צוות ג׳", machine: "Philips IntelliSave", openFaults: 0 },
  { id: "r-5", name: "חדר ניתוח 5", status: "blocked", currentProcedure: null, team: null, machine: "GE Carestation 650", openFaults: 1 },
  { id: "r-6", name: "חדר ניתוח 6", status: "active", currentProcedure: "ניתוח קטרקט", team: "צוות ד׳", machine: "Getinge Flow-i", openFaults: 0 },
];

export const faults: Fault[] = [
  { id: "f-4411", title: "אזעקת לחץ נמוך במעגל הנשמה", asset: "AN-1044", location: "חדר ניתוח 3", priority: "high", status: "assigned", assignee: "רון ביטון", openedAt: "2026-07-28T06:42:00", slaHours: 4 },
  { id: "f-4409", title: "כיול נדרש — יחידת אידוי", asset: "AN-1046", location: "חדר ניתוח 5", priority: "critical", status: "in_progress", assignee: "מאיה כהן", openedAt: "2026-07-27T15:10:00", slaHours: 2 },
  { id: "f-4408", title: "סוללת גיבוי חלשה", asset: "AN-1048", location: "מלאי חירום", priority: "medium", status: "open", assignee: null, openedAt: "2026-07-27T11:20:00", slaHours: 24 },
  { id: "f-4405", title: "מסך מגע לא מגיב לסירוגין", asset: "VL-118", location: "חדר ניתוח 1", priority: "low", status: "open", assignee: null, openedAt: "2026-07-26T09:05:00", slaHours: 48 },
  { id: "f-4402", title: "דליפת גז מזוהה בחיבור", asset: "AN-1047", location: "מלאי חירום", priority: "critical", status: "resolved", assignee: "רון ביטון", openedAt: "2026-07-24T08:00:00", slaHours: 2 },
];

export const staff: StaffMember[] = [
  { id: "s-1", name: "ד״ר יוסרי ג׳מיל", role: "physician", shift: "morning", room: "חדר ניתוח 1", status: "present" },
  { id: "s-2", name: "ד״ר נועה לוי", role: "physician", shift: "morning", room: "חדר ניתוח 2", status: "present" },
  { id: "s-3", name: "ד״ר אבי שגב", role: "physician", shift: "evening", room: null, status: "on_call" },
  { id: "s-4", name: "מירב אזולאי", role: "nurse", shift: "morning", room: "חדר ניתוח 1", status: "present" },
  { id: "s-5", name: "טל בר-און", role: "nurse", shift: "morning", room: "חדר ניתוח 4", status: "present" },
  { id: "s-6", name: "יוסי חדד", role: "nurse", shift: "night", room: null, status: "leave" },
  { id: "s-7", name: "רון ביטון", role: "technician", shift: "morning", room: null, status: "present" },
  { id: "s-8", name: "מאיה כהן", role: "technician", shift: "evening", room: null, status: "on_call" },
];

export const checklistRuns: ChecklistRun[] = [
  { id: "c-1", machine: "AN-1042", room: "חדר ניתוח 1", performedBy: "מירב אזולאי", performedAt: "2026-07-28T06:15:00", result: "pass", itemsPassed: 18, itemsTotal: 18 },
  { id: "c-2", machine: "AN-1043", room: "חדר ניתוח 2", performedBy: "טל בר-און", performedAt: "2026-07-28T06:20:00", result: "pass", itemsPassed: 18, itemsTotal: 18 },
  { id: "c-3", machine: "AN-1044", room: "חדר ניתוח 3", performedBy: "רון ביטון", performedAt: "2026-07-28T06:35:00", result: "fail", itemsPassed: 15, itemsTotal: 18 },
  { id: "c-4", machine: "AN-1049", room: "חדר לידה", performedBy: "מירב אזולאי", performedAt: "2026-07-28T06:40:00", result: "pass", itemsPassed: 18, itemsTotal: 18 },
  { id: "c-5", machine: "AN-1046", room: "חדר ניתוח 5", performedBy: "—", performedAt: "—", result: "pending", itemsPassed: 0, itemsTotal: 18 },
];

export const readiness: ReadinessDomainReading[] = [
  { domain: "מכונות הרדמה", score: 88, trend: 2, detail: "7 מתוך 8 תקינות" },
  { domain: "ציוד רפואי", score: 83, trend: -3, detail: "ברונכוסקופ בהמתנה לשירות" },
  { domain: "כשירות תרופות", score: 96, trend: 1, detail: "מלאי חירום מלא" },
  { domain: "עגלות החייאה", score: 100, trend: 0, detail: "כל 6 העגלות נבדקו" },
  { domain: "חדרי ניתוח", score: 90, trend: 0, detail: "חדר 5 חסום זמנית" },
  { domain: "תשתיות", score: 94, trend: 1, detail: "אספקת גזים תקינה" },
];

export const kpis: KpiReading[] = [
  { key: "uptime", label: "זמינות מכונות", value: "97.4%", target: "≥ 98%", delta: -0.4, tone: "warning" },
  { key: "checklist", label: "השלמת בדיקות יומיות", value: "94%", target: "100%", delta: 3, tone: "info" },
  { key: "mttr", label: "זמן תיקון ממוצע", value: "3.2 ש׳", target: "≤ 4 ש׳", delta: -12, tone: "success" },
  { key: "compliance", label: "עמידה בתחזוקה מונעת", value: "91%", target: "≥ 95%", delta: 2, tone: "warning" },
  { key: "faults", label: "תקלות פתוחות", value: "4", target: "—", delta: -20, tone: "success" },
  { key: "readiness", label: "כשירות מבצעית", value: "92%", target: "≥ 90%", delta: 1, tone: "success" },
];

export const notifications: NotificationItem[] = [
  { id: "n-1", kind: "calibration", message: "כיול נדרש עבור AN-1043 (Aisys CS²) עד 05/08", at: "2026-07-28T07:02:00", priority: "high", read: false },
  { id: "n-2", kind: "fault", message: "תקלה קריטית חדשה — יחידת אידוי, חדר ניתוח 5", at: "2026-07-27T15:11:00", priority: "critical", read: false },
  { id: "n-3", kind: "checklist", message: "בדיקה יומית חסרה — AN-1046, חדר ניתוח 5", at: "2026-07-28T06:45:00", priority: "medium", read: false },
  { id: "n-4", kind: "staffing", message: "מחסור אח למשמרת לילה — 30/07", at: "2026-07-28T08:00:00", priority: "medium", read: true },
  { id: "n-5", kind: "maintenance", message: "תחזוקה מונעת מתוכננת — Getinge Flow-i, 22/09", at: "2026-07-26T10:00:00", priority: "low", read: true },
];

export const documents: DocumentRecord[] = [
  { id: "doc-1", name: "נוהל בדיקת מכונת הרדמה יומית", type: "נוהל", owner: "מחלקת הרדמה", updatedAt: "2026-07-10", version: "v4.2" },
  { id: "doc-2", name: "תעודת כיול — Dräger Perseus A500", type: "תעודה", owner: "הנדסה רפואית", updatedAt: "2026-06-28", version: "v1.0" },
  { id: "doc-3", name: "דוח תחזוקה שנתי 2025", type: "דוח", owner: "הנדסה רפואית", updatedAt: "2026-01-15", version: "v1.0" },
  { id: "doc-4", name: "פרוטוקול היערכות לביקורת משרד הבריאות", type: "פרוטוקול", owner: "ניהול איכות", updatedAt: "2026-07-01", version: "v2.1" },
  { id: "doc-5", name: "רשימת תיוג — עגלת החייאה", type: "טופס", owner: "מחלקת הרדמה", updatedAt: "2026-05-19", version: "v3.0" },
];
