import { NextResponse } from "next/server";

const BASE   = "https://alfa-leetcode-api.onrender.com";
const REVALIDATE = 3600; // 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") ?? "mayankcodes-dev";

  try {
    // Parallel fetch: solved stats + badges
    const [statsRes, badgeRes] = await Promise.all([
      fetch(`${BASE}/${username}/solved`, { next: { revalidate: REVALIDATE } }),
      fetch(`${BASE}/${username}/badges`, { next: { revalidate: REVALIDATE } }),
    ]);

    const statsData = statsRes.ok  ? await statsRes.json()  : null;
    const badgeData = badgeRes.ok  ? await badgeRes.json()  : null;

    return NextResponse.json({
      status:        "ok",
      // totals
      leetcode:      statsData?.solvedProblem     ?? null,
      totalProblems: statsData?.totalSubmissions?.[0]?.count ?? null,
      // difficulty breakdown
      easy:          statsData?.easySolved         ?? null,
      medium:        statsData?.mediumSolved        ?? null,
      hard:          statsData?.hardSolved          ?? null,
      // difficulty totals (for "X/Total" display)
      easyTotal:     statsData?.totalEasy           ?? 947,
      mediumTotal:   statsData?.totalMedium         ?? 2063,
      hardTotal:     statsData?.totalHard           ?? 939,
      // badges
      badgesCount:   badgeData?.badgesCount         ?? 0,
      badges:        badgeData?.badges              ?? [],
      mostRecentBadge: badgeData?.activeBadge       ?? null,
    });
  } catch {
    return NextResponse.json(
      { status: "error", leetcode: null },
      { status: 500 }
    );
  }
}
