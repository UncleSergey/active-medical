# Storage asset monitoring

The project-level Heartbeat job `active-medical-storage-monitor` checks all 20 known storage assets every 15 minutes in UTC.

- Task UID: `gtLgq7UYjNEcNAftzTFp2Y`
- Cron: `0 */15 * * * *`
- Callback: `POST /api/scheduled/check-storage-assets`
- Status: enabled
- Failure behavior: the endpoint returns a structured report and notifies the project owner when any asset returns a non-2xx response or a non-image content type.
