import Link from "next/link";
import HeroImage from "./HeroImage";

export default function Hero() {
  const techStack = ["Java", "Spring Boot", "Next.js", "AI / LLMs", "TypeScript", "React", "MySQL", "PostgreSQL"];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 lg:py-20 overflow-hidden">
      {/* Background ambient glow circles */}
      <div className="ambient-glow w-96 h-96 bg-blue-500/10 top-10 left-1/4" />
      <div className="ambient-glow w-96 h-96 bg-purple-500/10 bottom-10 right-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border border-blue-500/30 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for innovative engineering roles</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hi, I&apos;m <span className="gradient-text">Himanshu Jha</span>
          </h1>

          {/* Subtitle / Role */}
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Software Engineer &amp; Full-Stack Architect
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            I specialize in engineering robust backend microservices with <span className="font-semibold text-slate-800 dark:text-slate-200">Java &amp; Spring Boot</span>, building intelligent <span className="font-semibold text-slate-800 dark:text-slate-200">AI-powered web applications</span>, and crafting responsive frontend experiences with <span className="font-semibold text-slate-800 dark:text-slate-200">Next.js &amp; TypeScript</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-xl gradient-bg text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Explore Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl glass-card text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/50 active:scale-95 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>

          {/* Tech Stack Badges */}
          <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 w-full">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Core Technologies
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Hero Image Column */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}