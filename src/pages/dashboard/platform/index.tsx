import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import PlatformCreate from "@/components/DashBoard/components/Platform/Create";
import PlatformUpdate from "@/components/DashBoard/components/Platform/UpdatePlatform";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { PAGE_SIZE } from "@/constants";
import axiosClient from "@/pages/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const t = useTranslations("general");
  const router = useRouter();
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any, index: any) => (
        <>{pageIndex * 10 + (index + 1) - 10}</>
      ),
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        dayjs(text).format(router.locale == "vi" ? "DD/MM/YYYY" : "YYYY/MM/DD"),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => {
        return (
          <TableAction
            deleteAPI={{
              deleteURL: "",
              params: {},
            }}
            showDetailBtn={false}
            onEdit={() => {}}
          />
        );
      },
    },
  ];
  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/platform/list?language=en", {
        params: {
          offset,
          limit,
        },
      }),
    queryKey: ["", pageIndex],
    placeholderData: (previousData) => previousData,
  });
  return (
    <>
      <Head>
        <title>Platform</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        {/* <DashBoardFilter selectData={[]} search_placehoder="Search..." /> */}

        <Table
          dataSource={data?.data.data}
          className="border rounded"
          columns={columns}
          loading={isLoading}
        />
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
