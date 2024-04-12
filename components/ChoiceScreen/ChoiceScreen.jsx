import React from "react";
import PropTypes from "prop-types";
import PairChoice from "@/components/ChoiceScreen/PairChoice.jsx";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import InfoDialog from "@/components/InfoDialog.jsx";

const ChoiceScreen = ({
  exploreItems,
  likeItem,
  leftItem,
  rightItem,
  searchSimilar,
  skipPair,
  resetContext,
  context,
}) => {
  const info = {
    title: "Exploring",
    text: "The images below are selected based on your previous choices. More pairs you review, more precise the selection will be. You can always reset the context to start over.",
  };

  return (
    <Box id={"pair-choice"} component={"section"}>
      <PairChoice
        likeItem={likeItem}
        leftItem={leftItem}
        rightItem={rightItem}
        searchSimilar={searchSimilar}
        skipPair={skipPair}
        resetContext={resetContext}
        context={context}
      />
      <Box sx={{ textAlign: "center", mb: 10, minHeight: "14px" }}>
        {exploreItems.length > 0 && (
          <Box
            sx={{
              display: "inline-flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                document
                  .getElementById("explore")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              See Results <ArrowDownward />
            </Button>
            <InfoDialog
              content={info}
              sx={{ position: "absolute", right: -30 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

ChoiceScreen.propTypes = {
  exploreItems: PropTypes.array.isRequired,
  likeItem: PropTypes.func.isRequired,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
  searchSimilar: PropTypes.func.isRequired,
  skipPair: PropTypes.func.isRequired,
  resetContext: PropTypes.func.isRequired,
  context: PropTypes.array,
};

export default ChoiceScreen;
