import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";

const CreateOrder = () => {
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
          label="Platform"
          name="platform"
          rules={[{ required: true, message: "platform is required!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Platform"
            //   onChange={onChange}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Category"
            //   onChange={onChange}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Service"
          name="service"
          rules={[{ required: true, message: "Service is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Temporary price"
          name="temporary_price"
          rules={[{ required: true, message: "Temporary price is required!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Voucher"
          name="voucher"
          rules={[{ required: true, message: "Remains is required!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Voucher"
            //   onChange={onChange}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="User"
          name="User"
          rules={[{ required: true, message: "OrderId is required!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Choose an user"
            //  onChange={onChange}
            //  onFocus={onFocus}
            //  onBlur={onBlur}
            //  onSearch={onSearch}
          >
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Charge" name="">
          <Input placeholder="" disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create new order
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateOrder;
