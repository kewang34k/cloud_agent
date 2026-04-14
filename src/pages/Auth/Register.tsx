import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0] || "New User",
      email,
      targetLanguage,
      currentLevel: "Beginner",
      xp: 0,
      streak: 1,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-zinc-100"
      >
        <div>
          <div className="flex justify-center">
            <Globe2 className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 font-display">
            Start Learning
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-zinc-300 placeholder-zinc-500 text-zinc-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-zinc-300 placeholder-zinc-500 text-zinc-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-zinc-700 mb-1">
                I want to learn
              </label>
              <select
                id="language"
                name="language"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl border"
              >
                <option>English</option>
                <option>Japanese</option>
                <option>Korean</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 shadow-md"
            >
              Create Account
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
