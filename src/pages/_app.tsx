import "@/styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { NextIntlClientProvider } from "next-intl";
import ReduxProvider from "@/redux/Provider";
import ReactQueryProvider from "@/react-query/ReactQueryProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Vienna"
    >
      <NextNProgress />
      <ReactQueryProvider>
        <ReduxProvider>
          <Component {...pageProps} />
        </ReduxProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
