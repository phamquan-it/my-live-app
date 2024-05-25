import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("ErrorMessage");
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="flex items-center justify-center"
      >
        {t("notfound")}
      </div>
    </>
  );
}
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
