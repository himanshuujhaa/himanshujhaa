import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const skills = [
    { category: "Backend Languages & Frameworks", items: ["Java", "Spring Boot", "Spring Cloud", "Hibernate", "REST APIs"] },
    { category: "Frontend & Web Technologies", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML5/CSS3"] },
    { category: "Databases & Storage", items: ["MySQL", "PostgreSQL", "Redis", "MongoDB"] },
    { category: "AI & Tools", items: ["OpenAI API", "Git", "Docker", "Postman", "Maven", "Gradle"] },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About <span className="gradient-text">Me</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Driven by a curiosity for how complex computer systems operate and a passion for crafting efficient, maintainable software.
        </p>
      </div>

      {/* Main Bio Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          <p>
            Hello! I&apos;m <strong className="text-slate-900 dark:text-white font-semibold">Himanshu Jha</strong>, a Software Engineer dedicated to constructing scalable backend services and interactive web applications.
          </p>
          <p>
            My journey in software engineering revolves around mastering core languages like <span className="text-blue-500 font-semibold">Java</span> and framework ecosystems like <span className="text-blue-500 font-semibold">Spring Boot</span>. Over the years, I&apos;ve built enterprise management systems, AI-driven feedback tools, and responsive web platforms.
          </p>
          <p>
            I strongly believe in writing clean, well-documented code and designing systems that can scale gracefully under heavy loads. Recently, I&apos;ve been exploring how Generative AI and intelligent agent workflows can be integrated cleanly into backend services to empower users.
          </p>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative p-3 rounded-2xl glass-card border border-white/20 shadow-xl max-w-sm">
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Himanshu Jha"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Technical Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group) => (
            <div key={group.category} className="glass-card p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interested in working together?</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Check out my projects or get directly in touch.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/projects" className="px-5 py-2.5 rounded-xl gradient-bg text-white font-medium shadow-md">
            View Projects
          </Link>
          <Link href="/contact" className="px-5 py-2.5 rounded-xl glass-card font-medium text-slate-800 dark:text-slate-200">
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}