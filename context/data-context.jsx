"use client"

import { createContext, useEffect, useState } from 'react';
import { exploreRequest, sampleItems, searchRequest, diversityRequest } from '@/helpers.js';
import _ from 'lodash';

export const DataContext = createContext({});

export const DataContextProvider = () => {
  const [context, setContext] = useState([]);
  const [leftItem, setLeftItem] = useState(null);
  const [rightItem, setRightItem] = useState(null);
  const [seenIds, setSeenIds] = useState([]);
  const [exploreItems, setExploreItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [searchByItem, setSearchByItem] = useState(null);

  const MAX_CONTEXT_SIZE = 32;
  const MAX_DISPLAY_SIZE = 16;

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
    seenIds.push(item.id);
    setSeenIds(seenIds);
  }

  async function rollRightItem() {
    const item = await rollItem();
    setRightItem(item);
    seenIds.push(item.id);
    setSeenIds(seenIds);
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

    async function diverseItems() {
      let diverseItems = await diversityRequest(newContext.map((contextItem) => {
        return {
          positive: contextItem.positive.id,
          negative: contextItem.negative.id
        };
      }), item.id);
      return diverseItems;
    }

    let exploreItems = await exploreRequest(
      newContext.map((item) => {
        return { positive: item.positive.id, negative: item.negative.id };
      }),
    );
    let searchItems = [];

    setSeenIds([...seenIds, item.id]);

    async function getNextItem() {
      // return exploreItems.shift();
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


    // if (context.length < 8) {
    //   let nextItems = await diverseItems();
    //   setLeftItem(nextItems[0]);
    //   setRightItem(nextItems[1]);
    // } else {
    //   let leftItem = exploreItems.shift();
    //   let rightItem = exploreItems.pop();
    //   setLeftItem(leftItem);
    //   setRightItem(rightItem);
    // }

    exploreItems = exploreItems.concat(searchItems);

    exploreItems = _.shuffle(exploreItems);

    if (exploreItems.length > MAX_DISPLAY_SIZE) {
      exploreItems = exploreItems.slice(0, MAX_DISPLAY_SIZE);
    }

    setExploreItems(exploreItems);
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
    seenIds,
    searchItems,
    searchSimilar,
    searchByItem,
    setSearchByItem,
    skipPair,
    resetContext,
  };
};
