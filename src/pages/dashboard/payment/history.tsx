import { GetStaticPropsContext } from "next";

const History = () => {
  return <></>;
};
export default History;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
