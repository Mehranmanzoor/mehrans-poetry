import { LoginForm } from "@/components/admin/LoginForm";
import { Toaster } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 px-4">
      <Toaster position="top-center" richColors />
      
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-rose-200 dark:bg-rose-900/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <div className="w-full max-w-md mb-6 flex justify-start z-10">
        <Link href="/" className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Site
        </Link>
      </div>

      <div className="z-10 w-full">
        <LoginForm />
      </div>
    </main>
  );
}
