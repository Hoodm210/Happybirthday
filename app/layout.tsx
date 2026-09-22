import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Special Girl ❤️",
  description: "A little birthday surprise made with love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}