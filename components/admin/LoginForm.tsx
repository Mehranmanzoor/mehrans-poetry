"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Failed to authenticate.");
      setIsLoading(false);
      return;
    }

    toast.success("Welcome back, Moeen.");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="mb-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-neutral-900 dark:text-white mb-2">Admin Portal</h2>
          <p className="text-neutral-500 dark:text-neutral-400">Sign in to manage your poetry.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent outline-none transition-all dark:text-white"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 pl-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent outline-none transition-all dark:text-white"
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 pl-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
