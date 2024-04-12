import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Context from "@/components/ContextScreen/Context.jsx";
import { Typography } from "@mui/material";

const ContextScreen = ({ context }) => {
  const ref = React.useRef(null);

  if (context.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 10 }} component={"section"}>
      <Typography variant={"h4"} component={"h2"} align={"center"} mb={5}>
        Context
      </Typography>
      <Box
        id="context"
        ref={ref}
        sx={{
          minHeight: ref.current ? ref.current.clientHeight : "auto",
        }}
      >
        <Context context={context} />
      </Box>
    </Box>
  );
};

ContextScreen.propTypes = {
  context: PropTypes.array.isRequired,
};

export default ContextScreen;
