import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Register - Blogify",
  description: "Create a Blogify account and join our community of creators.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
