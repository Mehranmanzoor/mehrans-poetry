import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PoemActions } from "@/components/admin/PoemActions";
import { Plus } from "lucide-react";

export default async function PoemsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: poems } = await supabase
    .from("poems")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">My Poems</h1>
        <Link
          href="/dashboard/create"
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          <Plus size={16} />
          New Poem
        </Link>
      </div>

      {!poems || poems.length === 0 ? (
        <p className="rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          No poems yet. Create your first poem!
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="p-3 text-left font-semibold">Title</th>
                <th className="p-3 text-left font-semibold">Created</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {poems.map((poem: any) => (
                <tr key={poem.id} className="border-b border-neutral-200 text-sm hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                  <td className="p-3">{poem.title}</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    {new Date(poem.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <PoemActions id={poem.id} slug={poem.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
