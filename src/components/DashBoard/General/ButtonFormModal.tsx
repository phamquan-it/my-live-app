import { Button, Form, Modal } from "antd";
import { ReactNode, useState } from "react";

interface ButtonFormModalProps {
  buttonTitle?: ReactNode | string;
  className?: string;
  modalTitle?: ReactNode | string;
  onFinishFailed?: (error: any) => void | undefined;
  onFinish?: ((values: any) => void) | undefined;
  formFields: ReactNode;
  submitButton: ReactNode | string;
  modalClassName: string;
  footerModal?: ReactNode;
}
const ButtonFormModal: React.FC<ButtonFormModalProps> = (
  props: ButtonFormModalProps
) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const hideModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Button
        className={props.className}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {props.buttonTitle}
      </Button>
      <Modal
        footer={props.footerModal ?? null}
        title={props.modalTitle}
        open={openModal}
        onCancel={hideModal}
        className={props.modalClassName}
      >
        <Form
          {...props}
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
        >
          <Form.Item>
            {props.formFields}
            <Button type="primary" htmlType="submit">
              {props.submitButton}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ButtonFormModal;
