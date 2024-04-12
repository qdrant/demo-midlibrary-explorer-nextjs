import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function POST(request) {
  const client = getQdrantClient();

  const { reference_id, exclude_ids, limit } = await request.json();
  let filter = {};

  if (exclude_ids.length > 0) {
    filter = {
      must_not: [{ has_id: exclude_ids }],
    };
  }

  const response = await client.recommend(process.env.QDRANT_COLLECTION_NAME, {
    positive: [reference_id],
    filter,
    limit,
  });

  const results = response.map(parseResult);
  return NextResponse.json(results);
}
