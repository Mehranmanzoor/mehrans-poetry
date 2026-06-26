"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, Eye } from "lucide-react";

interface PoemCardProps {
  poem: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    reading_time: number;
    views_count: number;
    published_at: string;
  };
  index: number;
}

export function PoemCard({ poem, index }: PoemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid mb-6"
    >
      <Link href={`/poems/${poem.slug}`} className="group block">
        <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
          {poem.cover_image && (
            <div className="w-full h-48 sm:h-64 overflow-hidden">
              <img 
                src={poem.cover_image} 
                alt={poem.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="font-playfair text-2xl font-bold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {poem.title}
            </h2>
            {poem.excerpt && (
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                {poem.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <time dateTime={poem.published_at}>
                {format(new Date(poem.published_at || new Date()), "MMM d, yyyy")}
              </time>
              <div className="flex gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {poem.reading_time} min
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {poem.views_count}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
