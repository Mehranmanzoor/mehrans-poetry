import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact | Mehran's Poetry",
  description: "Get in touch with Moeen Mukhtar.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Whether you have a question about a piece, a collaboration inquiry, or simply want to share your thoughts, I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full">
                  <Mail className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Email</p>
                  <a href="mailto:moeenmukhtar14@gmail.com" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    moeenmukhtar14@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full">
                  <MapPin className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">Location</p>
                  <p className="text-neutral-500">Kashmir, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
