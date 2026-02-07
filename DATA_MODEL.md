# Data Model — MY CV APP

## Entities (MVP)

### Profile (single row)
- id
- fullName
- headline (e.g., "Full-Stack Developer")
- summary (short)
- location
- email
- phone (optional)
- websiteUrl (optional)
- linkedinUrl (optional)
- githubUrl (optional)
- profilePhotoAssetId (optional FK -> MediaAsset)
- updatedAt

### About (single row)
- id
- content (markdown or HTML)
- updatedAt

### Experience
- id
- company
- roleTitle
- location (optional)
- startDate
- endDate (nullable for current)
- employmentType (optional)
- description (optional)
- highlights (string[] or separate table)
- techTags (string[] or separate table)
- order (int)
- isPublished (bool)
- updatedAt

### SkillCategory
- id
- name
- order (int)

### Skill
- id
- categoryId (FK)
- name
- level (optional: 1–5 or enum)
- tags (string[])
- order (int)

### Project
- id
- slug (unique)
- title
- shortDescription
- content (markdown/HTML)
- techTags (string[])
- repoUrl (optional)
- liveUrl (optional)
- featured (bool)
- coverAssetId (optional FK -> MediaAsset)
- order (int)
- isPublished (bool)
- updatedAt

### MediaAsset
- id
- url
- type (image/pdf)
- alt (optional)
- width (optional)
- height (optional)
- createdAt

### SiteSettings (single row)
- id
- siteTitle
- siteDescription
- ogImageAssetId (optional FK -> MediaAsset)
- updatedAt

## Notes
- Use `order` for deterministic listing and admin reorder support.
- For arrays (highlights/tags), decide between:
  - Postgres text[] columns (simple)
  - normalized tables (more flexible)

