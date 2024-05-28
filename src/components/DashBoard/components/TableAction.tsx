import {
  BookOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
interface TableActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetail?: () => void;
  showDetailBtn?: boolean | false;
}
const TableAction: React.FC<TableActionProps> = ({
  onEdit,
  onDelete,
  onDetail,
  showDetailBtn,
}) => {
  return (
    <>
      {/* <div className="flex gap-1">
        <Button onClick={onEdit}>
          <EditOutlined />
        </Button>
        <Button className={showDetailBtn ? "" : "!hidden"} onClick={onDetail}>
          <EyeOutlined />
        </Button>
        <Button onClick={onDelete}>
          <span className="text-rose-600">
            <DeleteOutlined />
          </span>
        </Button>
      </div> */}
      <div className="flex gap-1">
        <Button
          onClick={onEdit}
          className="!bg-green-500 hover:!border-green-500 hover:!shadow-none"
        >
          <span className="text-white">
            <EditFilled />
          </span>
        </Button>
        <Button className={showDetailBtn ? "" : "!hidden"} onClick={onDetail}>
          <EyeOutlined />
        </Button>
        <Button onClick={onDelete} type="default" className="!bg-red-500">
          <span className="text-white">
            <DeleteFilled />
          </span>
        </Button>
      </div>
    </>
  );
};
export default TableAction;
