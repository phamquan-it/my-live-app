import UserData from "@/DataType/UseDataType";
import { ReactNode, useEffect, useState } from "react";

import UserType from "@/DataType/UserType";
import OrderTable from "@/components/DashBoard/Order/OrderTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { OrderType } from "@/components/DashBoard/Order/Entity/OrderType";
import OrderData from "@/components/DashBoard/Order/Entity/OrderData";
import { Button, Modal, Table, TablePaginationConfig } from "antd";
import axiosClient from "@/pages/api/axiosClient";
import ServicePage from "@/components/PageComponents/ServicePage";
import TableAction from "@/components/DashBoard/components/TableAction";
import Head from "next/head";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import UpdateOrder from "@/components/DashBoard/Order/UpdateOrder";
import CreateOrder from "@/components/DashBoard/Order/CreateOrder";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { text } from "stream/consumers";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;
const QUERY_KEY = "/order/list";

export default function Index() {
  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/order/list?language=en", {
        params: {
          offset,
          limit,
        },
      }),
    queryKey: [QUERY_KEY, pageIndex],
    placeholderData: (previousData) => previousData,
  });
  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);

  // const fetchOrder = (params: any) => {
  //   mutate(params);
  // };
  // useEffect(() => {
  //   fetchOrder({
  //     limit: 10,
  //     offset: 0,
  //   });
  // }, []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState("");
  const hideModal = () => {
    setShowModal(false);
  };
  const t = useTranslations("general");
  const router = useRouter();

  const onChange = (pagination: TablePaginationConfig) => {
    setPageIndex(pagination.current ?? 1);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any, index: number) => (
        <>{pageIndex * 10 + (index + 1) - 10}</>
      ),
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("remains"),
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: "OrderID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "ServiceId",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: t("createat"),
      dataIndex: "create_date",
      key: "create_date",
      render: (text: string) => (
        <>
          {router.locale == "vi"
            ? dayjs(text).format("DD/MM/YYYY")
            : dayjs(text).format("YYYY/MM/DD")}
        </>
      ),
    },
    {
      title: t("updateat"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => (
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
      render: (text: any, record: any) => {
        return (
          <TableAction
            deleteAPI={{
              deleteURL: "",
              params: {},
            }}
            showDetailBtn={false}
            onEdit={() => {
              setTitle("Update order");
              setModalContent(<UpdateOrder />);
              setShowModal(true);
            }}
          />
        );
      },
    },
  ];
  return (
    <>
      <Head>
        <title>Order</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <div className="">
          <div>
            <DashBoardFilter selectData={[]} search_placehoder="Search..." />
            <Modal
              footer={null}
              title={title}
              open={showModal}
              onCancel={() => {
                setShowModal(false);
              }}
            >
              <CreateOrder />
            </Modal>
            <Button
              onClick={() => {
                setTitle("Create new order");
                setModalContent(<CreateOrder />);
                setShowModal(true);
              }}
              type="primary"
            >
              Create new order
            </Button>
            <Table
              onChange={onChange}
              pagination={{
                pageSize: 10,
                total: data?.data.total,
              }}
              columns={columns}
              dataSource={data?.data.data}
              loading={isFetching}
            />
          </div>
        </div>
      </ServicePage>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
