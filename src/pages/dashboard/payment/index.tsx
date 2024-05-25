import { GetStaticPropsContext } from "next";

const Payment = () => {
  return <></>;
};
export default Payment;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
