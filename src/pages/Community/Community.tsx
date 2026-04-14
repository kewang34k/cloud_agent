import { useState } from "react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { Trophy, MessageSquare, Heart, Share2, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ACHIEVEMENTS = [
  { id: "a1", title: "First Steps", desc: "Complete your first lesson", icon: Trophy, color: "text-amber-500", bg: "bg-amber-100", unlocked: true },
  { id: "a2", title: "On Fire", desc: "Reach a 3-day streak", icon: Star, color: "text-orange-500", bg: "bg-orange-100", unlocked: true },
  { id: "a3", title: "Polyglot", desc: "Learn 50 new words", icon: Award, color: "text-purple-500", bg: "bg-purple-100", unlocked: true },
  { id: "a4", title: "Perfect Score", desc: "Get 100% on a grammar test", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-100", unlocked: true },
  { id: "a5", title: "Chatterbox", desc: "Complete 10 shadowing exercises", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-100", unlocked: false },
  { id: "a6", title: "Dedication", desc: "Reach a 30-day streak", icon: Star, color: "text-rose-500", bg: "bg-rose-100", unlocked: false },
];

const POSTS = [
  {
    id: 1,
    user: "Sarah J.",
    avatar: "S",
    time: "2 hours ago",
    content: "Just finished the basic greetings module in Japanese! Konnichiwa everyone! 🎌",
    likes: 24,
    comments: 5,
    language: "Japanese"
  },
  {
    id: 2,
    user: "Mike T.",
    avatar: "M",
    time: "5 hours ago",
    content: "The shadowing exercises are really helping my pronunciation. Anyone want to practice together?",
    likes: 15,
    comments: 8,
    language: "English"
  }
];

export default function Community() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<"feed" | "achievements">("feed");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 font-display">Community</h1>
        <p className="mt-2 text-zinc-600">Connect with other learners and view your achievements.</p>
      </div>

      <div className="border-b border-zinc-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "feed", label: "Global Feed" },
            { id: "achievements", label: "My Achievements" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "feed" ? (
        <div className="space-y-6">
          {/* Create Post */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-indigo-600">{user?.name?.[0] || "U"}</span>
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share your learning progress..."
                  className="w-full resize-none border-0 focus:ring-0 p-0 text-zinc-900 placeholder-zinc-400 bg-transparent"
                  rows={2}
                />
                <div className="flex justify-end mt-2 pt-2 border-t border-zinc-50">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="font-bold text-emerald-600">{post.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">{post.user}</h3>
                    <p className="text-xs text-zinc-500">{post.time} • Learning {post.language}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-700 mb-4">{post.content}</p>
              <div className="flex items-center gap-6 border-t border-zinc-50 pt-4">
                <button className="flex items-center text-sm text-zinc-500 hover:text-rose-500 transition-colors group">
                  <Heart className="h-4 w-4 mr-1.5 group-hover:fill-rose-500" />
                  {post.likes}
                </button>
                <button className="flex items-center text-sm text-zinc-500 hover:text-indigo-500 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  {post.comments}
                </button>
                <button className="flex items-center text-sm text-zinc-500 hover:text-indigo-500 transition-colors ml-auto">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="achievements">
          {ACHIEVEMENTS.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "p-6 rounded-3xl border flex flex-col items-center text-center transition-all",
                achievement.unlocked 
                  ? "bg-white border-zinc-100 shadow-sm hover:shadow-md" 
                  : "bg-zinc-50 border-zinc-200 opacity-70 grayscale"
              )}
            >
              <div className={cn("h-16 w-16 rounded-full flex items-center justify-center mb-4", achievement.bg)}>
                <achievement.icon className={cn("h-8 w-8", achievement.color)} />
              </div>
              <h3 className="font-bold text-zinc-900 mb-1">{achievement.title}</h3>
              <p className="text-sm text-zinc-500">{achievement.desc}</p>
              {!achievement.unlocked && (
                <div className="mt-4 px-3 py-1 bg-zinc-200 rounded-full text-xs font-medium text-zinc-600">
                  Locked
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
