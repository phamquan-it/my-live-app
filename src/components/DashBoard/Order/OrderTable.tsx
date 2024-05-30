import UserData from "@/DataType/UseDataType";
import UserType from "@/DataType/UserType";
import { Input, Pagination, Select, Table } from "antd";
import dayjs from "dayjs";
import Role from "../../Client/Role";
import { OrderType } from "./Entity/OrderType";
import OrderData from "./Entity/OrderData";
import TableAction from "../components/TableAction";
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: OrderType) => JSX.Element;
}
const User: React.FC<OrderData> = ({ data, total, onChange }) => {
  const columns: Column[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Charge",
      dataIndex: "charge",
      key: "charge",
    },
    {
      title: "Start_count",
      dataIndex: "start_count",
      key: "start_count",
    },
    {
      title: "initial_charge",
      dataIndex: "initial_charge",
      key: "initial_charge",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "queue",
      dataIndex: "queue",
      key: "queue",
    },
    {
      title: "remains",
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: "currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "order_id",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "serviceId",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: "create_date",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <>
          <TableAction deleteAPI={{ deleteURL: "", params: {} }} />
        </>
      ),
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
