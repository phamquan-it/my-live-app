import ServicePage from "@/components/PageComponents/ServicePage";
import Setting from "@/components/Setting";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <Setting />
      </ServicePage>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
