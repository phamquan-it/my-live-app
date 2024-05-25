import { Button, Form, Input, Select } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
interface updateFormProps {
  id: number;
}
const UpdateForm: React.FC<updateFormProps> = ({ id }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Title level={3}>Update Service</Title>

      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            defaultValue={1}
            style={{ width: 200 }}
            placeholder="Choose a status"
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="1">2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Amount is required" }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item
          label="Amount Vi"
          name="amount_vi"
          rules={[{ required: true, message: "Amount vi is required" }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item
          label="Exchange_rate"
          name="exchange_rate"
          rules={[{ required: true, message: "Exchange rate is required" }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateForm;
