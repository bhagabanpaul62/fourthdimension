import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from "@/components/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fourth Dimension",
  description: "Professional Interior Design & Construction Services",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  other: {
    "msapplication-TileImage": "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg?v=3" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg?v=3" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg?v=3" />
        <meta name="msapplication-TileImage" content="/logo.jpg?v=3" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          <NavigationBar />
        </nav>
        {children}
      </body>
    </html>
  );
}
