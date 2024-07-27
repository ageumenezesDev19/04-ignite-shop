import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const bodyStyle = {
    background: 'black',
    color: 'white'
  }

  return (
    <Html lang="en">
      <Head />
      <body style={bodyStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
