import { fundApi } from "@/API/fundApi";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import axiosClient from "@/pages/api/axiosClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Modal, Spin, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: (iData) => {
      return axiosClient.get("/categories/list?language=en", {
        params: iData,
      });
    },
    onSuccess: () => {
      console.log(data);
    },
  });
  const handleFetch = (params: any) => {
    mutate(params);
  };
  useEffect(() => {
    handleFetch({
      keyword: "",
      limit: 10,
      offset: 0,
    });
  }, []);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const t = useTranslations("general");
  const d = useTranslations("Dashboard");
  return (
    <>
      <Head>
        <title>Category</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <p>{isPending ? "Loading..." : ""}</p>
        <Modal
          title={title}
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          footer={null}
        >
          {modalContent}
        </Modal>
        <DashBoardFilter
          search_placehoder="Search..."
          selectData={[{ children: <>123</>, key: "", value: "1" }]}
          onSearchChange={(e) => {
            console.log(e.target.value);
          }}
          onSelectChange={(value) => {
            console.log(value);
          }}
        />
        <Table
          onChange={() => {
            console.log(data?.data.total);

            handleFetch({
              keyword: "",
              limit: 10,
              offset: 0,
            });
          }}
          pagination={{
            total: data?.data.total,
            pageSize: 10,
          }}
          dataSource={data?.data.data}
          columns={[
            {
              title: "No.",
              dataIndex: "id",
              key: "id",
            },
            {
              title: t("name"),
              dataIndex: "name",
              key: "name",
              render: (text, record) => (
                <div className="flex items-center gap-2">
                  <Image width={25} height={25} src={record.icon} alt="image" />
                  {text}
                </div>
              ),
            },
            {
              title: d("platform"),
              dataIndex: "platform",
              key: "platform",
              render: (text, record) => <>{record.platform.name}</>,
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
                    onEdit={() => {
                      setTitle(`Edit`);
                      setOpenModal(true);
                      setModalContent(<></>);
                    }}
                    onDelete={() => {
                      setTitle(t("areyousure"));
                      setModalContent(
                        <ConfirmDelete
                          onAccept={() => {
                            alert("ok");
                          }}
                          onCancel={() => {
                            setOpenModal(false);
                          }}
                        />
                      );
                      setOpenModal(true);
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
