import FastInfo from "@/components/DashBoard/components/General/FastInfo";
import FastInfoList from "@/components/DashBoard/components/General/FastInfoList";
import ServicePage from "@/components/PageComponents/ServicePage";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <h1>Hello admin</h1>
        <FastInfoList />
      </ServicePage>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
