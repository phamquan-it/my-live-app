import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserType from "@/DataType/UserType";
import OrderTable from "@/components/DashBoard/Order/OrderTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { OrderType } from "@/components/DashBoard/Order/Entity/OrderType";
import OrderData from "@/components/DashBoard/Order/Entity/OrderData";
import { token } from "../Auth/token";

export default function Index() {
  const [orders, setOrders] = useState<OrderData>({ data: [], total: 0 });
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: () =>
      axiosClient.get("order/list?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: OrderType[] = [];
      data.data.data.map((item: OrderType) => {
        item.key = item.id;
        results.push(item);
        setOrders({ data: results, total: data.data.total });
      });
    },
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
        <OrderTable
          data={orders.data}
          total={42}
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
