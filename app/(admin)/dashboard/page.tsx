import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8 dark:border-neutral-800 dark:bg-neutral-900">
      <h1 className="text-2xl font-bold font-playfair sm:text-3xl">Dashboard</h1>
      <p className="mt-4 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
        Welcome, {user.email}. Use the sidebar to manage your poetry.
      </p>
    </div>
  );
}
