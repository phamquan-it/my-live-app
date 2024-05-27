import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Upload, message } from "antd";
import { Button, Form } from "antd/lib";

const CreateNewCategory = () => {
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
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Platform"
          name="platform"
          rules={[{ required: true, message: "Please choose a platform" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Choose a platform"
            //   onChange={onChange}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
          >
            <Select.Option value="jack">Youtube</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create New Category
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateNewCategory;
