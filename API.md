# HFMS admin API contract

The current frontend runs in demo mode with local state. These endpoints are the integration contract for the shared backend. Every endpoint below requires an authenticated session or bearer token with `role=admin`; document endpoints must additionally enforce admin ownership server-side.

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/admin/auth/login` | Validate email/phone and password; lock after five failures for 15 minutes |
| POST | `/api/admin/auth/otp/verify` | Verify OTP and issue an admin session |
| POST | `/api/auth/logout` | End the current session |
| GET | `/api/admin/me` | Return the authenticated admin |

## Dashboard and notifications

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/dashboard` | Counts, oldest pending listings, newest complaints, recent audit activity |
| GET | `/api/admin/notifications` | Admin notifications (new verification or complaint) |
| PATCH | `/api/admin/notifications/:id/read` | Mark an admin notification read |

## Hostels and verification

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/hostels?status=&area=&gender=&q=` | Filterable hostel list |
| GET | `/api/admin/hostels/:id` | Listing detail; excludes private documents |
| GET | `/api/admin/verifications?sort=submittedAt` | Pending registrations |
| GET | `/api/admin/verifications/:id` | Listing detail plus admin-only document metadata |
| GET | `/api/admin/verifications/:id/documents/:documentId` | Stream an image/PDF to admins only |
| POST | `/api/admin/verifications/:id/approve` | Approve and publish a listing |
| POST | `/api/admin/verifications/:id/reject` | Reject with required `{ "reason": "..." }` |
| POST | `/api/admin/verifications/:id/request-info` | Request owner information with `{ "message": "..." }` |
| POST | `/api/admin/hostels/:id/suspend` | Soft suspend with required reason |
| POST | `/api/admin/hostels/:id/reapprove` | Re-approve a suspended listing |

## Accounts, complaints and reviews

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/accounts?role=&status=&q=` | Users and owners |
| POST | `/api/admin/accounts/:id/suspend` | Suspend an account with reason |
| POST | `/api/admin/accounts/:id/reactivate` | Reactivate an account |
| GET | `/api/admin/complaints?status=` | Complaint queue |
| GET | `/api/admin/complaints/:id` | Complaint detail and timeline |
| POST | `/api/admin/complaints/:id/forward` | Forward to owner and request response |
| POST | `/api/admin/complaints/:id/escalate` | Escalate with `{ "organisation": "...", "details": "..." }` |
| POST | `/api/admin/complaints/:id/resolve` | Resolve with note |
| POST | `/api/admin/complaints/:id/dismiss` | Dismiss with note |
| GET | `/api/admin/reviews/reported` | Reported reviews |
| POST | `/api/admin/reviews/:id/keep` | Keep a reported review |
| POST | `/api/admin/reviews/:id/remove` | Remove a reported review |

## Analytics, announcements and audit

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/analytics?from=&to=` | Analytics metrics and chart series |
| GET | `/api/admin/analytics/export?format=pdf|xlsx&from=&to=` | Export a report |
| POST | `/api/admin/announcements` | Create and send an in-app announcement |
| GET | `/api/admin/announcements` | Past announcements |
| GET | `/api/admin/audit-log?action=&from=&to=` | Read-only, filterable admin audit log |

All mutation responses should include the new record status and audit event. Status changes on complaints must create an in-app notification for the reporting user. Listing removal is always a soft delete; no admin endpoint permanently deletes a listing.
