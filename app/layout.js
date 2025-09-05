import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://rehan-khan-chi.vercel.app/"), // ← replace with your real domain
  title: "Rehan Khan | Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Rehan Khan, full-stack developer passionate about AI, football, and building modern web apps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rehan Khan | Full-Stack Developer & AI Enthusiast",
    description: "Explore projects, certifications, and insights from Rehan Khan.",
    url: "https://yourdomain.com",
    siteName: "Rehan Khan Portfolio",
    images: [
      {
        url: "/DP.jpg",  // ideally a 1200x630 OG image; see note below
        width: 1200,
        height: 630,
        alt: "Rehan Khan Portfolio Preview",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Rehan Khan",
          url: "https://rehan-khan-chi.vercel.app/",
          sameAs: [
            "https://github.com/Rehan-78690",
            "https://www.linkedin.com/in/rehan-khan-205a54310/",
            "https://www.facebook.com/rehan.khan.185297",
          ],
          jobTitle: "Full-Stack Developer",
        }),
      }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
