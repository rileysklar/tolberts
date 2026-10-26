# Tolbert's Restaurant & Chili Parlor

Astro-powered website for Tolbert's Restaurant in historic downtown Grapevine, TX.

## Stack

- Astro 5.x (SSG + SSR)
- React 18 (interactive components)
- Tailwind CSS
- Netlify

## Pages

| Route          | Description                  |
| -------------- | ---------------------------- |
| `/`            | Homepage                     |
| `/about`       | Restaurant history & info    |
| `/calendar`    | Live music & events calendar |
| `/menu`        | Dinner menu                  |
| `/brunch-menu` | Brunch menu                  |
| `/posts`       | Blog / news                  |

## Development

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Configuration

Feature flags live in `src/lib/config.ts`:

- `showAnnouncement` — toggle site-wide announcement banner/card
- `isUnderMaintenance` — show maintenance page instead of homepage

### Environment variables

Set these in Netlify (Site configuration → Environment variables). Server-side
variables are read at runtime first, then from `.env` during local development.
`PUBLIC_*` variables are inlined into the client bundle at build time.

| Variable                       | Required | Purpose                                                                 |
| :----------------------------- | :------- | :---------------------------------------------------------------------- |
| `WORDPRESS_API_URL`            | Yes      | WPGraphQL endpoint, e.g. `https://cms.example.com/graphql`              |
| `WORDPRESS_URL`                | Yes      | WordPress site root used by the contact form endpoint                   |
| `WORDPRESS_USER`               | Yes      | WordPress user for the contact form's Basic auth                        |
| `WORDPRESS_PASSWORD`           | Yes      | WordPress application password for the contact form                     |
| `WORDPRESS_AUTH_REFRESH_TOKEN` | No       | Bearer token for private GraphQL queries                                |
| `PUBLIC_HERO_VIDEO_URL`        | No       | Override for the homepage hero video (defaults to the current CMS copy) |
| `MENU_PDF_URL`                 | No       | CMS-hosted dinner menu PDF (falls back to the bundled PDF)              |
| `BRUNCH_MENU_PDF_URL`          | No       | CMS-hosted brunch menu PDF (falls back to the bundled PDF)              |

## Backend resilience

The CMS runs separately from this site, so every integration is best-effort:

- **Events** (`src/lib/wordpress/api.ts`): 3.5s timeout, one retry for transient
  failures, a 60s in-memory cache, a 30s cooldown after failures, and a
  stale-cache/empty-array fallback. The homepage simply omits the event hero and
  `/calendar` shows its "check back soon" message instead of erroring.
- **Event cards**: malformed or missing CMS images fall back to a bundled local
  image layered behind the remote one.
- **Menus**: `/menu` and `/brunch-menu` probe the CMS PDF with a 2.5s timeout
  and redirect to locally bundled PDFs when it is unreachable.
- **Contact form**: server requests time out after 8s and return a friendly
  `503`; the React forms also time out after 15s and always show email/phone
  alternatives.
- **Hero video**: the local poster/fallback image is always rendered beneath the
  video, so a missing CMS never leaves an empty hero.
- **500 page**: `src/pages/500.astro` keeps the shell, navigation and a route
  home available for unexpected server errors.

When the CMS moves, set the `WORDPRESS_*`, `MENU_PDF_URL`,
`BRUNCH_MENU_PDF_URL` and `PUBLIC_HERO_VIDEO_URL` variables in Netlify; no code
changes are required. Legacy `/wp-content/...` menu redirects in
`public/_redirects` already point at the bundled PDFs.

## Project Structure

```text
src/
  components/     # Astro + React components
  content/posts/  # Markdown blog posts
  layouts/        # Page layouts
  lib/            # Utilities, API clients, config
  pages/          # Route files
```
