import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Providers from "@/app/providers";
import EmotionRegistry from "@/app/lib/registry";

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
        <EmotionRegistry>
          <Providers>
            <Navbar />
            <main
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                paddingTop: "64px",
              }}
            >
              {children}
            </main>
            <Footer />
          </Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}
