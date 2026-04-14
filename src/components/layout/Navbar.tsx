import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Globe2, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user } = useStore();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <Globe2 className="h-8 w-8 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold text-zinc-900 tracking-tight font-display">LingoJourney</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                  <Flame className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm font-bold text-orange-700">{user.streak} Days</span>
                </div>
                <div className="hidden md:flex items-center bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                  <span className="text-sm font-bold text-indigo-700">{user.xp} XP</span>
                </div>
              </div>
            ) : (
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link
                  to="/login"
                  className="text-zinc-600 hover:text-zinc-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
