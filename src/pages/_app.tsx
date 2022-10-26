import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CenterContainer, MobileContainer } from "@/utils/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Xchange In B2B</title>
        <meta name="description" content="XBB B2B App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenterContainer>
        <MobileContainer>
          <Component {...pageProps} />
        </MobileContainer>
      </CenterContainer>
    </>
  );
}

export default MyApp;
