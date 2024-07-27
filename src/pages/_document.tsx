import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const bodyStyle = {
    background: 'black',
    color: 'white'
  }

  return (
    <Html lang="en">
      <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      <body style={bodyStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}