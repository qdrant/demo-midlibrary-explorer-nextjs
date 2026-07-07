import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function GET(request) {
  const client = getQdrantClient();

  const pointsCount = (await client.count(process.env.QDRANT_COLLECTION_NAME))
    .count;

  const offset = Math.floor(Math.random() * pointsCount);

  // Use scroll with a random offset so this works regardless of ID scheme
  // (no assumption that IDs are sequential integers 0..N)
  const response = await client.scroll(process.env.QDRANT_COLLECTION_NAME, {
    limit: 1,
    offset,
    with_payload: true,
    with_vector: false,
  });

  return NextResponse.json(parseResult(response.points[0]));
}
