import React from "react";
import PropTypes from "prop-types";
import Results from "@/components/Results.jsx";
import Box from "@mui/material/Box";

const ExploreScreen = ({ exploreItems, likeItem }) => {
  const ref = React.useRef(null);

  return (
    <Box
      id={"explore"}
      ref={ref}
      component={"section"}
      sx={{
        minHeight: ref.current ? ref.current.clientHeight : "auto",
        my: 10,
      }}
    >
      <Results exploreItems={exploreItems} likeItem={likeItem} />
    </Box>
  );
};

ExploreScreen.propTypes = {
  exploreItems: PropTypes.array.isRequired,
  likeItem: PropTypes.func.isRequired,
};

export default ExploreScreen;
