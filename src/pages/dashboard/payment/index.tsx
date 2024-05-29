import UpdateCateggory from "@/components/DashBoard/Category/UpdateCategory";
import ButtonFormModal from "@/components/DashBoard/components/General/ButtonFormModal";
import TableAction from "@/components/DashBoard/components/TableAction";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Button, Form, Input, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { ToastContainer } from "react-toastify";

const Payment = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Order ID",
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
      render: (text: string, record: any, index: number) => (
        <>
          <TableAction
            onEdit={() => {}}
            deleteAPI={{
              deleteURL: "",
              params: {},
            }}
          />
        </>
      ),
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
export default Payment;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
