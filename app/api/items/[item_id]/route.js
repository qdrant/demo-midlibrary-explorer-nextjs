import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const client = getQdrantClient();

  const response = await client.retrieve(process.env.QDRANT_COLLECTION_NAME, {
    ids: [parseInt(params.item_id)],
    with_payload: true,
    with_vector: false,
  });

  return NextResponse.json(parseResult(response[0]));
}
