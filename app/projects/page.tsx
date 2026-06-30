import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          All <span className="gradient-text">Projects</span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Explore my open-source work, full-stack applications, and AI initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between group h-full space-y-4"
          >
            <div>
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                {project.title.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {project.title}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1"
              >
                <span>View Details</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}