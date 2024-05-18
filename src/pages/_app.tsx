import "@/styles/globals.css";
import {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import {NextIntlClientProvider} from 'next-intl';

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Vienna"
    >
      <NextNProgress />
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}