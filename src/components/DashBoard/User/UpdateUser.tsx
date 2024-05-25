import { Input } from "antd";
import { Button, Form } from "antd/lib";

const UpdateUser = () => {
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
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "phone is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Old password"
          name="oldpassword"
          rules={[
            { required: true, message: "Please input your old password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New password"
          name="newpassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Change password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateUser;
