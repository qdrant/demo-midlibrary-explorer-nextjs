import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const InfoDialog = ({ content, sx = {}, onClose }) => {
  const [open, setOpen] = React.useState(false);
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
  return (
    <>
      <InfoOutlined
        fontSize={"small"}
        color={"info"}
        sx={{ cursor: "pointer", ...sx }}
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          typeof onClose === "function" && onClose();
        }}
        maxWidth={"md"}
        fullScreen={mediumScreen}
      >
        <DialogTitle variant={"h5"}>{content.title}</DialogTitle>
        <DialogContent>
          <Typography>{content.text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

InfoDialog.propTypes = {
  content: PropTypes.object.isRequired,
  sx: PropTypes.object,
  onClose: PropTypes.func,
};

export default InfoDialog;
