"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-3xl"
      >
        <motion.h1 
          className="font-playfair text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Moeens Poetry
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          A premium sanctuary for words, thoughts, and emotions. Crafted by Moeen Mukhtar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/poems" 
            className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-medium hover:scale-105 transition-transform"
          >
            Read Poems
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 backdrop-blur-md font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            About the Author
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
