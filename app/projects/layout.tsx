import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 glass-card p-6 rounded-2xl sticky top-24 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Project Index
          </h2>
          <nav className="flex flex-col space-y-1">
            <Link
              href="/projects"
              className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
            >
              All Projects
            </Link>
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-400 transition-colors truncate"
              >
                {project.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
          {children}
        </main>
      </div>
    </div>
  );
}