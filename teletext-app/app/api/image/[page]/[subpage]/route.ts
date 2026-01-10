// app/api/image/[page]/[subpage]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: any }) {
  const params = await context.params;
  const page = +params.page;
  const subpage = +params.subpage;

  if (isNaN(page)) {
    return NextResponse.json({ error: "Page not a number." }, { status: 400 });
  }
  if (isNaN(subpage)) {
    return NextResponse.json({ error: "Subpage not a number." }, { status: 400 })
  }

  // Valid page numbers are: 100-899.
  if (page < 99 || page > 900) {
    return NextResponse.json(
      { error: "Invalid page number." },
      { status: 400 }
    );
  }

  const appId = process.env.YLE_APP_ID!;
  const appKey = process.env.YLE_APP_KEY!;
  const imageUrl = `https://external.api.yle.fi/v1/teletext/images/${page}/${subpage}.png?app_id=${appId}&app_key=${appKey}`;

  const res = await fetch(imageUrl);

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: res.status });
  }

  const buffer = await res.arrayBuffer();

  return new NextResponse(buffer, {
    headers: { "Content-Type": "image/png" },
  });
}
