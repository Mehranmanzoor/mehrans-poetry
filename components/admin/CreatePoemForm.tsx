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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <input
        {...register("title")}
        placeholder="Title"
        className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition focus:border-neutral-400 sm:text-base"
        required
      />
      <textarea
        {...register("content")}
        placeholder="Content"
        className="h-40 w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none transition focus:border-neutral-400 sm:text-base"
        required
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
      >
        {initialData?.id ? "Update Poem" : "Publish"}
      </button>
    </form>
  );
};
