import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import UserType from "@/DataType/UserType";
import OrderTable from "@/components/DashBoard/Order/OrderTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { OrderType } from "@/components/DashBoard/Order/Entity/OrderType";
import OrderData from "@/components/DashBoard/Order/Entity/OrderData";
import ServiceData from "@/components/DashBoard/Service/Entities/ServiceData";
import ServiceTable from "@/components/DashBoard/Service/ServiceTable";
import { ServiceType } from "@/components/DashBoard/Service/Entities/ServiceType";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Button, Modal } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";

export default function Index() {
  const [seriveData, setSeriveData] = useState<ServiceData>({
    data: [],
    total: 0,
  });
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: (params) =>
      axiosClient.get("/service/list?language=en", {
        params,
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: any = [];
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
  function fetchServiceData(params: any) {
    userMutation.mutate(params);
  }
  useEffect(() => {
    fetchServiceData({
      offset: 0,
      limit: 2,
    });
    console.log(userMutation);
  }, []);
  return (
    <div className="">
      <Head>
        <title>Service</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <div>
          {userMutation.isPending ? (
            <>Loading...</>
          ) : userMutation.isError ? (
            <>An error occured</>
          ) : (
            <></>
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
      </ServicePage>
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
