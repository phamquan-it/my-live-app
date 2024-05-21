import UserData from "@/DataType/UseDataType";
import UserType from "@/DataType/UserType";
import { Input, Pagination, Select, Table } from "antd";
import dayjs from "dayjs";
import Role from "../../Role";
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: UserType) => JSX.Element;
}
const User: React.FC<UserData> = ({ data, total, onChange }) => {
  const columns: Column[] = [
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
  ];
  return (
    <>
      <div className="flex">
        <div className="py-3 w-1/5">
          <Input placeholder="Search..." />
        </div>
        <div className="py-3 w-1/5 ms-3">
          <Role
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
      </div>

      <Table
        bordered
        dataSource={data}
        columns={columns}
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
