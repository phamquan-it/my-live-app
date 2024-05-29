import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Table } from "antd";
import { GetStaticPropsContext } from "next";

const Page = () => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any, index: number) => {
        return (
          <TableAction
            deleteAPI={{ deleteURL: "", params: {} }}
            deleteAlert="If you comfirm, you can't restore!"
          />
        );
      },
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
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
