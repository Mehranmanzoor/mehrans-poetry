"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PoemFormValues = {
  title: string;
  content: string;
};

type CreatePoemFormProps = {
  initialData?: {
    id?: string;
    title?: string;
    content?: string;
    slug?: string;
    status?: string;
  } | null;
};

export const CreatePoemForm = ({ initialData }: CreatePoemFormProps) => {
  const router = useRouter();
  const supabase = createClient();
  const { register, handleSubmit, reset } = useForm<PoemFormValues>({
    defaultValues: {
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
    },
  });

  useEffect(() => {
    reset({
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
    });
  }, [initialData, reset]);

  const onSubmit = async (data: PoemFormValues) => {
    const payload = {
      title: data.title,
      content: data.content,
      slug: data.title.toLowerCase().replace(/ /g, "-"),
      status: "published",
    };

    const { error } = initialData?.id
      ? await supabase.from("poems").update(payload).eq("id", initialData.id)
      : await supabase.from("poems").insert([payload]);

    if (error) {
      toast.error("Error saving poem: " + error.message);
    } else {
      toast.success(initialData?.id ? "Poem updated!" : "Poem published!");
      router.push("/dashboard/poems");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
      <input {...register("title")} placeholder="Title" className="w-full border p-2" required />
      <textarea {...register("content")} placeholder="Content" className="w-full border p-2 h-40" required />
      <button type="submit" className="bg-black text-white p-2">
        {initialData?.id ? "Update Poem" : "Publish"}
      </button>
    </form>
  );
};
