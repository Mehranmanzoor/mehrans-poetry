import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ReadingTools } from "@/components/poems/ReadingTools";
import { CommentsSection } from "@/components/poems/CommentsSection";
import { Clock } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function SinglePoemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch Poem
  const { data: poem } = await supabase
    .from("poems")
    .select(`
      *,
      categories ( name )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!poem) {
    notFound();
  }

  // Get like count
  const { count: likeCount } = await supabase
    .from("likes")
    .select('*', { count: 'exact', head: true })
    .eq("poem_id", poem.id);

  return (
    <article className="min-h-screen pb-32">
      {/* Header/Cover Section */}
      <header className="relative w-full h-[60vh] min-h-[400px] flex items-end justify-center">
        {poem.cover_image ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={poem.cover_image} alt={poem.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />
        )}
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
          <Link href="/poems" className="inline-flex items-center text-sm font-medium mb-6 text-neutral-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
          </Link>
          <div className="mb-4 text-rose-400 font-medium tracking-widest uppercase text-sm">
            {poem.categories?.name || "Poetry"}
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {poem.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-neutral-300 text-sm">
            <time dateTime={poem.published_at}>
              {format(new Date(poem.published_at), "MMMM d, yyyy")}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {poem.reading_time} min read
            </span>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="prose prose-lg md:prose-xl prose-neutral dark:prose-invert font-playfair leading-relaxed mx-auto whitespace-pre-wrap selection:bg-rose-200 dark:selection:bg-rose-900/50">
          {poem.content}
        </div>

        {/* Guest Comments */}
        <CommentsSection poemId={poem.id} />
      </div>

      {/* Floating Reading Controls */}
      <ReadingTools poemId={poem.id} initialLikes={likeCount || 0} />
    </article>
  );
}
