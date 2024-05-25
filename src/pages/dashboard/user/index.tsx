import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import UserType from "@/DataType/UserType";
import UserTable from "@/components/DashBoard/User/UserTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Input } from "antd";
import Role from "@/components/Role";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
export default function Index() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const queryClient = useQueryClient();
  //mutation get user
  const userMutation = useMutation({
    mutationFn: (params) =>
      axiosClient.get("/user/list?language=en", { params }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: (error) => {
      console.log(error);
    },
  });
  //mutation get role to combobox
  function fetUser(params: any) {
    userMutation.mutate(params);
  }
  useEffect(() => {
    fetUser({
      limit: 10,
      offset: 0,
    });
  }, []);
  const t = useTranslations("general");
  return (
    <div className="">
      <Head>
        <title>User</title>
        <link rel="icon" href="/logo.png" />
      </Head>
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
                placeholder={t("searchplh")}
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
            data={userMutation.data?.data.data}
            total={userMutation.data?.data.total}
            onChange={(pagination, filter, sort) => {
              fetUser({
                offset:
                  pagination.current * pagination.pageSize -
                  pagination.pageSize,
                limit: pagination.current * pagination.pageSize,
              });
              // console.log(users);
            }}
          />
        </ServicePage>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
