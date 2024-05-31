import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import { useRouter } from "next/router";
import Home from "@/components/PageComponents/HomePage";
import { Button, Image, Layout, Table, TableColumnsType } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/es/layout/Sider";
import LanguageChoose from "@/components/Client/LocaleChoose";
import Title from "antd/lib/typography/Title";
import { getListServicePublic } from "@/API/sercviceApi";
import { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import IndexFilter from "@/components/Client/IndexFilter";
export default function Index() {
  const [locale, setLocale] = useState("vi");
  const router = useRouter();
  const t = useTranslations("Index");
  interface DataType {
    key: React.Key;
    id: number;
    icon: string;
    name: string;
    min: number;
    max: string;
    description: string;
    level: number;
    rate_config: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "level",
      key: "level",
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
    { title: "Min", dataIndex: "min", key: "min" },
    { title: "Max", dataIndex: "max", key: "max" },
    {
      title: "",
      dataIndex: "level",
      key: "level",
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
  const [data, setData] = useState<DataType[]>([]);
  const fetchData = () => {
    getListServicePublic({
      language: router.locale,
      platformId: 1,
    }).then((response) => {
      const results: any[] = [];
      response.data.data.map((category: any) => {
        results.push(category);
        category.serviceCategories.map((service: any) => {
          const serviceData: DataType = {
            key: service.id,
            id: service.id,
            name:
              router.locale == "en"
                ? service.service.name
                : service.service.name_vi,
            icon: "",
            min: service.service.min,
            max: service.service.max,
            description:
              router.locale == "en"
                ? service.service.description_en
                : service.service.description_vi,
            level: service.service.level,
            rate_config: service.service.rate_config,
          };
          console.log(service);

          results.push(serviceData);
          setData(results);
        });
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [pageSize, setPageSize] = useState(20);
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
                      fetchData();
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
                        value={record.description}
                        autoSize
                        readOnly
                      />
                    </div>
                  </>
                ),
                rowExpandable: (record) => record.icon == "",
              }}
              dataSource={data}
              pagination={{
                pageSize: pageSize,
                position: ["bottomCenter"],
              }}
              onChange={(pagination: any) => {
                setPageSize(pagination.pageSize);
              }}
            />
          </Content>
        </div>
        <Footer>footer</Footer>
      </Layout>
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
