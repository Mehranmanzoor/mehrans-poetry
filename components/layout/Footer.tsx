import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-tight">
            Moeen.
          </Link>
          <p className="text-neutral-500 text-sm mt-2">
            A premium sanctuary for words and emotions.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm text-neutral-500">
          <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</Link>
          <Link href="/login" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Admin</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-sm text-neutral-400">
        &copy; {new Date().getFullYear()} Moeen Mukhtar. All rights reserved.
      </div>
    </footer>
  );
}
