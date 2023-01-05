import '../styles/style.css';
import { Inter } from '@next/font/google';

const inter = Inter({
  variable: '--font-title',
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

        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <title>Portfolio</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
