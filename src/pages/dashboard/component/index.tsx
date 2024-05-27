import DashBoardTable from "@/components/DashBoard/components/DashBoardTable";
import PlatformCreate from "@/components/DashBoard/components/Platform/Create";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

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
      render: (text: string, record: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              <EditOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <PlatformCreate />
    </>
  );
};
export default Page;
