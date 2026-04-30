import { getAllPosts, getPostBySlug } from "@/lib/blog-data";
import BlogPostClient from "@/components/BlogPostClient";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch data on the server
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  if (!post) {
    // This will trigger the Next.js not-found page or our fallback UI
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The story you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/blogs"
          className="px-8 py-3 bg-primary text-white rounded-2xl font-bold transition-all hover:scale-105"
        >
          Go back to Blog
        </Link>
      </div>
    );
  }

  // Filter suggested posts (excluding current one)
  const suggestedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <BlogPostClient post={post} suggestedPosts={suggestedPosts} />;
}
