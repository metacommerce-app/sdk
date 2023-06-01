import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import "@metacommerce-app/minting/styles.css";
import { MetacommerceProvider } from "@metacommerce-app/minting";
import "@services/wagmi";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Metacommerce SDK Playground</title>
      <meta name="title" content="Metacommerce SDK Playground" />
      <meta name="description" content="Metacommerce SDK Playground" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metacommerce.app/" />
      <meta property="og:title" content="Metacommerce" />
      <meta property="og:description" content="Metacommerce SDK Playground" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="Metacommerce" />
      <meta name="robots" content="noindex,nofollow" />
      <meta property="twitter:description" content="Metacommerce SDK Playground" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <MetacommerceProvider
      config={{
        API_KEY: "m3HEdd3gWp5nTD3z70Tt01WvOLbqOOX34kLebKe9",
        API_URL: "https://rest.dev.metacommerce.app/v1",
      }}
    >
      <Component {...pageProps} />
    </MetacommerceProvider>
  </>
);

export default MyApp as any;
