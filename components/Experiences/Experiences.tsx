"use client";

import { useState } from "react";
import { experiences } from "@/data/experiences";

const CompanyLogo = ({ id, size = "sm" }: { id: string; size?: "sm" | "lg" }) => {
  const sizeClasses = size === "lg" ? "w-16 h-16 rounded-2xl animate-float" : "w-11 h-11 rounded-xl";
  const iconSize = size === "lg" ? "w-10 h-10" : "w-7 h-7";

  const bgClasses = size === "lg"
    ? "bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm"
    : "bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 shadow-sm";

  if (id === "tcs") {
    return (
      <div
        className={`${sizeClasses} ${bgClasses} flex items-center justify-center shrink-0 select-none transition-all duration-300`}
      >
        <svg viewBox="0 0 100 100" className={iconSize} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tcs-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9E00" />
              <stop offset="40%" stopColor="#E20650" />
              <stop offset="75%" stopColor="#8E258D" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          {/* 't' stem */}
          <path
            d="M22,24 L22,62 C22,71 29,71 32,66 C35,62 35,56 35,50"
            fill="none"
            stroke="url(#tcs-ribbon-gradient)"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 't' crossbar */}
          <path
            d="M14,44 L28,44"
            fill="none"
            stroke="url(#tcs-ribbon-gradient)"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 'c' loop */}
          <path
            d="M63,38 C52,34 42,43 42,54 C42,65 52,74 63,70"
            fill="none"
            stroke="url(#tcs-ribbon-gradient)"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 's' loop */}
          <path
            d="M88,38 C78,34 70,43 72,52 C74,61 88,59 88,67 C88,75 78,76 72,69"
            fill="none"
            stroke="url(#tcs-ribbon-gradient)"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (id === "aixtor") {
    return (
      <div
        className={`${sizeClasses} ${bgClasses} flex items-center justify-center shrink-0 select-none transition-all duration-300`}
      >
        <svg viewBox="0 0 100 100" className={iconSize} xmlns="http://www.w3.org/2000/svg">
          {/* Right Red Leg (Bottom Layer) */}
          <path d="M43,16 L57,16 L84,84 L70,84 Z" fill="#D12B54" />
          {/* Fold Shadow */}
          <path d="M43,16 L57,16 L50,33 Z" fill="#8C1332" />
          {/* Gray Bar (Middle Layer) */}
          <path d="M64,21 L78,17 L59,84 L45,84 Z" fill="#3F434A" />
          {/* Left Red Leg (Top Layer) */}
          <path d="M16,84 L30,84 L57,16 L43,16 Z" fill="#D12B54" />
        </svg>
      </div>
    );
  }

  return null;
};

export default function Experiences() {
  const [activeTab, setActiveTab] = useState(0);
  const current = experiences[activeTab];

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
      {/* Dynamic ambient background glow in the container */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 min-h-[500px]">
        {/* Left Column: Tab list */}
        <div className="w-full md:w-72 flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800/50 scrollbar-thin">
          {experiences.map((exp, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-3.5 w-auto md:w-full text-left px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/15 dark:to-purple-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                <CompanyLogo id={exp.id} size="sm" />

                <div className="flex-1 min-w-0 pr-2">
                  <p className="truncate text-sm sm:text-base font-semibold leading-tight">
                    {exp.company}
                  </p>
                  <p className="truncate text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {exp.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Experience Details Panel */}
        <div key={current.id} className="flex-1 space-y-8 animate-fade-in duration-300">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-5">
              <CompanyLogo id={current.id} size="lg" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {current.role}
                </h3>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1 leading-none">
                  {current.company}
                </p>
              </div>
            </div>

            {/* Date & Location Badges */}
            <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {current.period}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {current.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-base">
            {current.description}
          </p>

          {/* Impact Metrics Stats Grid */}
          {current.stats && current.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {current.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden group rounded-2xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-900/10 p-5 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  {/* Glowing corner on hover */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <p className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Contributions list */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Key Contributions &amp; Achievements
            </h4>
            <ul className="space-y-3.5">
              {current.contributions.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Tag Cloud */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {current.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-350 border border-slate-200/50 dark:border-slate-800/80 hover:border-blue-500/40 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}