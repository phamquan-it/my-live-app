import UserData from "@/DataType/UseDataType";
import UserType from "@/DataType/UserType";
import { Button, Modal, Switch, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateUser from "./UpdateModal";
import TableAction from "../components/TableAction";
import { useTranslations } from "next-intl";
const User: React.FC<UserData> = ({ data, total, onChange }) => {
  const t = useTranslations("general");
  return (
    <>
      <div className="flex">
        <Modal title="" open={false}>
          adform
        </Modal>
      </div>

      <Table
        bordered
        dataSource={data}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: t("isactive"),
            dataIndex: "isActive",
            key: "isActive",
            render: (text) => (
              <Switch defaultChecked={text == 1 ? true : false} />
            ),
          },
          {
            title: t("createat"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => <>{dayjs(text).format("YYYY-MM-DD")}</>,
          },
          {
            title: t("fund"),
            dataIndex: "funds",
            key: "funds",
          },
          {
            title: t("totalmoney"),
            dataIndex: "total_money",
            key: "total_money",
          },
          {
            title: t("role"),
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
            title: t("action"),
            dataIndex: "id",
            key: "id",
            render: (text, record) => {
              return (
                <>
                  <TableAction onEdit={() => {}} onDelete={() => {}} />
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
