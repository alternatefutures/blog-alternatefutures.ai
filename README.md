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

Drafts can also be reviewed on production without being published, at
`/preview/<slug>?token=<BLOG_PREVIEW_TOKEN>`. Preview pages are `noindex`, never cached,
excluded from the index, sitemap and feed, and return the same 404 for a wrong token as
for a missing post so they cannot be enumerated. Leave `BLOG_PREVIEW_TOKEN` unset to turn
previews off entirely.

The admin and its write endpoints deliberately return unavailable responses in production. Add provider-appropriate authentication before enabling remote editing; the initial publishing workflow is local review plus Git.

## Content model

Each post includes Markdown content, editorial review notes, publication status, metadata, tags, and a first-party cover image. The launch collection is stored in `content/posts.json` and published through Git.

## Production

Set the canonical origin for metadata, RSS, robots, and the sitemap:

```bash
NEXT_PUBLIC_SITE_URL=https://blog.alternatefutures.ai
```

Build with `npm run build`. Production is deployed on Alternate Clouds from the standalone `alternatefutures/blog-alternatefutures.ai` repository, with `blog.alternatefutures.ai` as its canonical domain.

Build and publish the production image for `linux/amd64`, then deploy its immutable digest:

```bash
docker buildx build \
  --platform linux/amd64 \
  --tag ghcr.io/alternatefutures/blog-alternatefutures.ai:latest \
  --push .

acc services create \
  --kind docker \
  --image ghcr.io/alternatefutures/blog-alternatefutures.ai@sha256:<digest> \
  --port 3000 \
  --name blog \
  --spend budget \
  --budget-total 20 \
  --yes
```

Do not deploy this site to Vercel or another third-party application platform. Alternate Clouds is the production target for Alternate Futures properties.
