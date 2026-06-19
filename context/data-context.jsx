"use client"

import { createContext, useEffect, useState } from 'react';
import { exploreRequest, sampleItems, searchRequest } from '@/helpers.js';
import _ from 'lodash';

export const DataContext = createContext({});

const STORAGE_KEY = 'midlib-context';

function loadFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(context, seenIds) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ context, seenIds }));
  } catch {
    // localStorage unavailable or full — silently skip
  }
}

export const DataContextProvider = () => {
  const saved = loadFromStorage();

  const [context, setContext] = useState(saved?.context ?? []);
  const [leftItem, setLeftItem] = useState(null);
  const [rightItem, setRightItem] = useState(null);
  const [seenIds, setSeenIds] = useState(saved?.seenIds ?? []);
  const [exploreItems, setExploreItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [searchByItem, setSearchByItem] = useState(null);

  const MAX_CONTEXT_SIZE = 32;
  const MAX_DISPLAY_SIZE = 16;

  // Persist context and seenIds whenever they change
  useEffect(() => {
    saveToStorage(context, seenIds);
  }, [context, seenIds]);

  async function rollItem() {
    while (true) {
      const item = await sampleItems();
      if (seenIds.includes(item.id)) {
        continue;
      }
      return item;
    }
  }

  async function rollLeftItem() {
    const item = await rollItem();
    setLeftItem(item);
    setSeenIds((prev) => [...prev, item.id]);
  }

  async function rollRightItem() {
    const item = await rollItem();
    setRightItem(item);
    setSeenIds((prev) => [...prev, item.id]);
  }

  useEffect(() => {
    if (leftItem === null) {
      rollLeftItem();
    }
    if (rightItem === null) {
      rollRightItem();
    }
  }, []);

  async function likeItem(item) {
    let newContext = [...context];

    if (item.id != leftItem.id) {
      newContext.push({
        positive: item,
        negative: leftItem,
      });
    }

    if (item.id != rightItem.id) {
      newContext.push({
        positive: item,
        negative: rightItem,
      });
    }

    while (newContext.length > MAX_CONTEXT_SIZE) {
      newContext.shift();
    }

    setContext(newContext);

    let exploreItems = await exploreRequest(
      newContext.map((item) => {
        return { positive: item.positive.id, negative: item.negative.id };
      }),
    );

    setSeenIds((prev) => [...prev, item.id]);

    async function getNextItem() {
      if (context.length >= 3) {
        return exploreItems.shift();
      } else {
        return await rollItem();
      }
    }

    if (item.id !== leftItem.id && item.id !== rightItem.id) {
      setLeftItem(item);
      setRightItem(await getNextItem());
    } else {
      if (item.id !== leftItem.id) {
        setLeftItem(await getNextItem());
      }

      if (item.id !== rightItem.id) {
        setRightItem(await getNextItem());
      }
    }

    exploreItems = _.shuffle(exploreItems);

    if (exploreItems.length > MAX_DISPLAY_SIZE) {
      exploreItems = exploreItems.slice(0, MAX_DISPLAY_SIZE);
    }

    setExploreItems(exploreItems);
  }

  async function undoLast() {
    if (context.length === 0) return;
    const newContext = context.slice(0, -1);
    setContext(newContext);

    if (newContext.length > 0) {
      const items = await exploreRequest(
        newContext.map((c) => ({ positive: c.positive.id, negative: c.negative.id })),
      );
      setExploreItems(_.shuffle(items).slice(0, MAX_DISPLAY_SIZE));
    } else {
      setExploreItems([]);
    }
  }

  async function searchSimilar(item) {
    searchRequest(item, seenIds)
      .then((items) => {
        setSearchByItem(item);
        setSearchItems(items);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function textSearch(query) {
    try {
      const response = await fetch('/api/search-text', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query, limit: MAX_DISPLAY_SIZE + 2 }),
      });
      const items = await response.json();
      if (!items.length) return;

      // Seed the pair from top results, show the rest in explore
      setLeftItem(items[0]);
      setRightItem(items[1]);
      setSeenIds((prev) => [...prev, items[0].id, items[1].id]);
      setExploreItems(items.slice(2));
    } catch (err) {
      console.error('Text search failed:', err);
    }
  }

  async function skipPair() {
    setLeftItem(await rollItem());
    setRightItem(await rollItem());
  }

  async function resetContext() {
    setContext([]);
    setExploreItems([]);
    setSeenIds([]);
    setSearchItems([]);
    setSearchByItem(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    skipPair().catch((err) => {
      console.error(err);
    });
  }

  return {
    context,
    leftItem,
    rightItem,
    exploreItems,
    likeItem,
    undoLast,
    seenIds,
    searchItems,
    searchSimilar,
    textSearch,
    searchByItem,
    setSearchByItem,
    skipPair,
    resetContext,
  };
};
