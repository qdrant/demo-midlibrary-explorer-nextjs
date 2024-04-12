"use client";

import React, { useContext } from "react";
import { DataContext } from "@/context/data-context.jsx";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Results from "@/components/Results.jsx";
import { getItemByIdRequest } from "@/helpers.js";
import InfoDialog from "@/components/InfoDialog.jsx";
import { useRouter } from "next/navigation";

const Search = ({ params }) => {
  const { searchItems, searchSimilar, searchByItem } = useContext(DataContext);
  const router = useRouter();

  const info = {
    title: "Search by similar styles",
    text: "The images in this section are selected purely based on their similarity to the one image you have selected. This is the highest level of similarity and it doesn't take into account your previous choices",
  };

  if (!searchByItem) {
    getItemByIdRequest(params.id).then((item) => {
      searchSimilar(item);
    });
  }

  return (
    <Box component={"main"}>
      <AppBar position="fixed" color="background">
        <Toolbar>
          <IconButton
            variant="text"
            size="large"
            onClick={() => {
              router.push("/", {
                replace: true,
              });
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h1" mt={0.3} ml={1}>
            Similar to{" "}
            <Link href={searchByItem?.page_url} target="_blank">
              {searchByItem?.name}
            </Link>
          </Typography>
          <InfoDialog content={info} sx={{ ml: 2 }} />
        </Toolbar>
      </AppBar>
      {searchItems?.length ? (
        <Box mt={5}>
          <Results exploreItems={searchItems} likeItem={searchSimilar} />
          <Box pt={5}>
            <Divider />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Search;
