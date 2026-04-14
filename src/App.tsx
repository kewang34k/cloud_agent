import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CourseHub from "@/pages/Courses/CourseHub";
import LessonView from "@/pages/Modules/LessonView";
import Community from "@/pages/Community/Community";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <CourseHub />
            </ProtectedRoute>
          } />
          
          <Route path="/modules/:id" element={
            <ProtectedRoute>
              <LessonView />
            </ProtectedRoute>
          } />
          
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
