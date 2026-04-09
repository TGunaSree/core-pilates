import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Core Atelier Pilates",
  description: "core artistry, in motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-full flex flex-col selection:bg-foreground selection:text-background transition-colors duration-500 ease-in-out">
        {children}
      </body>
    </html>
  );
}
