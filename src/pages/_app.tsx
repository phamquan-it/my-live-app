import "@/styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { NextIntlClientProvider } from "next-intl";
import ReduxProvider from "@/redux/Provider";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "@/react-query/ReactQueryProvider";
import { ConfigProvider } from "antd";
import vi from "antd/locale/vi_VN";
import en from "antd/locale/en_US";
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
          <ConfigProvider locale={router.locale == "vi" ? vi : en}>
            <Component {...pageProps} />
          </ConfigProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
