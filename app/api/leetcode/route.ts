
import { fetchLeetCode } from "@/lib/leetcode";

export const revalidate = 3600; // Cache response at the CDN/Server level for 1 hour

export async function GET() {
    const username = process.env.LEETCODE_USERNAME;

    if (!username) {
        return Response.json(
            { error: "the given Leetcode username is not defined" },
            { status: 500 }
        );
    }

    const data = await fetchLeetCode(username);
    return Response.json({ username, ...data });
}