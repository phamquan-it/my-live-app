import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserType from "@/DataType/UserType";
import OrderTable from "@/components/DashBoard/Order/OrderTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { OrderType } from "@/components/DashBoard/Order/Entity/OrderType";
import OrderData from "@/components/DashBoard/Order/Entity/OrderData";
import { Table } from "antd";

export default function Index() {
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: () => axiosClient.get("order/list?language=en"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["order"] }),
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    userMutation.mutate();
  }, []);
  return (
    <div className="container m-auto">
      <div>
        {userMutation.isPending ? (
          <>Loading...</>
        ) : userMutation.isError ? (
          <>An error occured</>
        ) : (
          <>ok</>
        )}
        <Table
          columns={[
            {
              title: "Id",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Link",
              dataIndex: "link",
              key: "link",
            },
            {
              title: "Charge",
              dataIndex: "charge",
              key: "charge",
            },
            {
              title: "Start_count",
              dataIndex: "start_count",
              key: "start_count",
            },
            {
              title: "initial_charge",
              dataIndex: "initial_charge",
              key: "initial_charge",
            },
            {
              title: "quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "status",
              dataIndex: "status",
              key: "status",
            },
            {
              title: "queue",
              dataIndex: "queue",
              key: "queue",
            },
            {
              title: "remains",
              dataIndex: "remains",
              key: "remains",
            },
            {
              title: "currency",
              dataIndex: "currency",
              key: "currency",
            },
            {
              title: "order_id",
              dataIndex: "order_id",
              key: "order_id",
            },
            {
              title: "serviceId",
              dataIndex: "serviceId",
              key: "serviceId",
            },
            {
              title: "create_date",
              dataIndex: "create_date",
              key: "create_date",
            },
            {
              title: "updatedAt",
              dataIndex: "updatedAt",
              key: "updatedAt",
            },
            {
              title: "service",
              dataIndex: "service",
              key: "service",
            },
          ]}
          dataSource={userMutation.data?.data.data}
          onChange={(pagination, filter, sort) => {
            // fetchData(
            //   pagination.current * pagination.pageSize - pagination.pageSize,
            //   pagination.current * pagination.pageSize
            // );
            // console.log(users);
          }}
        />
      </div>
    </div>
  );
}
