import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <Navbar />
      {user && <Sidebar />}
      <main className={cn(
        "pt-16 pb-20 transition-all duration-300 ease-in-out",
        user ? "md:pl-64" : ""
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Tab Bar Placeholder */}
      {user && (
        <div className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t border-zinc-200 flex items-center justify-around z-50 pb-safe">
          {/* Mobile navigation items would go here */}
          <span className="text-xs text-zinc-400 font-medium">Navigation</span>
        </div>
      )}
    </div>
  );
}
