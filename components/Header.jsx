import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link,
  InputBase,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Logo from "@/components/Logo.jsx";
import VercelLogo from "./VercelLogo";
import InfoDialog from "@/components/InfoDialog.jsx";

const Header = ({ onTextSearch }) => {
  const theme = useTheme();
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const info = {
    title: "What is this?",
    text: "This is a demo of Discovery Search powered by Qdrant vector similarity search engine. It demonstrates how you can use vector similarity search in a scenario, where it is hard to construct a search query.",
  };

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    try {
      await onTextSearch(query.trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppBar position="static" elevation={0} color={"transparent"}>
      <Toolbar disableGutters sx={{ justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>
            <Link
              href="https://qdrant.tech/"
              target="_blank"
              sx={{ m: "1.25rem 0" }}
            >
              <Logo />
            </Link>
            <Link
              href="https://nextjs.org//"
              target="_blank"
              sx={{ m: "1.25rem 0" }}
            >
              <VercelLogo />
            </Link>
          </span>

          <Typography
            variant="h5"
            component="h1"
            mb={2}
            sx={{
              display: "inline-flex",
              color: theme.palette.text.primary,
              alignItems: "center",
              position: "relative",
            }}
          >
            Midjourney Library Explorer
            <InfoDialog
              content={info}
              sx={{ position: "absolute", right: -30 }}
            />
          </Typography>
          <Typography
            variant="body1"
            component="p"
            align={"center"}
            sx={{ color: theme.palette.text.secondary }}
          >
            Discover <Link href="https://www.midjourney.com/">Midjourney</Link>{" "}
            art styles! Click left or right to choose which one is closer to
            what you are looking for.
            <br /> Explore styles matching your choice below.
          </Typography>

          {/* Text-to-image search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: { xs: "90vw", sm: 420 },
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <Search
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
            )}
            <InputBase
              placeholder='Search by style, e.g. "watercolor impressionism"'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              fullWidth
              sx={{ fontSize: "0.9rem" }}
              inputProps={{ "aria-label": "search styles by text" }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            Press Enter to jump to matching styles
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onTextSearch: PropTypes.func.isRequired,
};

export default Header;
