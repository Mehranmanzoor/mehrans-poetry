import Image from "next/image";

export const metadata = {
  title: "About | Moeens Poetry",
  description: "Learn more about Moeen Mukhtar, the author behind Moeens Poetry.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        
        {/* Placeholder for Author Image */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 relative">
            <Image
              src="/images/about-author.jpeg"
              alt="Photo of Moeen Mukhtar"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold">About Moeen Mukhtar</h1>
          
          <div className="prose prose-lg prose-neutral dark:prose-invert font-playfair leading-relaxed">
            <p>
              Welcome to <strong>Moeens Poetry</strong>. I am Moeen Mukhtar, a passionate writer and software engineer who finds solace in bridging the gap between logic and emotion.
            </p>
            <p>
              Poetry, for me, is the unspoken language of the soul. It is where complex feelings find their simplest forms. Through this platform, I aim to share my reflections on life, love, nature, and the myriad experiences that shape human existence.
            </p>
            <p>
              This space was built not just as a portfolio, but as a sanctuary. A quiet corner of the internet where you can sit back, switch to sepia mode, and let words wash over you.
            </p>
            <p>
              Thank you for being here. I hope you find pieces of yourself within these verses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
