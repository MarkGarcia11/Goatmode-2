import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Goat Mode — Built for your journey",
    template: "%s · Goat Mode",
  },
  description: "A considered first look at Goat Mode — contemporary activewear for your own pace, your own journey.",
  applicationName: "Goat Mode",
  openGraph: {
    title: "Goat Mode — Built for your journey",
    description: "Move with confidence. Find your rhythm. Make every movement your own.",
    type: "website",
    images: ["/images/goat-mode-hero.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="app-body"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
