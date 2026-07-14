"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WeatherInfo {
    city: string;
    temp: number;
    condition: string;
}

export default function WeatherPopup() {
    const [hasTriggered, setHasTriggered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSpeech, setShowSpeech] = useState(false);
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Fetch weather data from our server-side API endpoint
    const fetchWeather = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/weather");
            if (!res.ok) throw new Error("Failed to fetch weather");
            const data = await res.json();
            setWeather({
                city: data.city,
                temp: data.temp,
                condition: data.condition,
            });
        } catch (err) {
            console.error("Could not fetch weather:", err);
            // Default fail-safe values
            setWeather({
                city: "your area",
                temp: 24,
                condition: "Nice Weather 🌤️",
            });
        } finally {
            setLoading(false);
        }
    };

    // Scroll listener to detect when user reaches the bottom
    useEffect(() => {
        // Retrieve dismissed state from sessionStorage to persist across page refreshes in same tab
        const dismissed = sessionStorage.getItem("weather_detective_dismissed") === "true";
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            if (hasTriggered || isDismissed) return;

            // Trigger when within 100px of the bottom of the page
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 100;

            if (scrollPosition >= threshold) {
                setHasTriggered(true);
                setIsVisible(true);
                fetchWeather();
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on load just in case the page is already at the bottom
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasTriggered, isDismissed]);

    // Delay the speech bubble appearance to give a cool spring effect
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setShowSpeech(true);
            }, 700); // 700ms delay after detective slides up
            return () => clearTimeout(timer);
        } else {
            setShowSpeech(false);
        }
    }, [isVisible]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowSpeech(false);
        // Wait for bubble to fade out before sliding the detective down
        setTimeout(() => {
            setIsVisible(false);
            setIsDismissed(true);
            sessionStorage.setItem("weather_detective_dismissed", "true");
        }, 300);
    };

    const handleDetectiveClick = () => {
        // Toggle speech bubble or refresh weather on click
        if (!showSpeech) {
            setShowSpeech(true);
        } else {
            fetchWeather();
        }
    };

    if (isDismissed || !isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-4 pointer-events-none select-none">
            {/* Speech Bubble */}
            <div
                className={`glass-card p-4 rounded-2xl max-w-[260px] sm:max-w-[280px] shadow-2xl border border-white/10 dark:border-slate-800/80 relative pointer-events-auto transition-all duration-500 ease-out ${
                    showSpeech
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                }`}
            >
                {/* Speech Bubble Tail */}
                <div className="absolute right-6 -bottom-2 w-4 h-4 rotate-45 bg-slate-50/90 dark:bg-slate-950/80 border-r border-b border-white/10 dark:border-slate-800/80 hidden sm:block" />

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    aria-label="Close message"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 pr-4 leading-relaxed">
                    {loading ? (
                        <div className="space-y-2 py-1">
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4" />
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-5/6" />
                        </div>
                    ) : weather ? (
                        <p>
                            Psst... I tracked you down! 🕵️‍♂️ Looks like you&apos;re visiting from{" "}
                            <strong className="text-blue-500 dark:text-blue-400">{weather.city}</strong>. How&apos;s the weather there? It&apos;s currently{" "}
                            <strong className="text-amber-500">{weather.condition}</strong> at{" "}
                            <strong className="font-mono text-amber-500">{weather.temp}°C</strong>!
                        </p>
                    ) : (
                        <p>Scanning files... weather database is currently offline! 🔎</p>
                    )}
                </div>
            </div>

            {/* Detective Avatar */}
            <div
                onClick={handleDetectiveClick}
                className={`relative w-24 h-24 sm:w-28 sm:h-28 pointer-events-auto transform transition-all duration-700 ease-out cursor-pointer hover:scale-105 active:scale-95 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"
                }`}
            >
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 opacity-20 blur-md animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/30 dark:border-amber-500/40 bg-slate-900/40 backdrop-blur-sm">
                    <Image
                        src="/images/Detective.png"
                        alt="Weather Detective"
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        priority
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
