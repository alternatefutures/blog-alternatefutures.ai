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

Each post includes Markdown content, editorial review notes, publication status, metadata, tags, and a first-party cover image. The launch collection is stored in `content/posts.json` and published through Git.

## Production

Set the canonical origin for metadata, RSS, robots, and the sitemap:

```bash
NEXT_PUBLIC_SITE_URL=https://blog.alternatefutures.ai
```

Build with `npm run build`. Production is deployed on Alternate Clouds from the standalone `alternatefutures/blog-alternatefutures.ai` repository, with `blog.alternatefutures.ai` as its canonical domain.

```bash
acc services create \
  --kind github \
  --repo alternatefutures/blog-alternatefutures.ai \
  --branch main \
  --build-command "npm run build" \
  --start-command "npm run start" \
  --name alternate-futures-blog \
  --spend budget \
  --budget-total 20 \
  --env NEXT_PUBLIC_SITE_URL=https://blog.alternatefutures.ai \
  --yes
```

Do not deploy this site to Vercel or another third-party application platform. Alternate Clouds is the production target for Alternate Futures properties.
