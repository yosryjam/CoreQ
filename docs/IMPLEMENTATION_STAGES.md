# CoreQ implementation stages

## Stage 1 — Evaluation UI (included)
Login demonstration, Staff Records dashboard, interactive physician onboarding record, browser-local evaluation changes and feedback notes.

## Stage 2 — PostgreSQL (foundation included)
Docker Compose and an initial staff-record schema are included for architecture review. Production requires migrations, encryption, backups, HA and hospital approval.

## Stage 3 — NestJS API (structure defined)
The production API is not active in this demo. It must replace local mock/browser storage.

## Stage 4 — Real Time
Use Server-Sent Events for notifications, readiness, faults and approval updates.

## Stage 5 — OCR
Add a provider adapter, malware scanning, confidence scores and mandatory ADMIN verification before writing extracted values.

## Stage 6 — AI Assistant
Use permission-aware retrieval, source citations and immutable audit logs. AI must not grant clinical privileges or approve competence.

## Stage 7 — Medical Knowledge Graph
Model relations among staff, privileges, competencies, equipment, locations, policies, evidence and readiness rules.
