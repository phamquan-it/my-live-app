import UserData from "@/DataType/UseDataType";
import UserType from "@/DataType/UserType";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateUser from "./UpdateModal";
const User: React.FC<UserData> = ({ data, total, onChange }) => {
  const [openUpdatePopup, setOpenUpdatePopup] = useState<boolean>(false);
  const [userUpdateId, setUserUpdateId] = useState<string>("");

  return (
    <>
      <div className="flex">
        <UpdateUser
          id_user={userUpdateId}
          openModal={openUpdatePopup}
          onCancel={() => {
            setOpenUpdatePopup(false);
          }}
          onOk={() => {
            setOpenUpdatePopup(false);
          }}
        />
      </div>

      <Table
        bordered
        dataSource={data}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Is Active",
            dataIndex: "isActive",
            key: "isActive",
          },
          {
            title: "RoleId",
            dataIndex: "roleId",
            key: "roleId",
          },
          {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
          },
          {
            title: "Funds",
            dataIndex: "funds",
            key: "funds",
          },
          {
            title: "Total money",
            dataIndex: "total_money",
            key: "total_money",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text, record: UserType) => {
              return (
                <>
                  <h1>{record.role.name}</h1>
                </>
              );
            },
          },
          {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (text, record) => {
              return (
                <>
                  <Button
                    type="default"
                    onClick={() => {
                      setUserUpdateId(record.id);
                      setOpenUpdatePopup(true);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                </>
              );
            },
          },
        ]}
        pagination={{
          position: ["bottomCenter"],
          total: total,
          defaultCurrent: 1,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        onChange={onChange}
      />
    </>
  );
};
export default User;
