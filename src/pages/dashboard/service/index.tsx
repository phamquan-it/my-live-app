import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServiceData from "@/components/DashBoard/Service/Entities/ServiceData";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Button, Input, Modal, Table } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { EditOutlined, StarFilled } from "@ant-design/icons";
import UpdateForm from "@/components/DashBoard/Service/UpdateForm";
import RoleSelect from "@/components/Client/Role";
import { useFormatter } from "next-intl";
import TextArea from "antd/lib/input/TextArea";
import TableAction from "@/components/DashBoard/components/TableAction";

export default function Index() {
  const format = useFormatter();
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
        results.push({ service: { name: item.name } });
        item.serviceCategories.map((service: any) => {
          // console.log(service);
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

  const [pageIndex, setPageIndex] = useState(1);
  const columns: any[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any, index: number) => {
        record.key = index;
        if (record.id != undefined) index--;
        return (
          <>{record.id != undefined ? pageIndex * 10 + (index + 1) - 10 : ""}</>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "service",
      key: "service",
      render: (text: string, record: any) => <>{record.service.name}</>,
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: string, record: any) => <>{record.service.rate}</>,
    },
    {
      title: "initial_rate",
      dataIndex: "initial_rate",
      key: "initial_rate",
      render: (text: string, record: any) => <>{record.service.initial_rate}</>,
    },
    {
      title: "min",
      dataIndex: "min",
      key: "min",
      align: "right",
      render: (text: string, record: any) => (
        <>
          {!Number.isNaN(record.service.min)
            ? ""
            : format.number(parseFloat(record.service.min), {
                style: "currency",
                currency: "USD",
              })}
        </>
      ),
    },
    {
      title: "max",
      dataIndex: "max",
      key: "max",
      render: (text: string, record: any) => <>{record.service.max}</>,
      align: "right",
    },
    {
      title: "level",
      dataIndex: "level",
      align: "center",
      key: "level",
      render: (tex: string, record: any) => (
        <>
          {record.service.level}
          {record.service.level != undefined ? (
            <StarFilled className="!text-orange-300" />
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "rate_config",
      dataIndex: "rate_config",
      key: "rate_config",
      align: "right",
      render: (text: string, record: any) => <>{record.service.rate_config}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "Action",
      align: "center",
      render: (text: string, record: any) => (
        <>
          <div className="flex justify-center">
            {record.service.level != undefined ? (
              <TableAction
                deleteAPI={{
                  deleteURL: "",
                  params: {},
                }}
              />
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
  ];
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editServideID, setEditServideID] = useState<number>(0);
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

          <>
            <Modal
              title=""
              open={showPopup}
              footer={null}
              onCancel={() => setShowPopup(false)}
            >
              {editServideID}
              <UpdateForm id={editServideID} />
            </Modal>

            <div className="flex">
              <div className="py-3 w-1/5">
                <Input placeholder="Search..." />
              </div>
              <div className="py-3 w-1/5 ms-3">
                <RoleSelect
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </div>

            <Table
              dataSource={seriveData.data}
              columns={columns}
              expandable={{
                expandedRowRender: (record: any) => (
                  <TextArea
                    value={record.service.description_en}
                    readOnly
                    autoSize
                  />
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              pagination={{
                position: ["bottomCenter"],
                defaultCurrent: 1,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={(pagination: any) => {
                setPageIndex(pagination.current);
              }}
            />
          </>
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
