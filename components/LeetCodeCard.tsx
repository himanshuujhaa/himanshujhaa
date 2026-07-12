"use client";

import { useEffect, useState } from "react";

export default function LeetcodeCard() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("/api/leetcode");
                if (!res.ok) throw new Error("Failed to fetch LeetCode data");
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                console.error(err);
                setError("Could not load LeetCode stats");
            }
        }
        getData();
    }, []);

    if (error) {
        return (
            <div className="glass-card p-6 rounded-2xl border border-rose-500/20 text-center max-w-xl">
                <p className="text-rose-500 font-medium">{error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 min-h-[180px] max-w-xl">
                <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 text-sm">Fetching LeetCode stats...</p>
            </div>
        );
    }

    const username = data.username || "himanshujhaa";
    const stats = data.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || data.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    const contestRanking = data.data?.userContestRanking || data.userContestRanking;
    const contestHistory = (data.data?.userContestRankingHistory || data.userContestRankingHistory || []).filter((h: any) => h.attended);

    const tagCounts = data.data?.matchedUser?.tagProblemCounts || data.matchedUser?.tagProblemCounts;

    const advancedTags = tagCounts?.advanced || [];
    const intermediateTags = tagCounts?.intermediate || [];
    const fundamentalTags = tagCounts?.fundamental || [];

    const totalAdvancedSolved = advancedTags.reduce((sum: number, t: any) => sum + t.problemsSolved, 0);
    const totalIntermediateSolved = intermediateTags.reduce((sum: number, t: any) => sum + t.problemsSolved, 0);
    const totalFundamentalSolved = fundamentalTags.reduce((sum: number, t: any) => sum + t.problemsSolved, 0);

    const topFundamental = [...fundamentalTags].sort((a: any, b: any) => b.problemsSolved - a.problemsSolved).slice(0, 5);
    const topIntermediate = [...intermediateTags].sort((a: any, b: any) => b.problemsSolved - a.problemsSolved).slice(0, 5);
    const topAdvanced = [...advancedTags].sort((a: any, b: any) => b.problemsSolved - a.problemsSolved).slice(0, 6);

    const masteryBreakdown = tagCounts ? (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-amber-500/20 transition-all duration-300 relative group overflow-hidden w-full mx-auto animate-fade-in">
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all duration-500" />

            <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-6">Topic Mastery Breakdown</h5>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* Left/Middle columns: Category Counts */}
                <div className="lg:col-span-2 grid grid-cols-3 gap-3 text-center">
                    {/* Fundamentals */}
                    <div className="p-3.5 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl border border-emerald-500/10 dark:border-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider text-[8px] sm:text-[10px]">Fundamentals</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">{totalFundamentalSolved}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5">solved</span>
                    </div>

                    {/* Intermediate */}
                    <div className="p-3.5 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/10 dark:border-amber-500/20">
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider text-[8px] sm:text-[10px]">Intermediate</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-1 block">{totalIntermediateSolved}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5">solved</span>
                    </div>

                    {/* Advanced */}
                    <div className="p-3.5 bg-purple-500/5 dark:bg-purple-500/10 rounded-2xl border border-purple-500/10 dark:border-purple-500/20">
                        <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 block uppercase tracking-wider text-[8px] sm:text-[10px]">Advanced</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-1 block">{totalAdvancedSolved}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-0.5">solved</span>
                    </div>
                </div>

                {/* Right column: Topic Tag pills (no counts) */}
                <div className="lg:col-span-1 space-y-3 bg-slate-100/30 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                    <div className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                        Key Topics
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            ...topAdvanced,
                            ...topIntermediate,
                            ...topFundamental
                        ].filter(Boolean).map((tag: any, idx: number) => {
                            const isAdvanced = advancedTags.some((t: any) => t.tagName === tag.tagName);
                            const isIntermediate = intermediateTags.some((t: any) => t.tagName === tag.tagName);
                            const colorClass = isAdvanced
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/10 dark:border-purple-500/20'
                                : isIntermediate
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 dark:border-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-500/20';

                            return (
                                <span
                                    key={idx}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
                                >
                                    {tag.tagName}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    if (!stats) {
        return (
            <div className="glass-card p-6 rounded-2xl border border-yellow-500/20 text-center max-w-xl">
                <p className="text-slate-600 dark:text-slate-400">No stats found for this profile.</p>
            </div>
        );
    }

    const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
    const totalSolved = stats.find((s: any) => s.difficulty === "All")?.count || 0;

    // Benchmarks for total Leetcode questions to show progress
    const totalEasy = 820;
    const totalMedium = 1650;
    const totalHard = 700;
    const totalOverall = totalEasy + totalMedium + totalHard;

    const easyPercentage = Math.min(100, Math.round((easy / totalEasy) * 100));
    const mediumPercentage = Math.min(100, Math.round((medium / totalMedium) * 100));
    const hardPercentage = Math.min(100, Math.round((hard / totalHard) * 100));
    const overallPercentage = Math.min(100, Math.round((totalSolved / totalOverall) * 100));

    // Calculate rating graph parameters if contest history is available
    const hasContestData = contestRanking && contestRanking.attendedContestsCount > 0 && contestHistory.length > 0;

    const currentRating = contestRanking?.rating || 0;
    const historyMaxRating = contestHistory.length > 0 ? Math.max(...contestHistory.map((h: any) => h.rating)) : 0;
    const peakRating = Math.max(historyMaxRating, currentRating);

    let chartSvg = null;
    let minRating = 0;
    let maxRating = 0;

    if (hasContestData) {
        const ratings = contestHistory.map((h: any) => h.rating);
        minRating = Math.round(Math.min(...ratings) - 30);
        maxRating = Math.round(Math.max(...ratings) + 30);

        // Define SVG bounds
        const svgW = 500;
        const svgH = 120;
        const padX = 40;
        const padY = 20;
        const chartW = svgW - padX * 2;
        const chartH = svgH - padY * 2;

        const points = contestHistory.map((h: any, i: number) => {
            const x = padX + (contestHistory.length > 1 ? (i / (contestHistory.length - 1)) * chartW : chartW / 2);
            const y = padY + chartH - ((h.rating - minRating) / (maxRating - minRating)) * chartH;
            return `${x},${y}`;
        });

        const linePath = `M ${points.join(" L ")}`;

        // Path for fill area underneath the line chart
        const areaPath = `${linePath} L ${points[points.length - 1].split(",")[0]},${svgH - padY} L ${points[0].split(",")[0]},${svgH - padY} Z`;

        chartSvg = (
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto mt-4 overflow-visible">
                <defs>
                    <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                <line x1={padX} y1={padY} x2={svgW - padX} y2={padY} className="stroke-slate-200/40 dark:stroke-slate-800/60" strokeDasharray="3 3" strokeWidth={1} />
                <line x1={padX} y1={padY + chartH} x2={svgW - padX} y2={padY + chartH} className="stroke-slate-200/40 dark:stroke-slate-800/60" strokeDasharray="3 3" strokeWidth={1} />

                {/* Y Axis Labels (Min / Max Rating) */}
                <text x={padX - 8} y={padY + 4} className="text-[10px] font-mono font-medium fill-slate-400 dark:fill-slate-500 text-right" textAnchor="end">{maxRating}</text>
                <text x={padX - 8} y={padY + chartH + 4} className="text-[10px] font-mono font-medium fill-slate-400 dark:fill-slate-500 text-right" textAnchor="end">{minRating}</text>

                {/* Fill Area */}
                <path d={areaPath} fill="url(#chartFill)" />

                {/* Main Line */}
                <path d={linePath} fill="none" stroke="url(#chartStroke)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                {/* Data Points / Circles */}
                {points.map((pt: string, idx: number) => {
                    const [cx, cy] = pt.split(",");
                    const rating = Math.round(contestHistory[idx].rating);
                    const contestName = contestHistory[idx].contest.title;
                    return (
                        <g key={idx} className="group/dot cursor-pointer">
                            <circle cx={cx} cy={cy} r={idx === points.length - 1 ? 5 : 3.5} className="fill-amber-500 hover:r-6 transition-all duration-200 stroke-white dark:stroke-slate-900" strokeWidth={1.5} />
                            <title>{`${contestName}\nRating: ${rating}`}</title>
                        </g>
                    );
                })}
            </svg>
        );
    }

    if (!hasContestData) {
        return (
            <div className="max-w-xl w-full mx-auto space-y-8 animate-fade-in">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl w-full hover:shadow-2xl hover:border-amber-500/20 transition-all duration-300 relative group overflow-hidden">
                    {/* Ambient Background Glow */}
                    <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-500" />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-amber-500 dark:fill-amber-400 animate-pulse" xmlns="http://www.w3.org/2000/svg">
                                <title>LeetCode</title>
                                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.19a3.037 3.037 0 0 1-.062-4.194l3.856-4.122 3.96-3.955a3.03 3.03 0 0 1 4.281.02c1.13 1.171 1.09 3.053-.094 4.17l-4.73 4.46a.734.734 0 0 0-.229.531c-.004.244.121.47.34.577.22.108.48.097.691-.034l4.73-4.46a5.52 5.52 0 0 0 1.623-4.032 5.503 5.503 0 0 0-1.745-3.914L14.444.426A1.36 1.36 0 0 0 13.483 0zm-5.27 17.11a1.0002 1.002 0 0 0-.22.61c.003.22.115.42.302.53a.999.999 0 0 0 .979-.03l3.526-2.48a1.003 1.003 0 0 0-.22-1.78l-3.526-.84a1.002 1.002 0 0 0-1.077.53 1 1 0 0 0-.012.87z" />
                            </svg>
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">LeetCode Profile</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">@{username}</p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            Active Solver
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Radial Progress Score */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-center relative overflow-hidden">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Solved</span>
                            <span className="text-5xl font-extrabold text-slate-900 dark:text-white mt-2 font-mono gradient-text">{totalSolved}</span>
                            <span className="text-[10px] text-slate-400 mt-1">out of ~{totalOverall} challenges</span>

                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${overallPercentage}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1 font-semibold">{overallPercentage}% Completed</span>
                        </div>

                        {/* Difficulty Bars */}
                        <div className="md:col-span-7 space-y-4">
                            {/* Easy */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Easy</span>
                                    <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{easy} <span className="text-slate-400 text-[10px]">/ {totalEasy}</span></span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-700/30">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${easyPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Medium */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-amber-500 dark:text-amber-400 font-semibold">Medium</span>
                                    <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{medium} <span className="text-slate-400 text-[10px]">/ {totalMedium}</span></span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-700/30">
                                    <div
                                        className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${mediumPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Hard */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-rose-500 dark:text-rose-400 font-semibold">Hard</span>
                                    <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{hard} <span className="text-slate-400 text-[10px]">/ {totalHard}</span></span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-700/30">
                                    <div
                                        className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${hardPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mastery Breakdown */}
                {masteryBreakdown}
            </div>
        );
    }

    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Card 1: Solved Stats */}
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-amber-500/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                    {/* Ambient Background Glow */}
                    <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-500" />

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-amber-500 dark:fill-amber-400 animate-pulse" xmlns="http://www.w3.org/2000/svg">
                                    <title>LeetCode</title>
                                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.19a3.037 3.037 0 0 1-.062-4.194l3.856-4.122 3.96-3.955a3.03 3.03 0 0 1 4.281.02c1.13 1.171 1.09 3.053-.094 4.17l-4.73 4.46a.734.734 0 0 0-.229.531c-.004.244.121.47.34.577.22.108.48.097.691-.034l4.73-4.46a5.52 5.52 0 0 0 1.623-4.032 5.503 5.503 0 0 0-1.745-3.914L14.444.426A1.36 1.36 0 0 0 13.483 0zm-5.27 17.11a1.002 1.002 0 0 0-.22.61c.003.22.115.42.302.53a.999.999 0 0 0 .979-.03l3.526-2.48a1.003 1.003 0 0 0-.22-1.78l-3.526-.84a1.002 1.002 0 0 0-1.077.53 1 1 0 0 0-.012.87z" />
                                </svg>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">LeetCode Profile</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">@{username}</p>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                Active Solver
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            {/* Radial Progress Score */}
                            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-center relative overflow-hidden">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Solved</span>
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-mono gradient-text">{totalSolved}</span>
                                <span className="text-[10px] text-slate-400 mt-1">out of ~{totalOverall}</span>

                                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                        style={{ width: `${overallPercentage}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500 mt-1 font-semibold">{overallPercentage}% Done</span>
                            </div>

                            {/* Difficulty Bars */}
                            <div className="sm:col-span-7 space-y-3">
                                {/* Easy */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Easy</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{easy} <span className="text-slate-400 text-[10px]">/ {totalEasy}</span></span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-700/20">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${easyPercentage}%` }} />
                                    </div>
                                </div>

                                {/* Medium */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-amber-500 dark:text-amber-400 font-semibold">Medium</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{medium} <span className="text-slate-400 text-[10px]">/ {totalMedium}</span></span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-700/20">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${mediumPercentage}%` }} />
                                    </div>
                                </div>

                                {/* Hard */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-rose-500 dark:text-rose-400 font-semibold">Hard</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-semibold font-mono">{hard} <span className="text-slate-400 text-[10px]">/ {totalHard}</span></span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200/30 dark:border-slate-700/20">
                                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${hardPercentage}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Contest Performance Graph */}
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-amber-500/20 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                    {/* Ambient Background Glow */}
                    <div className="absolute -left-20 -top-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-500" />

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Contest Performance</h5>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Max Rating</span>
                                    <span className="text-lg font-extrabold text-amber-500 font-mono">{Math.round(peakRating)}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Current Rating</span>
                                    <span className="text-lg font-extrabold text-amber-500 font-mono">{Math.round(currentRating)}</span>
                                </div>
                                <div className="text-right border-l border-slate-200 dark:border-slate-800/80 pl-4">
                                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Global Rank</span>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">Top {contestRanking.topPercentage}%</span>
                                </div>
                                <div className="text-right border-l border-slate-200 dark:border-slate-800/80 pl-4">
                                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Contests</span>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">{contestRanking.attendedContestsCount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating Chart */}
                        <div className="bg-slate-100/30 dark:bg-slate-900/20 p-2 sm:p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                            {chartSvg}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mastery Breakdown outside both cards */}
            {masteryBreakdown}
        </div>
    );
}