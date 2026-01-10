// app/api/metadata/[page]/route.ts
import { NextResponse } from "next/server";

// export async function GET(request: Request, context: { params: any }) {
//   const params = await context.params
//   const page = +params.page;

export async function GET(request: Request, context: { params: any }) {
  const params = await context.params;
  const page = +params.page;

  if (isNaN(page) || page < 99 || page > 899) {
    return NextResponse.json(
      { error: "Invalid page" },
      { status: 400 }
    );
  }

  const metadataUrl = `https://external.api.yle.fi/v1/teletext/pages/${page}.json?app_id=${process.env.YLE_APP_ID}&app_key=${process.env.YLE_APP_KEY}`;

try {
    const res = await fetch(metadataUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch metadata" }, { status: res.status });
    }

    const data = await res.json();

    const subpagecountStr = data?.teletext?.page?.subpagecount;
    const subpagecount = +subpagecountStr

    console.log("Extracted subpagecount:", subpagecount)

    return NextResponse.json({ subpagecount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
