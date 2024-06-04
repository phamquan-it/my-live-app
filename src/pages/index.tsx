interface serviceDatatype {
  key: number;
  id: number;
  name: string;
  icon: string;
  location: number;
  createAt: string;
  platformId: string;
  serviceCategoryId: number;
  serviceServiceId: number;
  categoriesId: number;
  serviceName: string;
  servicetype: string;
  servicemin: string;
  servicemax: string;
  servicedripfeed: string;
  servicerefill: string;
  servicecancel: string;
  servicelevel: number;
  servicedescription: string;
  servicerate_config: number;
}
const columns: TableColumnsType<serviceDatatype> = [
  {
    title: "Name",
    dataIndex: "serviceName",
    key: "id",
    render: (text, record, index) => (
      <div className="flex items-center gap-1">
        {!record.icon ? (
          ""
        ) : (
          <Image src={record.icon} width={20} preview={false} />
        )}
        {text}
      </div>
    ),
  },
  {
    title: "Level",
    dataIndex: "servicelevel",
    key: "servicelevel",
    render: (text) => (
      <>
        <div className="flex items-center">
          {!text ? (
            ""
          ) : (
            <>
              {text} &nbsp;
              <StarFilled className="!text-orange-400" />
            </>
          )}
        </div>
      </>
    ),
  },
  { title: "Min", dataIndex: "servicemin", key: "servicemin" },
  { title: "Max", dataIndex: "servicemax", key: "servicemax" },
  {
    title: "",
    dataIndex: "servicelevel",
    key: "servicelevel",
    render: (text, record, index) => (
      <>
        {!text ? (
          ""
        ) : (
          <>
            <Button type="primary">Buy</Button>
          </>
        )}
      </>
    ),
  },
];
const transformData = (input: any, locale: string) => {
  const {
    id: id,
    name: name,
    icon: icon,
    location: location,
    createdAt: createAt,
    platformId: platformId,
    serviceCategories,
  } = input;
  return serviceCategories.map((serviceCategory: any, index: number) => ({
    key: index,
    id,
    name: "" || null, // Ensure name is not undefined
    icon: "",
    location: location || null,
    createAt: createAt || null,
    platformId: platformId || null,
    serviceCategoryId: serviceCategory.id || null,
    serviceServiceId: serviceCategory.serviceId || null,
    categoriesId: serviceCategory.categoriesId || null,
    serviceName:
      locale === "en"
        ? serviceCategory?.service?.name || null
        : serviceCategory?.service?.name_vi || null,
    servicetype: serviceCategory?.service?.type || null,
    servicemin: serviceCategory?.service?.min || null,
    servicemax: serviceCategory?.service?.max || null,
    servicedripfeed: serviceCategory?.service?.dripfeed || null,
    servicerefill: serviceCategory?.service?.refill || null,
    servicecancel: serviceCategory?.service?.cancel || null,
    servicelevel: serviceCategory?.service?.level || null,
    servicedescription:
      locale === "en"
        ? serviceCategory?.service?.description_en || null
        : serviceCategory?.service?.description_vi || null,
    servicerate_config: serviceCategory?.service?.rate_config || null,
  }));
};
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getListServicePublic } from "@/API/sercviceApi";
import { useEffect, useState } from "react";
import { Button, Image, Layout, Select, Table, TableColumnsType } from "antd";
import TextArea from "antd/es/input/TextArea";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Footer, Header } from "antd/es/layout/layout";
import LanguageChoose from "@/components/Client/LocaleChoose";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import IndexFilter from "@/components/Client/IndexFilter";

import axiosClient from "./api/axiosClient";

type Repo = {
  message: string;
  total: number;
  data: any[];
};

export const getStaticProps: GetStaticProps<{
  services: any;
  repo: Repo;
  language: string;
  messages: any;
}> = async ({ locale }: GetStaticPropsContext) => {
  const res = await getListServicePublic({
    language: locale || "en",
    platformId: 1,
  });
  const platformsData = await axiosClient.get("/platform/list?language=en");
  const platforms = platformsData.data;

  const repo = res.data;

  const results: any[] = [];
  res.data.data.forEach((item: any, index: number) => {
    // results.push({
    //   icon: item.icon,
    //   serviceName: item.name,
    // });
    transformData(item, locale || "en").forEach(
      (service: serviceDatatype, index: number) => {
        if (service.serviceName != undefined || service.serviceName == "")
          results.push(service);
      }
    );
  });

  return {
    props: {
      services: results,
      repo,
      language: locale || "en",
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
};

// Example component using the props
const PageComponent = ({
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const [platforms, setPlatforms] = useState([]);
  // const platform = useQuery({
  //   queryFn: () => axiosClient.get("/platform/list?language=en"),
  //   queryKey: ["/platform/list"],
  // });
  // useEffect(() => {
  //   const results: any = [];
  //   platform.data?.data.data.map((item: any) => {
  //     results.push({
  //       value: item.id,
  //       label: (
  //         <>
  //           <div className="flex gap-1 items-center">
  //             <Image src={item.icon} alt="" width={20} />
  //             {item.name}
  //           </div>
  //         </>
  //       ),
  //     });
  //   });
  //   setPlatforms(results);
  // });

  return (
    <div>
      <div className="relative bg-slate-50">
        {/* <Home/> */}
        <Layout className="!bg-transparent">
          <div className="container m-auto">
            <Header className="!bg-transparent">
              <div className="flex justify-between items-center">
                <Image
                  preview={false}
                  width={200}
                  height={50}
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
                />
                <div className="flex gap-1">
                  <LanguageChoose />
                  <Button
                    type="primary"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    {t("login")}
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      router.push("/register");
                    }}
                  >
                    {t("register")}
                  </Button>
                </div>
              </div>
            </Header>
            <Content className="py-2">
              <Title level={2} className="!text-gray-800 text-center">
                Outstanding service
              </Title>
              <div>
                {/* <Select
                  showSearch
                  defaultValue={1}
                  options={platforms}
                  style={{ width: 200 }}
                  se
                  onSearch={(val) => {
                    console.log(val);
                  }}
                  onChange={(value) => {
                    console.log(value);
                  }}
                /> */}
              </div>
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <div className="px-5 py-2">
                        <TextArea
                          className="!bg-transparent"
                          value={record.servicedescription}
                          autoSize
                          readOnly
                        />
                      </div>
                    </>
                  ),
                  rowExpandable: (record) => {
                    return record.servicedescription != undefined;
                  },
                }}
                dataSource={services}
                pagination={{
                  // pageSize: pageSize,
                  position: ["bottomCenter"],
                }}
              />
            </Content>
          </div>
          <Footer>footer</Footer>
        </Layout>
      </div>
    </div>
  );
};

export default PageComponent;
