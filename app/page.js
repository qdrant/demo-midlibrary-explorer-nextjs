"use client";

import React, { useContext } from "react";
import ChoiceScreen from "@/components/ChoiceScreen/ChoiceScreen.jsx";
import ExploreScreen from "@/components/ExploreScreen/ExploreScreen.jsx";
import ContextScreen from "@/components/ContextScreen/ContextScreen.jsx";
import { DataContext } from "@/context/data-context.jsx";
import Header from "@/components/Header.jsx";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const {
    leftItem,
    rightItem,
    exploreItems,
    likeItem,
    undoLast,
    searchSimilar,
    textSearch,
    skipPair,
    resetContext,
    context,
  } = useContext(DataContext);
  const router = useRouter();
  const searchSimilarWithNavigate = (item) => {
    router.push("/search/" + item.id, {
      replace: true,
    });
    searchSimilar(item);
  };
  return (
    <>
      <Header onTextSearch={textSearch} />
      <Box component={"main"}>
        <ChoiceScreen
          exploreItems={exploreItems}
          likeItem={likeItem}
          leftItem={leftItem}
          rightItem={rightItem}
          searchSimilar={searchSimilarWithNavigate}
          skipPair={skipPair}
          undoLast={undoLast}
          resetContext={resetContext}
          context={context}
        />
        <ContextScreen context={context} />
        {exploreItems?.length ? (
          <ExploreScreen
            exploreItems={exploreItems}
            likeItem={searchSimilarWithNavigate}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default Home;
