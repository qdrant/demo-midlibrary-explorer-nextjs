import { QdrantClient } from '@qdrant/js-client-rest';

export async function sampleItems() {
  const response = await fetch("/api/sample");
  return await response.json();
}

export async function exploreRequest(context, limit = 18) {
  const response = await fetch("/api/explore", {
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify({
      "context": context,
      "limit": limit
    })
  })
  return await response.json()
}

export async function diversityRequest(context, target) {
  const response = await fetch("/api/diverse", {
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify({
      "context": context,
      "target": target
    })
  });
  return await response.json();
}


export async function searchRequest(item, seenIds, limit = 8) {

  const response = await fetch("/api/search", {
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify({
      "reference_id": item.id,
      "exclude_ids": seenIds,
      "limit": limit
    })
  });

  return await response.json();
}

export async function getItemByIdRequest(id) {

  const response = await fetch(`/api/items/${id}`);
  return await response.json();
}

export function getQdrantClient() {
  return new QdrantClient({ url: process.env.QDRANT_URL, apiKey: process.env.QDRANT_API_KEY });
}

export function parseResult(result) {
  const URL_PREFIX = "https://midlibrary.io/"

  return {
    id: result.id,
    image_url: result.payload["image_url"],
    page_url: new URL(result.payload["url"], URL_PREFIX).href,
    name: result.payload["name"],
  }
}