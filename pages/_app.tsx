import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import dynamic from "next/dynamic";
import { Loader } from "components/loader";
import Loading from "components/loading";

const Nav = dynamic(() => import("components/Nav"), {
  loading: () => <Loader />,
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
      <Nav />
      <Component {...pageProps} />
      <Loading />
    </QueryClientProvider>
  );
}

export default MyApp;
