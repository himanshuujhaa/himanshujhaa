const query = `
query getUserAndContest($username: String!) {
    matchedUser(username : $username) {
        submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
            }
        }
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
    }
    userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
            title
            startTime
        }
    }
}`;

let cachedData: any = null;
let lastFetched = 0;
const CACHE_DURATION = 3600 * 1000; // 1 hour in ms

export async function fetchLeetCode(username: string) {
    const now = Date.now();
    
    // Return cached data if it's less than 1 hour old
    if (cachedData && (now - lastFetched < CACHE_DURATION)) {
        console.log("Serving LeetCode data from cache");
        return cachedData;
    }

    try {
        const url = "https://leetcode.com/graphql";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables: { username } }),
            next: { revalidate: 3600 } // Also enable Next.js fetch cache for Vercel/ISR
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        cachedData = data;
        lastFetched = now;
        return data;
    } catch (error) {
        console.error("Error fetching LeetCode data from API:", error);
        
        // Return stale data as fallback if we have it
        if (cachedData) {
            console.log("Serving stale LeetCode data as fallback after error");
            return cachedData;
        }
        
        throw error;
    }
}