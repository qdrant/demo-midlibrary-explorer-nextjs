import React from "react";
import PropTypes, { bool } from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Modal,
  Skeleton,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fullscreen } from "@mui/icons-material";
import Image from "next/image";

const ProminentTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.neutral[900],
    boxShadow: theme.shadows[1],
    fontSize: 18,
    padding: "10px",
  },
}));

const ImageCard = ({
  imgObject,
  onClick,
  sx,
  tooltip,
  showInfo,
  withActions,
}) => {
  const theme = useTheme();
  const [loaded, setLoaded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const actions = [
    {
      icon: <Fullscreen />,
      onClick: () => setModalOpen(true),
      tooltip: "Open full page",
    },
    ...(withActions?.length ? withActions : []),
  ];

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent", ...sx }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"auto"}
          sx={{ aspectRatio: "1/1", ...sx }}
        />
      )}
      <ProminentTooltip
        title={tooltip}
        followCursor
        disableInteractive={!tooltip}
      >
        <CardMedia
          component="img"
          image={imgObject?.image_url}
          onClick={onClick}
          onLoad={() => {
            setLoaded(true);
          }}
          sx={{
            opacity: loaded ? 1 : 0,
            width: "100%",
            height: loaded ? "auto" : 0,
            overflow: "hidden",
            objectFit: "contain",
            cursor: "pointer",
            "&:hover": {
              filter: "brightness(1.05)",
              transform: "scale(1.02)",
              transaction: "all 0.3s ease-in-out",
            },
            ...sx,
          }}
          alt={imgObject?.name || "Image represents some artist style"}
        />
      </ProminentTooltip>
      {showInfo && (
        <CardContent sx={{ textAlign: "center", px: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Tooltip title={"Open on MidLibrary"} placement={"top"} arrow>
              <Link
                href={imgObject?.page_url}
                target={"_blank"}
                rel={"noopener"}
                mr={-1}
                textAlign={"center"}
              >
                <Typography
                  variant={"h6"}
                  component={"span"}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  {imgObject?.name}
                </Typography>
              </Link>
            </Tooltip>
            {withActions && (
              <Box>
                {actions?.map((action) => (
                  <Tooltip
                    key={action.tooltip}
                    title={action.tooltip}
                    placement={"top"}
                    arrow
                  >
                    <IconButton onClick={action.onClick} color={"primary"}>
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Box>
        </CardContent>
      )}
      {withActions && imgObject?.image_url && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby={imgObject.name}
          aria-describedby="Full screen image modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          slotProps={{
            backdrop: {
              style: {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            },
          }}
        >
          <Image
            src={imgObject.image_url}
            alt={imgObject.name}
            width={500}
            height={500}
          />
        </Modal>
      )}
    </Card>
  );
};

ImageCard.propTypes = {
  imgObject: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
  tooltip: PropTypes.string,
  showInfo: PropTypes.bool,
  // if withActions is true, then default actions will be shown,
  // or you can pass an array of actions to add to the default ones
  // if not passed or false, no actions will be shown
  withActions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
        tooltip: PropTypes.string,
      }),
    ),
    PropTypes.bool,
  ]),
};

const ImageCardWithInfoOverlay = ({ imgObject, onClick, sx, tooltip }) => {
  const styles = {
    position: "relative",
    ".MuiCardContent-root": {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

  const onClickWithTitleIgnore = (e) => {
    if (e.target.className.match(/MuiCardContent-root/)) {
      return;
    }
    onClick();
  };

  return (
    <ImageCard
      imgObject={imgObject}
      onClick={onClickWithTitleIgnore}
      sx={{ ...styles, ...sx }}
      tooltip={tooltip}
      showInfo={true}
    />
  );
};

ImageCardWithInfoOverlay.propTypes = {
  imgObject: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
  tooltip: PropTypes.string,
};

export { ImageCard, ImageCardWithInfoOverlay };
