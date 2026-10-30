# blog-api-client

New work built for Sahil Sah's profile (2026-10-30). Not copied from another project.

A small JavaScript client for a FastAPI-style blog API pattern, plus a demo
page that runs entirely in the browser.

## What it actually does

- `client.mjs` — `BlogApiClient`: a reusable fetch wrapper for list / get / create / delete posts, with an optional JWT `Authorization` header. Point it at any real blog API by passing its base URL.
- `client.mjs` — `MockBlogApi`: an in-memory stand-in with the same method names, used only by the demo page.
- `index.html` — demo page: create, list and delete posts in the browser, no backend, no key, no network.
- `test.mjs` — Node checks for the mock and the client configuration.

## Honest scope

**The demo page does NOT connect to Sahil's live Blog-Api-Project.**
It uses the mock, so it works offline. The client class is the reusable part
for a real API connection.

## How to run

```bash
cd blog-api-client
node test.mjs
# then open index.html in a browser
```
