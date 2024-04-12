import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

// No cache when deployed to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-dynamic";

export async function POST(request) {
  // NOTE: REQUESTS TO THIS ROUTE HAVE BEEN DISABLED AT
  // context/data-context.jsx#L119-L128
  const client = getQdrantClient();

  const { target, context } = await request.json();

  let response = await client.retrieve(process.env.QDRANT_COLLECTION_NAME, {
    ids: [target],
    with_vector: true,
  });

  let reversedVector = response[0].vector.map((x) => -x);

  response = await client.discoverPoints(process.env.QDRANT_COLLECTION_NAME, {
    limit: 1,
    context,
    target: reversedVector,
    with_vector: true,
    with_payload: true,
  });

  const itemA = response[0];

  reversedVector = itemA.vector.map((x) => -x);

  response = await client.discoverPoints(process.env.QDRANT_COLLECTION_NAME, {
    context,
    limit: 1,
    target: reversedVector,
    filter: {
      must_not: [{ has_id: [itemA.id] }],
    },
    with_payload: true,
  });

  const results = [parseResult(response[0]), parseResult(itemA)];
  return NextResponse.json(results);
}
