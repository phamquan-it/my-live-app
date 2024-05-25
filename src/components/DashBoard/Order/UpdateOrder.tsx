import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Switch } from "antd";

const UpdateOrder = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Id"
          name="id"
          rules={[{ required: true, message: "Id is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </Form.Item>
        <Form.Item
          label="Start Count"
          name="start_count"
          rules={[{ required: true, message: "start_count is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Initial_charge"
          name="initial_charge"
          rules={[{ required: true, message: "Initial_charge is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Quantity is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Remains"
          name="remains"
          rules={[{ required: true, message: "Remains is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="OrderId"
          name="orderId"
          rules={[{ required: true, message: "OrderId is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ServiceId"
          name="serviceId"
          rules={[{ required: true, message: "ServiceId is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CreateAt"
          name="createAt"
          rules={[{ required: true, message: "CreateAt is required!" }]}
        >
          <DatePicker
            onChange={() => {}}
            picker="date"
            placeholder="StartDate"
          />
        </Form.Item>
        <Form.Item
          label="UpdateAt"
          name="updateAt"
          rules={[{ required: true, message: "CreateAt is required!" }]}
        >
          <DatePicker onChange={() => {}} picker="date" placeholder="EndDate" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateOrder;
