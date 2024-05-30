import ConfirmDelete from "@/components/DashBoard/components/ConfirmModalDelete";
import DashBoardFilter from "@/components/DashBoard/components/DashboardFilter";
import PlatformCreate from "@/components/DashBoard/components/Platform/Create";
import PlatformUpdate from "@/components/DashBoard/components/Platform/UpdatePlatform";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { PAGE_SIZE } from "@/constants";
import axiosClient from "@/pages/api/axiosClient";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Table,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { text } from "stream/consumers";

const Page = () => {
  const t = useTranslations("general");
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const columns: any[] = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (text: any, record: any, index: any) => (
        <>{pageIndex * 10 + (index + 1) - 10}</>
      ),
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => {
        console.log(record);

        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={record.icon} width={30} alt="" /> {text}
            </div>
          </>
        );
      },
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "200px",
      render: (text: string) =>
        dayjs(text).format(router.locale == "vi" ? "DD/MM/YYYY" : "YYYY/MM/DD"),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      width: "150px",
      align: "center",
      render: (text: any, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              deleteAPI={{
                deleteURL: "",
                params: {},
              }}
              showDetailBtn={false}
              onEdit={() => {}}
              editFormComponents=<>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label=""
                    name=""
                    wrapperCol={{ offset: 8, span: 16 }}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            />
          </div>
        );
      },
    },
  ];
  const [pageIndex, setPageIndex] = useState(1);

  const offset = (pageIndex - 1) * PAGE_SIZE;
  const limit = pageIndex * PAGE_SIZE;

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () =>
      axiosClient.get("/platform/list?language=en", {
        params: {
          offset,
          limit,
        },
      }),
    queryKey: ["", pageIndex],
    placeholderData: (previousData) => previousData,
  });
  return (
    <>
      <Head>
        <title>Platform</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        {/* <DashBoardFilter selectData={[]} search_placehoder="Search..." /> */}

        <Table
          dataSource={data?.data.data}
          className="border rounded"
          columns={columns}
          loading={isLoading}
        />
      </ServicePage>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
