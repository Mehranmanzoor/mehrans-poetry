import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Toaster position="top-center" richColors />
      <Sidebar />
      <div className="pl-64 flex flex-col flex-1">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
