# PRD — MY CV APP

## Goal
Create a professional, Apple-like multipage CV website with a private admin backend to manage all content and media.

## Primary Users
1) Public visitor (recruiter/hiring manager)
- Quickly understand who you are, what you did, and how to contact you.
2) Site owner (you)
- Log in and update CV content without editing code.

## Success Criteria
- Content updates via admin appear on the public site immediately (or on publish).
- Lighthouse scores: strong performance + SEO (target 90+ on key pages).
- Mobile UX is excellent: bottom dock navigation, readable typography, fast loading.
- Visual style: clean, minimal, subtle glass depth; no flashy neon.

---

## Public Site Requirements

### Global UI
- Apple-like typography, generous spacing, minimal color palette.
- Light and dark mode (optional but recommended).
- Subtle glass panels:
  - Hairline borders
  - Soft shadow
  - Mild blur/backdrop filter
- Subtle animated background (slow gradient drift + optional noise texture).

### Navigation
- Desktop: top navigation bar with active route highlight.
- Mobile: fixed bottom dock navigation.
  - Items: Home, Experience, Skills, Projects, Contact
  - About accessible via Home and/or nav.
  - Active indicator and tap feedback animation.

### Animations
- Route transitions (Framer Motion):
  - Fade + slight translate (8–16px) + mild blur.
- Shared element transition:
  - Project card -> project detail.
- Scroll reveals:
  - Minimal fade/translate, no bounce.

### Pages

#### Home (`/`)
- Hero: name, role/title, short summary.
- Primary CTAs:
  - Download CV (optional PDF)
  - Contact
- Highlights:
  - Featured experience (2–3)
  - Featured projects (3–6)
- Quick links: LinkedIn/GitHub/email.

Acceptance Criteria:
- Content is driven from database records.
- Layout is responsive and clean on mobile.

#### About (`/about`)
- Rich text bio (markdown or rich editor output).
- Optional sections: values, interests, languages.

Acceptance Criteria:
- Admin can edit the content and publish.

#### Experience (`/experience`)
- Timeline or list of roles.
- Each role shows:
  - Company, title, dates, location
  - Highlights bullet list
  - Tech stack tags

Acceptance Criteria:
- Experiences can be reordered in admin.

#### Skills (`/skills`)
- Categorized skill groups.
- Each skill:
  - Name, optional level (0–5 or beginner/intermediate/advanced)
  - Tags

Acceptance Criteria:
- Categories and skills are manageable in admin.

#### Projects (`/projects`)
- Project cards grid.
- Each shows:
  - Title, short description, tags, optional image
  - Link(s) to demo/repo
- Click opens detail.

#### Project Detail (`/projects/[slug]`)
- Title, overview, responsibilities, outcomes, stack.
- Gallery (optional).

Acceptance Criteria:
- Slug is unique; project page is shareable and SEO-friendly.

#### Contact (`/contact`)
- Contact methods: email, LinkedIn, GitHub, location/timezone.
- Optional simple contact form.

Acceptance Criteria:
- Contact info editable in admin.

Optional:
- Resume (`/resume`) embeds PDF and provides download.

---

## Admin Backend Requirements

### Auth
- Admin-only access.
- Option A: single admin user (email allowlist).
- Option B: roles (admin/editor) if needed later.

### Admin Pages
- Dashboard (`/admin`)
  - last updated timestamp
  - quick links to edit sections
- Profile
  - name/title/summary/contact links
  - upload profile photo
- About
  - edit long-form content
- Experience
  - CRUD + reorder
- Skills
  - CRUD categories + skills + reorder
- Projects
  - CRUD + upload images + featured toggle
- Settings
  - site SEO (title, description, OG image)
  - publish/draft toggles (optional)

### Publish Model
MVP:
- All changes are live immediately.
Optional:
- Draft + Publish per section/item.

Acceptance Criteria:
- Admin can update all content without code changes.
- Media uploads are supported for profile photo and project images.

---

## Non-Functional Requirements
- SEO:
  - proper metadata per page
  - OG tags
  - sitemap + robots
- Performance:
  - optimized images
  - server-side rendering for public pages
- Accessibility:
  - keyboard navigable
  - sufficient contrast
  - reduced motion option

---

## Out of Scope (for MVP)
- Multi-user public accounts
- Complex blog/CMS
- Comments or messaging system

