import ServicePage from "@/components/PageComponents/ServicePage";
import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
const dataSource = [
  {
    id: 987,
    name: "dfgdfg",
    email: "pmqua123n@gmail.com",
    idUser: "6df26ed0-65c7-4392-92ce-5607cc1a07cc",
    method: "POST",
    action: "Login",
    message: "Login:<br/><br/>- Tên: dfgdfg<br/>- Email: pmqua123n@gmail.com ",
    createdAt: "2024-05-30T01:46:53.000Z",
    deleteAt: "2024-07-29T01:46:53.000Z",
  },
  {
    id: 986,
    name: "pham quan",
    email: "pmquan@gmail.com",
    idUser: "5f0394f9-494a-4e46-b2a6-8ac63623109e",
    method: "POST",
    action: "Login",
    message: "Login:<br/><br/>- Tên: pham quan<br/>- Email: pmquan@gmail.com ",
    createdAt: "2024-05-30T01:45:06.000Z",
    deleteAt: "2024-07-29T01:45:07.000Z",
  },
];

const columns = [
  {
    title: "No.",
    dataIndex: "id",
    key: "id",
    render: (text: string, record: any, index: number) => (
      <>{1 * 10 + (index + 1) - 10}</>
    ),
  },
  {
    title: "Name.",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    render: (text: string) => (
      <Tag color={text == "POST" ? "orange" : "purple"}>{text}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Create At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>,
  },
];
const Page = () => {
  return (
    <>
      <ServicePage>
        <Table dataSource={dataSource} columns={columns} />
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
