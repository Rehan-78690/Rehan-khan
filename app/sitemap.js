// app/sitemap.js
export default function sitemap() {
  const base = "https://rehan-khan-chi.vercel.app/"; // ← replace

  const routes = [
    "",
    "/projects",
    "/contact",
    // add more routes as you add pages, e.g. "/about"
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
