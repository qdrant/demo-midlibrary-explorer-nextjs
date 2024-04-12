import React from "react";
import PropTypes from "prop-types";
import { ImageCard } from "@/components/ImageCard.jsx";
import { Grid } from "@mui/material";

const Results = ({ exploreItems, likeItem }) => {
  return (
    <Grid container spacing={1}>
      {exploreItems.map((item) => (
        <Grid item xs={6} md={3} key={item.id + item.name}>
          <ImageCard
            imgObject={item}
            showInfo={true}
            onClick={() => likeItem(item)}
            alt={item.name}
            tooltip={"Find similar"}
            withActions={true}
            sx={{
              ".MuiCardContent-root": {
                py: 2,
                px: 0,
                textAlign: "left",
                fontSize: "0.5rem",
                a: {
                  display: "inline-block",
                },
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

Results.propTypes = {
  exploreItems: PropTypes.array.isRequired,
  likeItem: PropTypes.func.isRequired,
};

export default Results;
