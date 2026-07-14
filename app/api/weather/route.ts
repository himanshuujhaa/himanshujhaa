import { NextRequest, NextResponse } from "next/server";

export const revalidate = 1800; // Cache response for 30 minutes at CDN/Server level

export async function GET(request: NextRequest) {
    try {
        // Get client IP address
        let ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";

        // Standardise IP (remove port if present in header, and split multiple IPs if forwarded)
        if (ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }
        if (ip.includes(":") && !ip.includes(".")) {
            // If it contains colon but no dot, check if it's an IPv6 with port
            const parts = ip.split(":");
            if (parts.length === 2) {
                ip = parts[0];
            }
        }

        // Detect local development loopback IPs
        const isLocalhost = ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127.0.0.1") || !ip;
        const targetIp = isLocalhost ? "103.159.255.255" : ip;

        // 1. Try Vercel built-in Geo headers first (instantly available in Vercel deployments, no external calls/rate-limits)
        let city = request.headers.get("x-vercel-ip-city") || "";
        let latitude = request.headers.get("x-vercel-ip-latitude") || "";
        let longitude = request.headers.get("x-vercel-ip-longitude") || "";

        if (city) {
            city = decodeURIComponent(city);
        }

        // 2. If not running on Vercel or headers are missing, fall back to IP lookup API
        if (!city || !latitude || !longitude) {
            try {
                // Primary IP fallback: freeipapi.com (HTTPS, high limits, rate-limits by client IP, not server IP)
                const ipResponse = await fetch(`https://freeipapi.com/api/json/${targetIp}`, {
                    next: { revalidate: 86400 } // Cache lookup for 24 hours
                });
                if (ipResponse.ok) {
                    const data = await ipResponse.json();
                    city = data.cityName || "your area";
                    latitude = data.latitude ? data.latitude.toString() : "";
                    longitude = data.longitude ? data.longitude.toString() : "";
                }
            } catch (err) {
                console.warn("freeipapi lookup failed, trying ipapi.co fallback:", err);
                try {
                    // Secondary IP fallback: ipapi.co
                    const ipResponse = await fetch(`https://ipapi.co/${targetIp}/json/`, {
                        next: { revalidate: 86400 }
                    });
                    if (ipResponse.ok) {
                        const data = await ipResponse.json();
                        if (!data.error) {
                            city = data.city || "your area";
                            latitude = data.latitude ? data.latitude.toString() : "";
                            longitude = data.longitude ? data.longitude.toString() : "";
                        }
                    }
                } catch (err2) {
                    console.warn("ipapi.co fallback failed:", err2);
                }
            }
        }

        // If location lookup fails completely, standard static fallbacks will be used in the catches
        const latFloat = latitude ? parseFloat(latitude) : null;
        const lonFloat = longitude ? parseFloat(longitude) : null;

        let temperature = 25;
        let weathercode = 0;
        let condition = "Nice Weather 🌤️";

        // 3. Fetch current weather from Open-Meteo using lat/lon
        if (latFloat !== null && lonFloat !== null && !isNaN(latFloat) && !isNaN(lonFloat)) {
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
                { next: { revalidate: 1800 } } // Cache weather requests for 30 minutes
            );

            if (weatherResponse.ok) {
                const weatherData = await weatherResponse.json();
                temperature = Math.round(weatherData.current_weather.temperature);
                weathercode = weatherData.current_weather.weathercode;

                // Map WMO Weather Interpretation Codes (WMO) to readable conditions
                const conditionMap: { [key: number]: string } = {
                    0: "Clear Sky ☀️",
                    1: "Mainly Clear 🌤️",
                    2: "Partly Cloudy ⛅",
                    3: "Overcast ☁️",
                    45: "Foggy 🌫️",
                    48: "Depositing Rime Fog 🌫️",
                    51: "Light Drizzle 🌧️",
                    53: "Moderate Drizzle 🌧️",
                    55: "Dense Drizzle 🌧️",
                    61: "Slight Rain 🌧️",
                    63: "Moderate Rain 🌧️",
                    65: "Heavy Rain 🌧️",
                    71: "Slight Snow ❄️",
                    73: "Moderate Snow ❄️",
                    75: "Heavy Snow ❄️",
                    80: "Slight Rain Showers 🌦️",
                    81: "Moderate Rain Showers 🌦️",
                    82: "Violent Rain Showers 🌧️",
                    95: "Thunderstorm ⛈️",
                    96: "Thunderstorm with Hail ⛈️",
                    99: "Heavy Thunderstorm ⛈️",
                };
                condition = conditionMap[weathercode] || "Moderate Weather 🌤️";
            }
        }

        return NextResponse.json({
            city,
            temp: temperature,
            condition,
            ip: targetIp,
        });

    } catch (error: any) {
        console.error("Weather API error:", error);

        // Safe, graceful fallback in case of errors
        return NextResponse.json({
            city: "Delhi",
            temp: 28,
            condition: "Clear Sky ☀️",
            error: error.message || "Unknown error",
        });
    }
}
