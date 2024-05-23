import { ActionButton } from "@/components/ui/button";
import { AppTable, AppTableProps } from "@/components/ui/table";
import { USER_STATUS } from "@/enums";
import { formattedDate, getIndex } from "@/helpers";
import { OpenModalProps, useAuth, useTranslate } from "@/hooks";
import { TranslationKey } from "@/locales/flattenMessages";
import { Space, Switch } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { TYPE_MODAL_USER } from "../enums";
import { OnUpdateStatusUserType, UserData } from "../types";

type Props = {
  onUpdateStatusUser?: OnUpdateStatusUserType;
  openModal?: OpenModalProps<TYPE_MODAL_USER, UserData>;
  pagination: Pick<TablePaginationConfig, "pageSize" | "current">;
} & AppTableProps<UserData>;

function UserTable({ onUpdateStatusUser, openModal, ...props }: Props) {
  const { messages } = useTranslate();
  //   const { getPermissionRoute } = usePermission();
  //   const { canUpdate } = getPermissionRoute();
  const canUpdate = true;
  const {
    role: { isAdmin },
  } = useAuth();

  const columns: ColumnsType<UserData> = [
    {
      dataIndex: "",
      title: "Id",
      align: "center",
      width: 100,
      render: (text, record, index) =>
        getIndex(props.pagination.pageSize, props.pagination.current, index),
    },
    {
      title: "FullName",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (cell, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Persent reduction",
      dataIndex: "reduction",
      key: "reduction",
    },
    {
      title: "Persent increate",
      dataIndex: "reduction",
      key: "reduction",
    },
    {
      title: "Persent create",
      dataIndex: "reduction",
      key: "reduction",
    },
    {
      title: "Position",
      dataIndex: "",
      key: "role",
      align: "center",
      width: 120,
      render: (cell) =>
        "messages(`user.${cell.name.toLowerCase()}` as TranslationKey)",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 190,
      render: (cell) => formattedDate(cell),
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: 190,
      render: (cell) => formattedDate(cell),
    },
  ];

  if (canUpdate) {
    columns.splice(
      columns.length,
      0,
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (cell, record) => (
          <Switch
            defaultChecked={cell.name === USER_STATUS.OPEN ? true : false}
            onChange={(status) => onUpdateStatusUser?.(record.id, status)}
          />
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 120,
        render: (cell, record) => (
          <Space>
            <ActionButton
              showUpdate
              onUpdate={() => openModal?.(TYPE_MODAL_USER.UPDATE, record)}
            />
            {/* {isAdmin && (
              <Tooltip title={messages('user.permission')}>
                <Button
                  icon={<MdVerifiedUser />}
                  onClick={() =>
                    openModal?.(TYPE_MODAL_USER.PERMISSION, record)
                  }
                  type="primary"
                  ghost
                />
              </Tooltip>
            )} */}
          </Space>
        ),
      }
    );
  }

  return <AppTable columns={columns} {...props} />;
}

export default UserTable;
