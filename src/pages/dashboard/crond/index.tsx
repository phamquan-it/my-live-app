import ServicePage from "@/components/PageComponents/ServicePage";
import { GetStaticPropsContext } from "next";

const Page = () => {
  return (
    <>
      <ServicePage>
        <h1>Cronsd</h1>
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
