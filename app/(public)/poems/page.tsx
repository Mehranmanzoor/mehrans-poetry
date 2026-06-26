import { createClient } from "@/lib/supabase/server";
import { PoemCard } from "@/components/ui/PoemCard";

export const revalidate = 60; // Revalidate every minute

export default async function PoemsPage() {
  const supabase = await createClient();
  
  const { data: poems, error } = await supabase
    .from("poems")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching poems:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-20 text-center max-w-2xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
          The Collection
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Explore the complete archive of poems, thoughts, and reflections.
        </p>
      </div>

      {poems && poems.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {poems.map((poem, index) => (
            <PoemCard key={poem.id} poem={poem} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
          <p>No poems have been published yet.</p>
        </div>
      )}
    </div>
  );
}
