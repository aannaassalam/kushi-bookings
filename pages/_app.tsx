import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Montserrat } from "next/font/google";
import React, { createContext, useContext, useState } from "react";
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

export type CartType = {
  date: string;
  sport: string;
  lanes: {
    lane_id: string;
    slots: string[];
    price: number;
    name: string;
    about: string;
  }[];
};

const CartContext = createContext<{
  cart?: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType | undefined>>;
}>({
  setCart: () => {}
});

export const useCartContext = () => useContext(CartContext);

export default function CustomApp({ Component, pageProps }: AppProps) {
  fixSSRLayout();
  const [cart, setCart] = useState<CartType>();

  return (
    <main className={montserrat.className}>
      {/* <SessionProvider session={pageProps.session}> */}
      <QueryClientProvider client={queryClient}>
        <EventListeners />
        <Toaster richColors position="bottom-left" />
        <ChakraProvider>
          <CartContext.Provider value={{ cart, setCart }}>
            <Component {...pageProps} />
          </CartContext.Provider>
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
