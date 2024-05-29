import { fundApi } from "@/API/fundApi";
import CreateNewCategory from "@/components/DashBoard/Category/CreateNewCategory";
import UpdateCateggory from "@/components/DashBoard/Category/UpdateCategory";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { PAGE_SIZE } from "@/constants";
import axiosClient from "@/pages/api/axiosClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Modal, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
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

  // const { data, isPending, isError, mutate } = useMutation({
  //   mutationFn: (iData) => {
  //     return axiosClient.get("/categories/list?language=en", {
  //       params: iData,
  //     });
  //   },
  //   onSuccess: () => {
  //     console.log(data);
  //   },
  // });
  // const handleFetch = (params: any) => {
  //   mutate(params);
  // };
  // useEffect(() => {
  //   handleFetch({
  //     keyword: "",
  //     limit: 10,
  //     offset: 0,
  //   });
  // }, []);

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
    queryKey: ["", pageIndex, keyword],
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
          <ToastContainer />
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
        </>
      ),
    },
  ];

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
        <DashBoardFilter
          search_placehoder="Search..."
          selectData={[{ children: <>123</>, key: "", value: "1" }]}
          onSearchChange={(e) => {
            console.log(e.target.value);
            setKeyword(e.target.value);
          }}
          onSelectChange={(value) => {
            console.log(value);
          }}
        />
        <div className="py-3">
          <Button
            type="primary"
            onClick={() => {
              setTitle(`Create`);
              setOpenModal(true);
              setModalContent(<CreateNewCategory />);
            }}
          >
            Create new category
          </Button>
        </div>
        <Table
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
