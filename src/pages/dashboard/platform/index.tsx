import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import PlatformCreate from "@/components/DashBoard/components/Platform/Create";
import PlatformUpdate from "@/components/DashBoard/components/Platform/UpdatePlatform";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import axiosClient from "@/pages/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const t = useTranslations("general");
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("location"),
      dataIndex: "location",
      key: "location",
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
      render: (text: any, record: any) => {
        return (
          <TableAction
            showDetailBtn={false}
            onDelete={() => {
              setTitle("Are you sure?");
              setModalContent(
                <ConfirmDelete onCancel={hideModal} onAccept={() => {}} />
              );
              setShowModal(true);
            }}
            onEdit={() => {
              setTitle("Update Platform");
              setModalContent(<PlatformUpdate />);
              setShowModal(true);
            }}
          />
        );
      },
    },
  ];
  const { data, isError, isSuccess, mutate } = useMutation({
    mutationFn: () => axiosClient.get("/platform/list?language=en&offset=3"),
    onSuccess: (data) => {
      console.log(data.data.data);
    },
  });
  useEffect(() => {
    mutate();
  }, []);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState<string>("");
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Head>
        <title>Platform</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <DashBoardFilter selectData={[]} search_placehoder="Search..." />
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
              setTitle("Create Platform");
              setModalContent(<PlatformCreate />);
              setShowModal(true);
            }}
          >
            Create new platform
          </Button>
        </div>

        <Table
          dataSource={data?.data.data}
          className="border rounded"
          columns={columns}
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
