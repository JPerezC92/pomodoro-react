import type { AppProps } from "next/app";
import { isClient } from "@/shared/infrastructure/utils/applicationSide";
import "styles/globals.css";

// if (isClient) {
//   import("@/shared/infrastructure/db/connection").then((a) => {
//     a.db.open();
//   });
// }

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
