import { globalStyles } from "@/styles/global ";
import type { AppProps } from "next/app";

// import logoImg from "../assets/Logo.svg";
import logoImg from "../assets/Logo.svg";
import { Container, Header } from "@/styles/pages/app";

import Image from "next/image";
import Link from "next/link";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Link href={`/`}>
          <Image src={logoImg} alt="" priority={true} />
        </Link>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
