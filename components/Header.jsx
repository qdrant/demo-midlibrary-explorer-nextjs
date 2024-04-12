import React from "react";
import { AppBar, Toolbar, Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "@/components/Logo.jsx";
import VercelLogo from "./VercelLogo";
import InfoDialog from "@/components/InfoDialog.jsx";

const Header = () => {
  const theme = useTheme();

  const info = {
    title: "What is this?",
    text: "This is a demo of Discovery Search powered by Qdrant vector similatiry search engine. It demonstrates how you can use vector similarity search in a scenario, where it is hard to construct a search query.",
  };

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
