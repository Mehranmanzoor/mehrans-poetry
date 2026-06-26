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
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Poems</h1>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          <Plus size={16} />
          New Poem
        </Link>
      </div>

      {!poems || poems.length === 0 ? (
        <p className="text-neutral-600">No poems yet. Create your first poem!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Title</th>
                <th className="text-left p-3 font-semibold">Created</th>
                <th className="text-right p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {poems.map((poem: any) => (
                <tr key={poem.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{poem.title}</td>
                  <td className="p-3 text-sm text-neutral-600">
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
