import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function POST(request) {
  const client = getQdrantClient();

  const { context, limit } = await request.json();

  const response = await client.discoverPoints(
    process.env.QDRANT_COLLECTION_NAME,
    {
      limit,
      context,
      with_payload: true,
    },
  );

  const results = response.map(parseResult);
  return NextResponse.json(results);
}
