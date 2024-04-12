import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function GET(request) {
  const client = getQdrantClient();

  const pointsCount = (await client.count(process.env.QDRANT_COLLECTION_NAME))
    .count;

  const itemId = Math.floor(Math.random() * pointsCount);

  const response = await client.retrieve(process.env.QDRANT_COLLECTION_NAME, {
    ids: [itemId],
    with_payload: true,
    with_vector: false,
  });

  return NextResponse.json(parseResult(response[0]));
}
