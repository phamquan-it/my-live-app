import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserType from "@/DataType/UserType";
import UserTable from "@/components/DashBoard/User/UserTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { token } from "../Auth/token";
import ServicePage from "@/components/PageComponents/ServicePage";

export default function Index() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: () =>
      axiosClient.get("/user/list?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: UserType[] = [];
      data.data.data.map((item: any) => {
        const itemData: UserType = {
          key: item.id,
          id: item.id,
          name: item.name,
          email: item.email,
          type: item.type,
          ratio: item.ratio,
          isActive: item.isActive,
          roleId: item.roleId,
          createdAt: item.createdAt,
          funds: item.funds,
          total_money: item.total_money,
          role: {
            id: item.role.id,
            name: item.role.name,
          },
        };
        results.push(itemData);
        setUserData(results);
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
        <ServicePage>
          <UserTable
            data={userData}
            total={42}
            onChange={(pagination, filter, sort) => {
              // fetchData(
              //   pagination.current * pagination.pageSize - pagination.pageSize,
              //   pagination.current * pagination.pageSize
              // );
              // console.log(users);
            }}
          />
        </ServicePage>
      </div>
    </div>
  );
}
