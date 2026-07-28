# CoreQ NestJS API — Phase 3 foundation

The current downloadable demo is a Next.js evaluation application. The production API should be created as a separate NestJS deployment with the following modules:

- AuthModule — Azure AD / OIDC
- StaffRecordsModule
- DocumentsModule
- CompetencyModule
- OnboardingModule
- AuditModule
- NotificationsModule
- RealtimeModule — SSE
- OcrModule — provider adapter + human verification
- AiAssistantModule — retrieval only, governed and audited
- KnowledgeGraphModule — relations between staff, competencies, equipment, rooms and policies

Do not use the demo username/password implementation in production.
