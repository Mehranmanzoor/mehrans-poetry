"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function PoemActions({ id, slug }: { id: string, slug: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from('poems').delete().eq('id', id);
    if (error) toast.error("Delete failed");
    else { toast.success("Poem deleted"); router.refresh(); }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/dashboard/edit/${id}`} className="p-2 hover:text-blue-500"><Edit size={16} /></Link>
      <button onClick={handleDelete} className="p-2 hover:text-red-500"><Trash2 size={16} /></button>
    </div>
  );
}
