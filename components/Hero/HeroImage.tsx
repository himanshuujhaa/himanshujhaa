import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl animate-pulse-glow" />

      {/* Frame wrapper */}
      <div className="relative p-2 rounded-full glass-card border border-white/20 shadow-2xl animate-float">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/40 dark:border-slate-700">
          <Image
            src="/images/profile.jpg"
            alt="Himanshu Jha"
            fill
            sizes="(max-width: 768px) 256px, 320px"
            priority
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}