import { Modal, Table } from "antd";
import { ReactNode } from "react";
interface DashBoardColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}
interface DashBoardTableProps {
  columns: DashBoardColumns[];
  children: ReactNode;
  props?: any;
  onTableChange?: () => any;
  dataSource: any[];
  modalOpen?: boolean;
  modalTitle?: ReactNode | string;
  modalChilren?: ReactNode;
  modalOnCancel?: () => void;
}
const DashBoardTable: React.FC<DashBoardTableProps> = ({
  columns,
  children,
  props,
  dataSource,
  modalOpen,
  modalTitle,
  modalChilren,
  modalOnCancel,
  onTableChange,
}) => {
  return (
    <>
      {children}
      <Modal
        title={modalTitle}
        open={modalOpen || false}
        footer={null}
        onCancel={modalOnCancel}
      >
        {modalChilren}
      </Modal>

      <Table
        dataSource={dataSource}
        columns={columns}
        {...props}
        onChange={onTableChange}
      />
    </>
  );
};
export default DashBoardTable;
