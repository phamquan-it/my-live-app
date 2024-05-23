import { Modal } from "antd";
import React, { useState } from "react";

interface UpdateModalUser {
  openModal: boolean;
  id_user: string;
  onOk: () => void;
  onCancel: () => void;
}
const UpdateUser: React.FC<UpdateModalUser> = ({
  openModal,
  id_user,
  onOk,
  onCancel,
}) => {
  return (
    <>
      <Modal title="" open={openModal} onOk={onOk} onCancel={onCancel}>
        <p>{id_user}</p>
      </Modal>
    </>
  );
};
export default UpdateUser;
