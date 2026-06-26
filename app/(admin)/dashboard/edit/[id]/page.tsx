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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Poem</h1>
      <CreatePoemForm initialData={poem} />
    </div>
  );
}
