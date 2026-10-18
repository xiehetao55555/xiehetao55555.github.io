import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { externalHref } from "@/lib/links";
import { isDraft } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const siteUrl = externalHref(profile.siteUrl);

export const metadata: Metadata = {
  // Local origin is an explicit draft-only fallback, never a claimed public URL.
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  title: {
    default: profile.seo.title,
    template: `%s | ${profile.name || "Robotics Portfolio"}`,
  },
  description: profile.seo.description,
  ...(profile.isPlaceholder ? {} : { authors: [{ name: profile.name }] }),
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: {
    index: !isDraft && profile.seo.allowIndexing && !!siteUrl,
    follow: !isDraft && profile.seo.allowIndexing && !!siteUrl,
  },
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    type: "website",
    locale: "zh_CN",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};
export const viewport: Viewport = {
  themeColor: "#090b11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
