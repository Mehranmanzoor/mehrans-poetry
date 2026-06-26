import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CreatePoemForm } from "@/components/admin/CreatePoemForm";

export default async function EditPoemPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: poem } = await supabase
    .from("poems")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!poem) redirect("/dashboard/poems");

  return (
    <div className="p-0 sm:p-1 lg:p-2">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Edit Poem</h1>
      <CreatePoemForm initialData={poem} />
    </div>
  );
}
