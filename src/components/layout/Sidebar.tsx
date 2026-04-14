import { Link, useLocation } from "react-router-dom";
import { BookOpen, Compass, Trophy, User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { user, logout } = useStore();
  const location = useLocation();

  if (!user) return null;

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Community", href: "/community", icon: Compass },
    { name: "Achievements", href: "/community#achievements", icon: Trophy },
  ];

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r border-zinc-200 bg-white z-10 pt-16">
      <div className="flex flex-col flex-1 overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-4 space-y-2 bg-white">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href.split('#')[0]);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 ease-in-out"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-indigo-700" : "text-zinc-400 group-hover:text-zinc-500",
                    "mr-3 flex-shrink-0 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-zinc-200 p-4">
        <div className="flex items-center w-full group">
          <div>
            <div className="inline-block h-10 w-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200">
              <div className="h-full w-full flex items-center justify-center text-zinc-400">
                <UserIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
              {user.name}
            </p>
            <button
              onClick={logout}
              className="text-xs font-medium text-zinc-500 group-hover:text-zinc-700 flex items-center mt-1"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
