import Link from "next/link";
import Hero from "@/components/Hero";
import { projects } from "@/data/projects";

export default function Home() {
  const expertise = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      title: "Backend Architecture",
      description: "Designing scalable enterprise services, RESTful APIs, and robust data models with Java, Spring Boot, and relational databases.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Integration & Agents",
      description: "Leveraging LLM APIs, prompt engineering, and modern AI frameworks to create intuitive intelligent applications and automation tools.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Full-Stack Web Engineering",
      description: "Building fast, dynamic, and accessible frontend interfaces using React, Next.js, and modern CSS utility frameworks.",
    },
  ];

  return (
    <main className="space-y-24 pb-24">
      {/* Hero Section */}
      <Hero />

      {/* Technical Expertise Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            What I Do
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Combining strong core computer science principles with modern web and AI frameworks to solve real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl flex flex-col items-start relative group"
            >
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              A selection of software systems and web apps I&apos;ve engineered recently.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 group"
          >
            <span>View all projects</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:rotate-6 transition-transform">
                  {project.title.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass-card p-10 sm:p-14 rounded-3xl relative overflow-hidden text-center bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-blue-500/20">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Let&apos;s build something exceptional together
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              Whether you have a specific project in mind, need backend architectural expertise, or just want to connect, feel free to reach out.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}