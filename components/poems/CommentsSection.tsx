"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  guest_name: string;
  content: string;
  created_at: string;
}

export function CommentsSection({ poemId }: { poemId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchComments();
  }, [poemId]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('poem_id', poemId)
      .eq('is_approved', true) // Only show approved comments in prod
      .order('created_at', { ascending: false });
    
    if (data) setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('comments').insert({
      poem_id: poemId,
      guest_name: name,
      content,
      is_approved: true // Auto-approve for this demo; usually false for moderation
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to post comment.");
    } else {
      toast.success("Comment posted!");
      setName("");
      setContent("");
      fetchComments();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <h3 className="font-playfair text-3xl font-bold mb-8 flex items-center gap-3">
        <MessageSquare className="w-6 h-6" /> Responses ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <input 
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full md:w-1/2 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-900 outline-none"
        />
        <textarea 
          placeholder="Share your thoughts on this piece..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-900 outline-none min-h-[120px] resize-y"
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Post Response
        </button>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="font-bold text-neutral-900 dark:text-white">{comment.guest_name}</span>
              <span className="text-neutral-500">{format(new Date(comment.created_at), "MMM d, yyyy")}</span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
