# Security — MY CV APP

## Admin Access
- All `/admin/*` routes require authentication.
- Use an allowlist of admin emails for MVP.

## Authorization Rules
- Public routes: read-only.
- Admin routes: read/write.

## Data Validation
- Validate all admin inputs server-side.
- Sanitize any rich text/HTML if using HTML output.

## Upload Security
- Use signed URLs for S3/R2 uploads.
- Restrict upload mime types (image/jpeg, image/png, image/webp, application/pdf).
- Enforce max file size.

## Rate Limiting
- Apply rate limits to auth endpoints and upload endpoints.

## Secrets
- Keep DB URLs, auth secrets, and storage credentials in `.env` only.
- Never commit `.env` to git.

