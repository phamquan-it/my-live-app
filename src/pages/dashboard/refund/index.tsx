import { fundApi } from "@/API/fundApi";
import CreateNewRefund from "@/components/DashBoard/Refund/CreateNewRefund";
import UpdateRefund from "@/components/DashBoard/Refund/UpdateRefund";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import PlatformUpdate from "@/components/DashBoard/components/Platform/UpdatePlatform";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { PAGE_SIZE } from "@/constants";
import axiosClient from "@/pages/api/axiosClient";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Spin, Table } from "antd";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/refund-money/list?language=en", {
        params: {
          offset,
          limit,
        },
      }),
    queryKey: ["Refund", pageIndex],
    placeholderData: (previousData) => previousData,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const hideModal = () => {
    setShowModal(false);
  };
  const t = useTranslations("general");
  return (
    <>
      <Head>
        <title>Refund</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <DashBoardFilter selectData={[]} search_placehoder={t("searchplh")} />
        <Modal
          title={title}
          open={showModal}
          footer={null}
          onCancel={hideModal}
        >
          {modalContent}
        </Modal>
        <div className="py-3">
          <Button
            type="primary"
            onClick={() => {
              setTitle("Create new refund");
              setModalContent(<CreateNewRefund />);
              setShowModal(true);
            }}
          >
            CreateNewRefund
          </Button>
        </div>
        <Table
          loading={isFetching}
          onChange={(pagination: any) => {
            console.log(data?.data.total);
            setPageIndex(pagination.current);
          }}
          pagination={{
            total: data?.data.total,
            pageSize: PAGE_SIZE,
          }}
          dataSource={data?.data.data}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
              render: (text: any, record: any, index: any) => (
                <>{pageIndex * 10 + (index + 1) - 10}</>
              ),
            },
            {
              title: t("mailUser"),
              dataIndex: "user",
              key: "user",
              render: (text: any, record: any) => (
                <>{record.order.user.email}</>
              ),
            },
            {
              title: t("service"),
              dataIndex: "service",
              key: "service",
              render: (text: any, record: any) => (
                <>{record.order.service.name}</>
              ),
            },
            {
              title: t("createat"),
              dataIndex: "createdAt",
              key: "createdAt",
              render: (text) => (
                <>
                  {router.locale == "vi"
                    ? dayjs(text).format("DD/MM/YYYY")
                    : dayjs(text).format("YYYY/MM/DD")}
                </>
              ),
            },

            {
              title: t("action"),
              dataIndex: "action",
              key: "action",
              render: (text, record) => (
                <>
                  <TableAction
                    deleteAPI={{
                      deleteURL: "refund/delete",
                      params: {},
                    }}
                    onEdit={() => {
                      setTitle("Update Refund");
                      setModalContent(<UpdateRefund />);
                      setShowModal(true);
                    }}
                  />
                </>
              ),
            },
          ]}
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
