import { CreatePoemForm } from "@/components/admin/CreatePoemForm";

export default function CreatePoemPage() {
  return (
    <div className="p-0 sm:p-1 lg:p-2">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Create New Poem</h1>
      <CreatePoemForm />
    </div>
  );
}
