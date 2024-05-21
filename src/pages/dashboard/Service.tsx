import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserType from "@/DataType/UserType";
import OrderTable from "@/components/DashBoard/Order/OrderTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { OrderType } from "@/components/DashBoard/Order/Entity/OrderType";
import OrderData from "@/components/DashBoard/Order/Entity/OrderData";
import ServiceData from "@/components/DashBoard/Service/Entities/ServiceData";
import ServiceTable from "@/components/DashBoard/Service/ServiceTable";
import { ServiceType } from "@/components/DashBoard/Service/Entities/ServiceType";
import { token } from "../Auth/token";

export default function Index() {
  const [seriveData, setSeriveData] = useState<ServiceData>({
    data: [],
    total: 0,
  });
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: () =>
      axiosClient.get("/service/list?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results = [];
      let total = 0;
      data.data.data.map((item: any) => {
        item.serviceCategories.map((service: any) => {
          console.log(service);
          results.push(service);
          setSeriveData({ data: results, total });
        });
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
        <ServiceTable
          data={seriveData.data}
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
