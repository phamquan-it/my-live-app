import { fundApi } from "@/API/fundApi";
import CreateNewRefund from "@/components/DashBoard/Refund/CreateNewRefund";
import UpdateRefund from "@/components/DashBoard/Refund/UpdateRefund";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import PlatformUpdate from "@/components/DashBoard/components/Platform/UpdatePlatform";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
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
        <p>{isPending ? "Loading..." : ""}</p>
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
                    onDelete={() => {
                      setTitle("Are you sure?");
                      setModalContent(<ConfirmDelete />);
                      setShowModal(true);
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
