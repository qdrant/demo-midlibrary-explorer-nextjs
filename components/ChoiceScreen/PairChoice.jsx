import React from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ImageCard } from "../ImageCard.jsx";

const PairChoice = ({
  context,
  leftItem,
  rightItem,
  likeItem,
  searchSimilar,
  skipPair,
  resetContext,
  sx,
}) => {
  const cardStyles = { img: { maxHeight: "60vh" } };
  let theme = useTheme();
  const scrollComponentIntoView = () => {
    document
      .getElementById("pair-choice")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };
  async function likeLeft() {
    scrollComponentIntoView();
    await likeItem(leftItem);
  }

  async function likeRight() {
    scrollComponentIntoView();
    await likeItem(rightItem);
  }

  return (
    <Grid container sx={{ ...sx }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Box
          sx={{
            display: "flex",
            mb: 3,
            justifyContent: { xs: "space-between", md: "right" },
          }}
        >
          <Button
            variant={"outlined"}
            onClick={skipPair}
            sx={{ mr: 4, verticalAlign: "bottom" }}
          >
            Skip pair
          </Button>
          <Button variant={"text"} onClick={resetContext}>
            Reset context ({context?.length})
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mr: { xs: 1, md: 4 } }}>
            {leftItem && (
              <ImageCard
                imgObject={leftItem}
                onClick={likeLeft}
                tooltip={"More like this?"}
                sx={cardStyles}
                showInfo={true}
                withActions={[
                  {
                    icon: <Search />,
                    onClick: () => searchSimilar(leftItem),
                    tooltip: "Find similar",
                  },
                ]}
              />
            )}
          </Box>

          <Box>
            {rightItem && (
              <ImageCard
                imgObject={rightItem}
                onClick={likeRight}
                tooltip={"Or like this?"}
                sx={cardStyles}
                showInfo={true}
                withActions={[
                  {
                    icon: <Search />,
                    onClick: () => searchSimilar(rightItem),
                    tooltip: "Find similar",
                  },
                ]}
              />
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={1} md={3}></Grid>
    </Grid>
  );
};

PairChoice.propTypes = {
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
  likeItem: PropTypes.func.isRequired,
  searchSimilar: PropTypes.func.isRequired,
  skipPair: PropTypes.func.isRequired,
  resetContext: PropTypes.func.isRequired,
  context: PropTypes.array,
  sx: PropTypes.object,
};

export default PairChoice;
