import { useQuery } from "@tanstack/react-query";
import { Input, Select } from "antd";
import { Button, Checkbox, Form } from "antd/lib";
import axiosClient from "../api/axiosClient";
import { fetchUserInfo } from "./info";
import { authApi } from "@/API/authApi";
import ServicePage from "@/components/PageComponents/ServicePage";

const Page = () => {
  const onFinish = async (values: any) => {
    await authApi.get_user_info().then((response) => {
      const id = response.data.data.id;
      const roleId = response.data.data.roleId;
      authApi
        .update_info(id, {
          name: values.name,
          idRole: roleId,
          type: "default",
          old_password: values.old_password,
          new_password: values.new_password,
          ratio: 0,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(error);
        });
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["language", "en"],
    queryFn: () => {
      const data = axiosClient.get("/role/list", {
        params: { language: "en" },
      });
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }
  return (
    <>
      <ServicePage>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Fullname is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Old Password"
            name="old_password"
            rules={[{ required: true, message: "Old password is required!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: "New password is required!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Change password
            </Button>
          </Form.Item>
        </Form>
      </ServicePage>
    </>
  );
};
export default Page;
