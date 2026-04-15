import { getQdrantClient, parseResult } from "@/helpers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Lazily loaded and cached across requests so the model is only downloaded once
let extractor = null;

async function getExtractor() {
  if (!extractor) {
    // Dynamic import keeps this out of the client bundle
    const { pipeline, env } = await import("@xenova/transformers");
    // Store models in the project's node_modules cache
    env.cacheDir = "./.cache/transformers";
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/clip-vit-base-patch32",
    );
  }
  return extractor;
}

export async function POST(request) {
  const { query, limit = 10 } = await request.json();

  if (!query?.trim()) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const extract = await getExtractor();
  // CLIP text embedding — normalized cosine vector
  const output = await extract(query, { pooling: "mean", normalize: true });
  const vector = Array.from(output.data);

  const client = getQdrantClient();
  const response = await client.search(process.env.QDRANT_COLLECTION_NAME, {
    vector,
    limit,
    with_payload: true,
  });

  return NextResponse.json(response.map(parseResult));
}
