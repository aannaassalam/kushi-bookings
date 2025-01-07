import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Montserrat } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}
const montserrat = Montserrat({ subsets: ["latin"] });
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      retry: 0
    }
  }
});

export default function CustomApp({ Component, pageProps }: AppProps) {
  fixSSRLayout();

  return (
    <main className={montserrat.className}>
      {/* <SessionProvider session={pageProps.session}> */}
      <QueryClientProvider client={queryClient}>
        <EventListeners />
        <Toaster richColors position="bottom-left" />
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
      {/* </SessionProvider> */}
    </main>
  );
}

CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });
  // // resetServerContext();
  const appProps = await App.getInitialProps(context);

  return { ...appProps };
};
