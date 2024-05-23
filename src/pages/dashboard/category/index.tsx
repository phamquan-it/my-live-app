import { fundApi } from "@/API/fundApi";
import ServicePage from "@/components/PageComponents/ServicePage";
import axiosClient from "@/pages/api/axiosClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Modal, Spin, Table } from "antd";
import { useEffect } from "react";
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
              title: "No.",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Name",
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
              title: "Platform",
              dataIndex: "platform",
              key: "platform",
              render: (text, record) => <>{record.platform.name}</>,
            },
            {
              title: "DateCreated",
              dataIndex: "createdAt",
              key: "createdAt",
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
                  <Button type="default">
                    <DeleteOutlined className="!text-rose-700" />
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
