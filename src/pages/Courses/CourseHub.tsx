import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Star, Lock, CheckCircle2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    id: "c1",
    level: "Beginner",
    title: "Introduction to Greetings",
    description: "Learn how to introduce yourself and basic daily greetings.",
    modules: 5,
    status: "completed",
    xp: 150
  },
  {
    id: "c2",
    level: "Beginner",
    title: "Numbers & Time",
    description: "Master counting, telling time, and talking about days.",
    modules: 8,
    status: "in_progress",
    progress: 40,
    xp: 250
  },
  {
    id: "c3",
    level: "Beginner",
    title: "Ordering Food",
    description: "Essential vocabulary and grammar for restaurants and cafes.",
    modules: 6,
    status: "locked",
    xp: 200
  },
  {
    id: "c4",
    level: "Intermediate",
    title: "Travel & Directions",
    description: "Navigate cities, ask for directions, and book hotels.",
    modules: 10,
    status: "locked",
    xp: 350
  }
];

export default function CourseHub() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState("Beginner");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 font-display">Course Library</h1>
        <p className="mt-2 text-zinc-600">Your pathway to mastering {user?.targetLanguage || "a new language"}.</p>
      </div>

      <div className="border-b border-zinc-200">
        <nav className="-mb-px flex space-x-8">
          {["Beginner", "Intermediate", "Advanced"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.filter(c => c.level === activeTab).map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative rounded-3xl p-6 border transition-all duration-300",
              course.status === "locked" 
                ? "bg-zinc-50 border-zinc-200 opacity-75" 
                : "bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-indigo-200"
            )}
          >
            {course.status === "locked" && (
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center">
                <Lock className="h-4 w-4 text-zinc-500" />
              </div>
            )}
            {course.status === "completed" && (
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            )}
            
            <div className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center mb-4",
              course.status === "locked" ? "bg-zinc-200" : "bg-indigo-100"
            )}>
              <BookOpen className={cn("h-6 w-6", course.status === "locked" ? "text-zinc-500" : "text-indigo-600")} />
            </div>
            
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{course.title}</h3>
            <p className="text-sm text-zinc-500 mb-6 h-10">{course.description}</p>
            
            {course.status === "in_progress" && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
              <div className="flex items-center text-xs font-medium text-zinc-500">
                <Star className="h-4 w-4 text-orange-400 mr-1" />
                {course.xp} XP
              </div>
              <span className="text-xs font-medium text-zinc-500">{course.modules} modules</span>
            </div>

            {course.status !== "locked" && (
              <Link 
                to={`/modules/${course.id}`} 
                className="absolute inset-0 z-10 rounded-3xl ring-2 ring-transparent focus:ring-indigo-500 focus:outline-none"
                aria-label={`Start course ${course.title}`}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
