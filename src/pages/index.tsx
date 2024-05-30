import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import { useRouter } from "next/router";
import Home from "@/components/PageComponents/HomePage";
export default function Index() {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  const router = useRouter();
  const t = useTranslations("Index");
  return (
    <div className="relative">
      {/* <Home/> */}
      this is home page
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
