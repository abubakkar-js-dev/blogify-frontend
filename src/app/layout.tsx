import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogify - Shared Stories",
  description: "A modern blogging platform for creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen bg-muted selection:bg-primary/10 selection:text-teal-900`}
      >
        {children}
      </body>
    </html>
  );
}
