import UserData from "@/DataType/UseDataType";
import UserType from "@/DataType/UserType";
import { Input, Pagination, Select, Table } from "antd";
import dayjs from "dayjs";
import Role from "../../Role";
import { ServiceType } from "./Entities/ServiceType";
import ServiceData from "./Entities/ServiceData";
import { text } from "stream/consumers";
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: ServiceType) => JSX.Element;
}
const ServiceTable: React.FC<ServiceData> = ({ data, total, onChange }) => {
  const columns: Column[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CategoryId",
      dataIndex: "categoriesId",
      key: "categoriesId",
    },
    {
      title: "Name",
      dataIndex: "service",
      key: "service",
      render: (text, record) => <>{record.service.name}</>,
    },
    {
      title: "type",
      dataIndex: "service",
      key: "service",
      render: (text, record: any) => <>{record.service.type}</>,
    },
    {
      title: "ratio",
      dataIndex: "ratio",
      key: "ratio",
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record: any) => <>{record.service.rate}</>,
    },
    {
      title: "initial_rate",
      dataIndex: "initial_rate",
      key: "initial_rate",
      render: (text, record: any) => <>{record.service.initial_rate}</>,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record: any) => <>{record.service.status}</>,
    },
    {
      title: "min",
      dataIndex: "min",
      key: "min",
      render: (text, record: any) => <>{record.service.min}</>,
    },
    {
      title: "max",
      dataIndex: "max",
      key: "max",
      render: (text, record: any) => <>{record.service.max}</>,
    },
    {
      title: "dripfeed",
      dataIndex: "dripfeed",
      key: "dripfeed",
      render: (text, record: any) => <>{record.service.dripfeed}</>,
    },
    {
      title: "refill",
      dataIndex: "refill",
      key: "refill",
      render: (text, record: any) => <>{record.service.refill}</>,
    },
    {
      title: "cancel",
      dataIndex: "cancel",
      key: "cancel",
      render: (text, record: any) => <>{record.service.cancel}</>,
    },
    {
      title: "level",
      dataIndex: "level",
      key: "level",
      render: (text, record: any) => <>{record.service.level}</>,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record: any) => {
        return <>{record.service.description_en}</>;
      },
    },
    {
      title: "providerId",
      dataIndex: "providerId",
      key: "providerId",
      render: (text, record: any) => <>{record.service.providerId}</>,
    },
    {
      title: "provider",
      dataIndex: "provider",
      key: "provider",
      render: (text, record: any) => <>{record.service.provider.name}</>,
    },
    {
      title: "rate_config",
      dataIndex: "rate_config",
      key: "rate_config",
      render: (text, record: any) => <>{record.service.rate_config}</>,
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
export default ServiceTable;
