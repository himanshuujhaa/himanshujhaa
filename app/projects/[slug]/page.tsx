import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="glass-card p-8 sm:p-12 rounded-3xl space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center space-x-1 text-sm text-slate-500 hover:text-blue-500 mb-4 transition-colors"
        >
          <span>← Back to all projects</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Links
        </h3>

        <div className="flex gap-4">
          <Link href={`${project.github}`} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
          >
            Github Link
          </Link>
          <Link href={`${project.link}`} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
          >
            Live Link
          </Link>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Overview &amp; Architecture
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This project was engineered to showcase high-performance system design and modern development practices. Built utilizing {project.tech.join(", ")}, it demonstrates scalable architecture, clean API design, and intuitive user interactions.
        </p>
      </div>
    </article>
  );
}