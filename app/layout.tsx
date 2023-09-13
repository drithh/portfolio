import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Pwa from "./Pwa";
const inter = Inter({
  variable: "--font-title",
});

/* eslint-disable @next/next/no-head-element */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Adriel Portfolio" />
        <meta name="language" content="en" />

        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <title>Portfolio</title>
      </head>
      <body>
        {children}
        <Pwa />
        <script
          async
          defer
          src="https://analytics.umami.is/script.js"
          data-website-id="37c6ea09-2eb8-4e44-abd5-71980ef5b207"
        ></script>
      </body>
    </html>
  );
}
