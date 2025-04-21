import type { Metadata } from "next";
import "./globals.css";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Diggraph Anime",
  description: "Explore anime as a graph - search related ones, discover connections.",
};

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children}) => (
  <html lang="ja">
    <body>
      {children}
    </body>
  </html>
)

export default RootLayout;