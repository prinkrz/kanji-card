import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Box from "@mui/material/Box";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import StyledComponentsRegistry from "@/app/lib/registry";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "漢字カード — Kanji Flashcards",
  description: "Study Japanese kanji with interactive flip cards showing readings and example compounds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Navbar />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                pt: "64px",
                minHeight: "100vh",
              }}
            >
              {children}
            </Box>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
