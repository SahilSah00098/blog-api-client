// Blog API client — a small, reusable fetch wrapper for a FastAPI-style
// blog API pattern (posts: list / get / create / delete).
// New work built for Sahil Sah's profile (2026-10-30).
//
// IMPORTANT: the demo page in this folder uses MockBlogApi (in-memory),
// NOT Sahil's live Blog-Api-Project. Nothing here claims a connection to
// his live project. To point BlogApiClient at a real API, pass its base URL
// and a JWT token, e.g.:
//   const api = new BlogApiClient("https://example.com", "your-jwt-token");

export class BlogApiClient {
  constructor(baseUrl, token = "") {
    this.baseUrl = String(baseUrl).replace(/\/$/, "");
    this.token = token;
  }

  async request(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    const res = await fetch(`${this.baseUrl}${path}`, { ...options, headers });
    if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
    return res.status === 204 ? null : res.json();
  }

  listPosts() { return this.request("/posts"); }
  getPost(id) { return this.request(`/posts/${id}`); }
  createPost(post) {
    return this.request("/posts", { method: "POST", body: JSON.stringify(post) });
  }
  deletePost(id) { return this.request(`/posts/${id}`, { method: "DELETE" }); }
}

// In-memory stand-in used ONLY by the demo page, so the demo works with
// no backend, no key and no network. It implements the same method names.
export class MockBlogApi {
  constructor() {
    this.posts = [
      { id: 1, title: "Hello from the demo blog", body: "This demo runs entirely in your browser — no backend is involved." },
      { id: 2, title: "Why a small API client helps", body: "One wrapper for list, get, create and delete keeps every page consistent." },
    ];
    this.nextId = 3;
  }
  async listPosts() { return [...this.posts]; }
  async getPost(id) {
    const post = this.posts.find((p) => p.id === Number(id));
    if (!post) throw new Error("Post not found");
    return post;
  }
  async createPost(post) {
    if (!post.title?.trim() || !post.body?.trim()) throw new Error("Title and body are required");
    const created = { id: this.nextId++, title: post.title.trim(), body: post.body.trim() };
    this.posts.unshift(created);
    return created;
  }
  async deletePost(id) {
    this.posts = this.posts.filter((p) => p.id !== Number(id));
    return null;
  }
}
