import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import UserType from "@/DataType/UserType";
import UserTable from "@/components/DashBoard/User/UserTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Input } from "antd";
import Role from "@/components/Role";

export default function Index() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const queryClient = useQueryClient();
  //mutation get user
  const userMutation = useMutation({
    mutationFn: (iData) => {
      return axiosClient.get("/user/list?language=en", {
        params: iData,
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: UserType[] = [];
      data.data.data.map((item: any) => {
        item.key = item.id;
        results.push(item);
        setUserData(results);
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //mutation get role to combobox
  useEffect(() => {
    return userMutation.mutate({});
  }, []);
  return (
    <div className="">
      <div>
        <ServicePage>
          {userMutation.isPending ? (
            <>Loading...</>
          ) : userMutation.isError ? (
            <>An error occured</>
          ) : (
            <></>
          )}
          <div className="flex">
            <div className="py-3 w-1/5">
              <Input
                placeholder="Search..."
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </div>
            <div className="py-3 w-1/5 ms-3">
              <Role
                onChange={(value) => {
                  console.log("form user: " + value);
                }}
              />
            </div>
          </div>
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
