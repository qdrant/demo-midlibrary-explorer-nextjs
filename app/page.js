"use client";

import React, { useContext } from "react";
import ChoiceScreen from "@/components/ChoiceScreen/ChoiceScreen.jsx";
import ExploreScreen from "@/components/ExploreScreen/ExploreScreen.jsx";
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
    searchSimilar,
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
      <Header />
      <Box component={"main"}>
        <ChoiceScreen
          exploreItems={exploreItems}
          likeItem={likeItem}
          leftItem={leftItem}
          rightItem={rightItem}
          searchSimilar={searchSimilarWithNavigate}
          skipPair={skipPair}
          resetContext={resetContext}
          context={context}
        />
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
