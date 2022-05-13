import type { AppProps } from "next/app";
import Head from "next/head";

import { theme } from "@/shared/infrastructure/theme/config";
import { ChakraProvider } from "@chakra-ui/react";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
