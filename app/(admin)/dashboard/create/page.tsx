import { CreatePoemForm } from "@/components/admin/CreatePoemForm";

export default function CreatePoemPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Poem</h1>
      <CreatePoemForm />
    </div>
  );
}
