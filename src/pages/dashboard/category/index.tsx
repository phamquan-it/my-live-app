import CreateNewCategory from "@/components/DashBoard/Category/CreateNewCategory";
import UpdateCateggory from "@/components/DashBoard/Category/UpdateCategory";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { PAGE_SIZE } from "@/constants";
import axiosClient from "@/pages/api/axiosClient";
import _ from "lodash";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { text } from "stream/consumers";

const Page = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/categories/list", {
        params: {
          offset,
          limit,
          language: "en",
          keyword,
        },
      }),
    queryKey: ["category", pageIndex, keyword],
    placeholderData: (previousData) => previousData,
  });
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  // const [pageIndex, setPageIndex] = useState<number>(1);
  const t = useTranslations("general");
  const d = useTranslations("Dashboard");

  const columns: ColumnsType<any> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (text, record, index) => <>{pageIndex * 10 + (index + 1) - 10}</>,
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
      title: t("createat"),
      dataIndex: "createdAt",
      width: "100px",
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
      width: "150px",
      align: "center",
      render: (text, record) => (
        <>
          <ToastContainer />
          <div className="flex justify-center">
            <TableAction
              onEdit={() => {
                setTitle(`Edit`);
                setOpenModal(true);
                setModalContent(<UpdateCateggory />);
              }}
              deleteAPI={{
                deleteURL: "",
                params: {},
              }}
            />
          </div>
        </>
      ),
    },
  ];
  let searchCategory = _.debounce((e) => {
    setKeyword(e.target.value);
  }, 300);
  return (
    <>
      <Head>
        <title>Category</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
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
        <div className="my-4 py-5">
          <Title className="!text-gray-700 text-center">Category</Title>
        </div>
        <div className="flex justify-between my-2">
          <Input
            placeholder="Enter search..."
            style={{ width: "230px" }}
            onChange={searchCategory}
          />

          <Button
            type="primary"
            onClick={() => {
              setTitle(`Create`);
              setOpenModal(true);
              setModalContent(<CreateNewCategory />);
            }}
          >
            Create
          </Button>
        </div>

        <Table
          tableLayout="auto"
          loading={isFetching}
          onChange={(pagination: any) => {
            console.log(pagination);
            setPageIndex(pagination.current);
          }}
          pagination={{
            total: data?.data.total,
            pageSize: 10,
          }}
          dataSource={data?.data.data}
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
