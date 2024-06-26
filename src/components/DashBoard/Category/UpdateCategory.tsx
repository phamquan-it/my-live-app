import { UploadOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { Button, Form, Select, Upload } from "antd/lib";

const UpdateCateggory = () => {
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
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Platform"
          name="platform"
          rules={[{ required: true, message: "Please a platform!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Choose a platform"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
          >
            <Select.Option value="jack">Youtube</Select.Option>
            {/* <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="tom">Tom</Select.Option> */}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update category
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateCateggory;
