import ServicePage from "@/components/PageComponents/ServicePage";
import { Table } from "antd";
import { GetStaticPropsContext } from "next";

const History = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "i",
      key: "i",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "User create",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Id",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Payment method",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Content",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Amount(USD)",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rate",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Amount(VND)",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <ServicePage>
        <Table dataSource={dataSource} columns={columns} />
      </ServicePage>
    </>
  );
};
export default History;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
