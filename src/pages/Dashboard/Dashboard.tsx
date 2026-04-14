import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { Flame, Star, Trophy, ArrowRight, Target, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useStore();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 font-display">Welcome back, {user.name}!</h1>
          <p className="mt-1 text-zinc-500">Let's continue your {user.targetLanguage} journey.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white overflow-hidden shadow-sm rounded-3xl border border-zinc-100 p-6 flex items-center"
        >
          <div className="p-3 rounded-2xl bg-orange-50">
            <Flame className="h-8 w-8 text-orange-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-zinc-500">Day Streak</p>
            <p className="text-2xl font-bold text-zinc-900">{user.streak}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white overflow-hidden shadow-sm rounded-3xl border border-zinc-100 p-6 flex items-center"
        >
          <div className="p-3 rounded-2xl bg-indigo-50">
            <Star className="h-8 w-8 text-indigo-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-zinc-500">Total XP</p>
            <p className="text-2xl font-bold text-zinc-900">{user.xp}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white overflow-hidden shadow-sm rounded-3xl border border-zinc-100 p-6 flex items-center"
        >
          <div className="p-3 rounded-2xl bg-emerald-50">
            <Target className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-zinc-500">Current Level</p>
            <p className="text-2xl font-bold text-zinc-900">{user.currentLevel}</p>
          </div>
        </motion.div>
      </div>

      {/* Up Next */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/30 text-xs font-semibold tracking-wide text-indigo-100 mb-4">
              Recommended
            </span>
            <h2 className="text-2xl font-bold">Daily Vocabulary Review</h2>
            <p className="mt-2 text-indigo-100 max-w-xl">
              Keep your memory fresh. Review 20 {user.targetLanguage} words you learned recently to strengthen your retention.
            </p>
          </div>
          <Link 
            to="/modules/vocab-review"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50 shadow-sm transition-all active:scale-95"
          >
            Start Review
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-zinc-900">Basic Greetings Lesson {i}</p>
                    <p className="text-xs text-zinc-500">{i} day{i !== 1 ? 's' : ''} ago</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-indigo-600">+15 XP</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-900">Recent Achievements</h3>
            <Link to="/community#achievements" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "First Steps", desc: "Completed first lesson", color: "bg-amber-100", iconColor: "text-amber-600" },
              { title: "On Fire", desc: "3 day streak", color: "bg-orange-100", iconColor: "text-orange-600" },
              { title: "Polyglot", desc: "Learned 50 words", color: "bg-purple-100", iconColor: "text-purple-600" },
              { title: "Perfect Score", desc: "100% on grammar test", color: "bg-emerald-100", iconColor: "text-emerald-600" },
            ].map((badge, i) => (
              <div key={i} className="p-4 rounded-2xl border border-zinc-100 flex flex-col items-center text-center">
                <div className={`h-12 w-12 rounded-full ${badge.color} flex items-center justify-center mb-3`}>
                  <Trophy className={`h-6 w-6 ${badge.iconColor}`} />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">{badge.title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


