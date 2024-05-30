import UserData from "@/DataType/UseDataType";
import { ReactNode, useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import UserType from "@/DataType/UserType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Button, Input, Modal, Switch, Table } from "antd";
import Role from "@/components/Client/Role";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import TableAction from "@/components/DashBoard/components/TableAction";
import dayjs from "dayjs";
import CreateNewUser from "@/components/DashBoard/User/CreateNewUser";
import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import UpdateUser from "@/components/DashBoard/User/UpdateUser";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "@/constants";
export default function Index() {
  const router = useRouter();
  // const [userData, setUserData] = useState<UserType[]>([]);
  // const queryClient = useQueryClient();
  // //mutation get user
  // const userMutation = useMutation({
  //   mutationFn: (params) =>
  //     axiosClient.get("/user/list?language=en", { params }),
  //   onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  // //mutation get role to combobox
  // function fetUser(params: any) {
  //   userMutation.mutate(params);
  // }
  // useEffect(() => {
  //   fetUser({
  //     limit: 10,
  //     offset: 0,
  //   });
  // }, []);

  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/user/list?language=en", {
        params: {
          offset,
          limit,
        },
      }),
    queryKey: ["User", pageIndex],
    placeholderData: (previousData) => previousData,
  });
  const t = useTranslations("general");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [title, setTitle] = useState<string>("");
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div className="">
      <Head>
        <title>User</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <ServicePage>
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
          <div className="py-3">
            <Button
              type="primary"
              onClick={() => {
                setTitle("Create new user");
                setModalContent(<CreateNewUser />);
                setShowModal(true);
              }}
            >
              Create new user
            </Button>
          </div>
          <Modal
            title={title}
            open={showModal}
            footer={null}
            onCancel={hideModal}
          >
            {modalContent}
          </Modal>

          <Table
            loading={isFetching}
            dataSource={data?.data.data}
            columns={[
              {
                title: "No.",
                dataIndex: "entryno",
                render: (text, record, index) => (
                  <>{pageIndex * 10 + (index + 1) - 10}</>
                ),
              },
              {
                title: t("name"),
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: t("isactive"),
                dataIndex: "isActive",
                key: "isActive",
                render: (text) => (
                  <Switch defaultChecked={text == 1 ? true : false} />
                ),
              },
              {
                title: t("createat"),
                dataIndex: "createdAt",
                key: "createdAt",
                render: (text) => (
                  <>
                    {router.locale == "vi"
                      ? dayjs(text).format("DD/MM/YYYY")
                      : dayjs(text).format("YYYY/MM/DD")}
                  </>
                ),
              },
              {
                title: t("fund"),
                dataIndex: "funds",
                key: "funds",
              },
              {
                title: t("totalmoney"),
                dataIndex: "total_money",
                key: "total_money",
              },
              {
                title: t("role"),
                dataIndex: "role",
                key: "role",
              },
              {
                title: t("action"),
                dataIndex: "id",
                key: "id",
                render: (text, record) => {
                  return (
                    <>
                      <TableAction
                        onEdit={() => {
                          setTitle("Update user");
                          setModalContent(<UpdateUser />);
                          setShowModal(true);
                        }}
                        deleteAPI={{
                          deleteURL: "",
                          params: {},
                        }}
                      />
                    </>
                  );
                },
              },
            ]}
            pagination={{
              // position: ["bottomCenter"],
              total: data?.data.total,
              defaultCurrent: 1,
              // showSizeChanger: true,
              // showQuickJumper: true,
            }}
            onChange={(pagination: any, filter, sort) => {
              setPageIndex(pagination.current);
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
