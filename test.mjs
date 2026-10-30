// Node check for blog-api-client: exercises MockBlogApi (no network, no backend).
import { BlogApiClient, MockBlogApi } from "./client.mjs";
import assert from "node:assert";

const api = new MockBlogApi();
assert.equal((await api.listPosts()).length, 2);
const created = await api.createPost({ title: "Test post", body: "Test body" });
assert.equal(created.id, 3);
assert.equal((await api.getPost(3)).title, "Test post");
await api.deletePost(3);
assert.equal((await api.listPosts()).length, 2);
// BlogApiClient must build URLs and headers without calling a real server.
const client = new BlogApiClient("https://example.com/api/", "token123");
assert.equal(client.baseUrl, "https://example.com/api");
assert.equal(client.token, "token123");
let threw = false;
try { await api.createPost({ title: "", body: "" }); } catch { threw = true; }
assert.equal(threw, true);
console.log("blog-api-client: all checks passed (mock list/create/get/delete + client config).");
