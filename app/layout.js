"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { DataContext, DataContextProvider } from "@/context/data-context.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const mode = "dark";
  const appData = DataContextProvider();
  return (
    <html lang="en">
      <title>Midjourney Library Explorer</title>
      <meta
        name="description"
        content="Midjourney Library Explorer with Qdrant and NextJS"
      />
      <DataContext.Provider value={appData}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode,
            },
          })}
        >
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </DataContext.Provider>
    </html>
  );
}
