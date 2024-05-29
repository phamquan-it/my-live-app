import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import { useRouter } from "next/router";
import Home from "@/components/PageComponents/HomePage";
import CardStream from "@/components/Client/CardStream";
import { Collapse } from "antd";
import CustomerCard from "@/components/Client/CustomerCard";
import LinkList from "@/components/Footer/LinkList";
import FAQ from "@/components/Home/FAQ";
import LivePaid from "@/components/Client/LivePaid";
import HeaderApp from "@/components/Header/Header";
import FollowUs from "@/components/Footer/FollowUs";
import StartADS from "@/components/Contents/StartADS";
import LastADS from "@/components/Client/LastADS";
import FooterApp from "@/components/Footer/FooterApp";
import cardStreamData from "@/components/Contents/HomeCpns/cardStreamData";
import Title from "antd/es/typography/Title";
export default function Index() {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  const router = useRouter();
  const t = useTranslations("Index");
  return (
    // <PageLayout title={t('title')}>
    //   {/* <p>{t('description')}</p>
    //   <LocaleSwitcher />
    //   <Button onClick={()=>{
    //     router.push("/Auth/Login")
    //   }}>{t('login')}</Button>
    //   <Button type='primary' onClick={()=>{
    //     router.push("/Auth/Register")
    //   }}>{t('register')}</Button>
    //   <LanguageChoose/> */}
    //   <Home/>
    // </PageLayout>
    <div className="relative">
      {/* <Home/> */}
      <div className="sm:shadow">
        <HeaderApp />
      </div>
      <StartADS
        images={[
          "https://cdn.tgdd.vn/hoi-dap/1356493/instagram-la-gi-instagram-co-diem-gi-khac-biet-so-voi-5-800x480.jpg",
          "https://vtv1.mediacdn.vn/zoom/640_400/562122370168008704/2023/11/5/photo1699160833418-1699160833657707598475.jpg",
          "https://c8.alamy.com/comp/2RFNWXY/x-twitter-live-video-feature-announcing-by-elon-musk-2RFNWXY.jpg",
        ]}
      />
      {/* <LastADS /> */}
      <div className="container m-auto my-7">
        <Title className="!text-gray-700 !font-thin text-center">
          Unmatched Features for Dynamic Live Streaming{" "}
        </Title>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-3 sm-auto">
          {cardStreamData.map((item) => (
            <>
              <CardStream
                image_link={item.image_link}
                access_link={item.access_link}
                content={item.content}
                title={item.title}
              />
            </>
          ))}
        </div>
        <div className="flex justify-end pt-4 pe-2">
          <div className="group">
            <button className="btn bg-pink-600 px-5 py-2 rounded-full shadow text-slate-100 text-sm group-hover:-translate-y-1 group-hover:bg-pink-500">
              Stream now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-pink-200 py-5">
        <div className="container m-auto my-7 ">
          <Title className="!text-gray-700 !text-center !font-thin">
            Why customer love us?
          </Title>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 mx-3 sm:auto">
            <div>
              <CustomerCard
                comment="“Yourapp Live is the easiest to use, plug-and-play platform for live streaming. And the scalability is incredible.”"
                customerName="Jamie Matos"
                jobName="Founder, Evolt"
                image={
                  "https://assets.onestream.live/webassets/website-new/graphics/testimonials/Jamie.webp"
                }
              />
            </div>
            <div>
              <CustomerCard
                comment="“Yourapp Live is the easiest to use, plug-and-play platform for live streaming. And the scalability is incredible.”"
                customerName="Jamie Matos"
                jobName="Founder, Evolt"
                image={
                  "https://assets.onestream.live/webassets/website-new/graphics/testimonials/Jamie.webp"
                }
              />
            </div>
            <div>
              <CustomerCard
                comment="“Yourapp Live is the easiest to use, plug-and-play platform for live streaming. And the scalability is incredible.”"
                customerName="Jamie Matos"
                jobName="Founder, Evolt"
                image={
                  "https://assets.onestream.live/webassets/website-new/graphics/testimonials/Jamie.webp"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <LivePaid
            liveBillMethod="free"
            livePaidName="Free"
            livePaidTime="month"
            liveServiceCharge="0"
            liveServiceDetail={[
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
                goto: true,
              },
            ]}
          />
          <LivePaid
            liveBillMethod="free"
            livePaidName="Free"
            livePaidTime="month"
            liveServiceCharge="0"
            liveServiceDetail={[
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
                goto: true,
              },
            ]}
          />
          <LivePaid
            liveBillMethod="free"
            livePaidName="Free"
            livePaidTime="month"
            liveServiceCharge="0"
            liveServiceDetail={[
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
                goto: true,
              },
            ]}
          />
          <LivePaid
            liveBillMethod="free"
            livePaidName="Free"
            livePaidTime="month"
            liveServiceCharge="0"
            liveServiceDetail={[
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
              },
              {
                info: "2 multistreaming destinations",
                goto: true,
              },
            ]}
          />
        </div>
      </div>

      {/* <FollowUs /> */}
      <div className="container m-auto py-3 border-b">
        <div className="w-1/2 m-auto">
          <FAQ
            questions={[
              { question: "how are you?", answer: "i'm fine, thankyou" },
              { question: "how old are you?", answer: "i'm not 18 yet" },
            ]}
          />
        </div>
      </div>
      <FooterApp />
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
