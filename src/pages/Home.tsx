import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe2, Sparkles, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden pt-16 pb-32 space-y-24">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl font-display"
            >
              Master Languages <span className="text-indigo-600">Immersively</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-zinc-600"
            >
              Unlock fluency in English, Japanese, Korean, and more. A gamified journey with interactive modules, AI-driven shadowing, and community achievements.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/register"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105 active:scale-95"
              >
                Start Learning Now
              </Link>
              <Link to="/courses" className="text-sm font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors">
                Explore Courses <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Gamified Experience</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Everything you need to reach fluency</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {[
              {
                name: 'Leveled Course System',
                description: 'Structured pathways from absolute beginner to advanced proficiency. Adaptive to your pace.',
                icon: BookOpen,
              },
              {
                name: 'Interactive Modules',
                description: 'Vocabulary memorization, grammar exercises, oral shadowing, and listening training.',
                icon: Sparkles,
              },
              {
                name: 'Progress Tracking',
                description: 'Visualize your mastery. Maintain daily streaks and earn XP to unlock new content.',
                icon: Globe2,
              },
              {
                name: 'Community Incentives',
                description: 'Compete on leaderboards, share achievements, and interact with global learners.',
                icon: Users,
              },
            ].map((feature, index) => (
              <motion.div 
                key={feature.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-zinc-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-zinc-600">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
