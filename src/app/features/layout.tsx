import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Features - Blogify",
  description: "Explore the powerful features of the Blogify platform.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
