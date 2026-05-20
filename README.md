# Tolbert's Restaurant & Chili Parlor

Astro-powered website for Tolbert's Restaurant in historic downtown Grapevine, TX.

## Stack

- Astro 5.x (SSG + SSR)
- React 18 (interactive components)
- Tailwind CSS
- Netlify

## Pages

| Route            | Description                     |
| ---------------- | ------------------------------- |
| `/`              | Homepage                        |
| `/about`         | Restaurant history & info       |
| `/calendar`      | Live music & events calendar    |
| `/menu`          | Dinner menu                     |
| `/brunch-menu`   | Brunch menu                     |
| `/posts`         | Blog / news                     |

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

## Project Structure

```text
src/
  components/     # Astro + React components
  content/posts/  # Markdown blog posts
  layouts/        # Page layouts
  lib/            # Utilities, API clients, config
  pages/          # Route files
```
