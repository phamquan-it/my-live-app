import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getListServicePublic } from "@/API/sercviceApi";
import { useEffect, useState } from "react";
import { Button, Image, Layout, Table, TableColumnsType } from "antd";
import TextArea from "antd/es/input/TextArea";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Footer, Header } from "antd/es/layout/layout";
import LanguageChoose from "@/components/Client/LocaleChoose";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import IndexFilter from "@/components/Client/IndexFilter";

type Repo = {
  message: string;
  total: number;
  data: any[];
};

export const getStaticProps = (async ({ locale }: GetStaticPropsContext) => {
  const res = await getListServicePublic({
    language: "en",
    platformId: 1,
    categoriesId: 14,
  });
  const repo = await res.data;
  return {
    props: {
      repo,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}) satisfies GetStaticProps<{
  repo: Repo;
}>;
interface serviceDatatype {
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
export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [service, setService] = useState(repo);
  const [serviceDataTransformed, setServiceDataTransformed] = useState<
    serviceDatatype[]
  >([]);
  const fetchListData = () => {
    const results: serviceDatatype[] = [];
    service.data.map((item: any) => {
      transformData(item).map((service: any) => {
        results.push(service);
        setServiceDataTransformed(results);
      });
    });
  };
  useEffect(() => {
    fetchListData();
  }, [service]);
  const columns: TableColumnsType<serviceDatatype> = [
    {
      title: "Name",
      dataIndex: "serviceName",
      key: "serviceName",
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
  const [locale, setLocale] = useState("vi");
  const router = useRouter();
  const t = useTranslations("Index");
  return (
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
                <LanguageChoose
                  onChange={(value: string) => {
                    router.push("/", "", { locale: value }).then(() => {
                      router.locale = router.locale == "en" ? "vi" : "en";
                      // fetchData();
                    });
                  }}
                />
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
              <IndexFilter categoryData={undefined} />
            </div>
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <>
                    <div className="px-5 py-2">
                      <TextArea
                        className="!bg-transparent"
                        // value={record.description}
                        autoSize
                        readOnly
                      />
                    </div>
                  </>
                ),
                rowExpandable: (record) => record.icon == "",
              }}
              dataSource={serviceDataTransformed}
              pagination={{
                // pageSize: pageSize,
                position: ["bottomCenter"],
              }}
              onChange={(pagination: any) => {
                // setPageSize(pagination.pageSize);
              }}
            />
          </Content>
        </div>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
}
const transformData = (input: any) => {
  const {
    id: id,
    name: name,
    icon: icon,
    location: location,
    createdAt: createAt,
    platformId: platformId,
    serviceCategories,
  } = input;
  return serviceCategories.map((serviceCategory: any) => ({
    id,
    name,
    icon,
    location,
    createAt,
    platformId,
    serviceCategoryId: serviceCategory.id,
    serviceServiceId: serviceCategory.serviceId,
    categoriesId: serviceCategory.categoriesId,
    serviceName: serviceCategory.service.name,
    servicetype: serviceCategory.service.type,
    servicemin: serviceCategory.service.min,
    servicemax: serviceCategory.service.max,
    servicedripfeed: serviceCategory.service.dripfeed,
    servicerefill: serviceCategory.service.refill,
    servicecancel: serviceCategory.service.cancel,
    servicelevel: serviceCategory.service.level,
    servicedescription: serviceCategory.service.description_en,
    servicerate_config: serviceCategory.service.rate_config,
  }));
};
