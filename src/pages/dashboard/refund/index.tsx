import { fundApi } from "@/API/fundApi";
import ServicePage from "@/components/PageComponents/ServicePage";
import axiosClient from "@/pages/api/axiosClient";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Spin, Table } from "antd";
import { useEffect } from "react";
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
  return (
    <>
      <ServicePage>
        <p>{isPending ? "Loading..." : ""}</p>
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
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Mail User",
              dataIndex: "user",
              key: "user",
              render: (text: any, record: any) => (
                <>{record.order.user.email}</>
              ),
            },
            {
              title: "Service",
              dataIndex: "service",
              key: "service",
              render: (text: any, record: any) => (
                <>{record.order.service.name}</>
              ),
            },
            {
              title: "CreatedAt",
              dataIndex: "createdAt",
              key: "createdAt",
            },
            {
              title: "OrderId",
              dataIndex: "orderId",
              key: "orderId",
            },
            {
              title: "Action",
              dataIndex: "action",
              key: "action",
              render: (text, record) => (
                <>
                  <Button type="default">
                    <EditOutlined />
                  </Button>
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
