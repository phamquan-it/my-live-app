import { fundApi } from "@/API/fundApi";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import axiosClient from "@/pages/api/axiosClient";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Spin, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: (iData) => {
      return axiosClient.get("/refund-money/list?language=en", {
        params: iData,
      });
    },
  });
  const handleFetch = (params: any) => {
    mutate(params);
  };
  useEffect(() => {
    handleFetch({
      keyword: "a",
      limit: 10,
      offset: 0,
    });
  }, []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState<string>("");
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
        <p>{isPending ? "Loading..." : ""}</p>
        <Modal
          title={title}
          open={showModal}
          footer={null}
          onCancel={hideModal}
        >
          {modalContent}
        </Modal>

        <Table
          onChange={(pagination: any) => {
            console.log(data?.data.total);

            handleFetch({
              offset:
                pagination.current * pagination.pageSize - pagination.pageSize,
              limit: pagination.current * pagination.pageSize,
            });
          }}
          pagination={{
            total: data?.data.total,
            pageSize: 10,
          }}
          dataSource={data?.data.data}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
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
            },

            {
              title: t("action"),
              dataIndex: "action",
              key: "action",
              render: (text, record) => (
                <>
                  <TableAction
                    onDelete={() => {
                      setTitle("Are you sure?");
                      setModalContent(<ConfirmDelete />);
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
