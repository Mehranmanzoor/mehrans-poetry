"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Type, Moon, Sun, Coffee, Share2, Heart } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { clsx } from "clsx";

interface ReadingToolsProps {
  poemId: string;
  initialLikes?: number;
}

export function ReadingTools({ poemId, initialLikes = 0 }: ReadingToolsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const supabase = createClient();

  useEffect(() => setMounted(true), []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleLike = async () => {
    if (isLiked) return;
    
    // Optimistic update
    setIsLiked(true);
    setLikeCount(prev => prev + 1);
    
    // Generate a simple browser footprint (for guest likes)
    const browserId = navigator.userAgent + window.screen.width;
    
    const { error } = await supabase.from('likes').insert({
      poem_id: poemId,
      browser_id: btoa(browserId).slice(0, 20)
    });

    if (error && error.code !== '23505') { // Ignore unique violation
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else if (!error) {
      toast.success("You liked this poem 🤍");
    }
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-full px-6 py-3 shadow-2xl flex items-center gap-6"
    >
      <div className="flex items-center gap-2 border-r border-neutral-200 dark:border-neutral-700 pr-6">
        <button onClick={handleLike} className={clsx("flex items-center gap-2 transition-colors", isLiked ? "text-rose-500" : "text-neutral-500 hover:text-rose-500")}>
          <Heart className={clsx("w-5 h-5", isLiked && "fill-current")} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4 border-r border-neutral-200 dark:border-neutral-700 pr-6 text-neutral-500">
        <button onClick={() => setTheme('light')} className={clsx("hover:text-neutral-900 dark:hover:text-white transition-colors", theme === 'light' && "text-neutral-900")}>
          <Sun className="w-5 h-5" />
        </button>
        <button onClick={() => setTheme('sepia')} className={clsx("hover:text-amber-700 transition-colors", theme === 'sepia' && "text-amber-700")}>
          <Coffee className="w-5 h-5" />
        </button>
        <button onClick={() => setTheme('dark')} className={clsx("hover:text-white transition-colors", theme === 'dark' && "text-white")}>
          <Moon className="w-5 h-5" />
        </button>
      </div>

      <button onClick={handleShare} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
        <Share2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
