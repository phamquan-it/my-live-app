import axiosClient from "@/pages/api/axiosClient";
import {
  BookOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { error } from "console";
import { useTranslations } from "next-intl";
import React, { ReactNode, useMemo, useState, useTransition } from "react";
import { ToastContainer, toast } from "react-toastify";

interface TableActionProps {
  onEdit?: () => void;
  deleteAPI: DeleteAction;
  deleteAlert?: ReactNode | string;
  editFormComponents?: ReactNode;
  onDetail?: () => void;
  showDetailBtn?: boolean | false;
}
const TableAction: React.FC<TableActionProps> = ({
  onEdit,
  deleteAPI,
  deleteAlert,
  editFormComponents,
  onDetail,
  showDetailBtn,
}) => {
  const t = useTranslations("general");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const deleteAction = () => {
    axiosClient
      .delete(deleteAPI.deleteURL, deleteAPI.params)
      .then((response) => {
        console.log(response);
        toast.success("Deleted");
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
        toast.error("An error occured");
      });
  };
  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <>
      <Modal
        title={t("areyousure")}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={
          <>
            <Button onClick={() => setShowModal(false)}>{t("cancel")}</Button>
            <Button type="primary" danger onClick={deleteAction}>
              {t("accept")}
            </Button>
          </>
        }
      >
        {deleteAlert}
      </Modal>
      <Modal
        title="Edit"
        footer={null}
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
      >
        {editFormComponents}
      </Modal>

      <div className="flex gap-1">
        <Tooltip placement="top" title={"Edit"} arrow={mergedArrow}>
          <Button
            onClick={() => {
              setShowEditModal(true);
            }}
            className="!px-2 !border-blue-600"
          >
            <span className="text-blue-600">
              <EditFilled />
            </span>
          </Button>
        </Tooltip>
        <Button className={showDetailBtn ? "" : "!hidden"} onClick={onDetail}>
          <EyeOutlined />
        </Button>
        <Tooltip placement="top" title={"Delete"} arrow={mergedArrow}>
          <Button
            onClick={() => setShowModal(true)}
            className="!px-2 !border-red-600"
          >
            <span className="text-rose-600">
              <DeleteFilled />
            </span>
          </Button>
        </Tooltip>
      </div>
    </>
  );
};
export default TableAction;
