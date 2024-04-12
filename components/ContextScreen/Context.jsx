import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper } from "@mui/material";
import { ImageCardWithInfoOverlay } from "@/components/ImageCard.jsx";

/**
 * @constructor
 * @param {[{positive: object, negative: object}]} context
 * @return {Element|null}
 */
const Context = ({ context }) => {
  const showInfo = (e) => {
    console.log(e.target);
  };

  const contextList = context.map((item) => {
    return (
      <Grid item xs={3} key={item.positive.id + "" + item.negative.id}>
        <Paper
          elevation={0}
          sx={{ display: "flex", justifyContent: "center", p: 1 }}
        >
          <ImageCardWithInfoOverlay
            imgObject={item.positive}
            onClick={showInfo}
            key={item.positive.id + Math.random()}
            sx={{
              a: {
                // todo: move colors to theme
                color: "#009999",
                textDecorationColor: "#009999",
              },
            }}
          />
          ,
          <ImageCardWithInfoOverlay
            imgObject={item.negative}
            onClick={showInfo}
            key={item.negative.id + Math.random()}
            sx={{
              a: {
                color: "#F5587F",
                textDecorationColor: "#F5587F",
              },
            }}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {contextList && contextList}
    </Grid>
  );
};

Context.propTypes = {
  context: PropTypes.array.isRequired,
};

export default Context;
