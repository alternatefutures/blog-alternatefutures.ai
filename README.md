# Alternate Futures Blog

Standalone public blog and local editorial review desk for `blog.alternatefutures.ai`.

## Local review

```bash
npm install
npm run dev
```

- Public preview: `http://localhost:3000`
- Review desk: `http://localhost:3000/admin`

The review desk edits `content/posts.json` directly. Drafts are visible in local development and excluded from production builds. Change a post to `published`, save it, commit the content change, and deploy to publish it.

The admin and its write endpoints deliberately return unavailable responses in production. Add provider-appropriate authentication before enabling remote editing; the initial publishing workflow is local review plus Git.

## Content model

Each post includes Markdown content, editorial review notes, publication status, metadata, tags, and a first-party cover image. The first three guides are seeded as drafts and must be reviewed before publication.

## Production

Set the canonical origin for metadata, RSS, robots, and the sitemap:

```bash
NEXT_PUBLIC_SITE_URL=https://blog.alternatefutures.ai
```

Build with `npm run build`. After deploying the standalone repository, point `blog.alternatefutures.ai` to the deployment and update the main site's practical-guide links.
