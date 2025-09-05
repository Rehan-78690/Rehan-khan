// app/robots.js
export default function robots() {
  const base = "https://rehan-khan-chi.vercel.app/"; // ← replace
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // (Optional) block specific paths:
      // { userAgent: "*", disallow: ["/api", "/admin"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
