import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 lg:pl-64">
      <Toaster position="top-center" richColors />
      <Sidebar />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
