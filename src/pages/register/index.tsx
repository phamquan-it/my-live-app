import React from "react";
import { Form, Input, Button } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { RegisterPayload, authApi } from "@/API/authApi";
import { ToastContainer, toast } from "react-toastify";
import { error } from "console";
import { useRouter } from "next/router";

const RegiterForm = () => {
  const t = useTranslations("Form");
  const router = useRouter();
  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };

  const onFinish = async (values: RegisterPayload) => {
    await authApi
      .register(values)
      .then((response: any) => {
        toast.success("Successfully", {
          onClose: () => {
            authApi
              .login({ email: values.email, password: values.password })
              .then(() => {
                router.push("/");
              })
              .catch(() => {
                router.push("/auth/login");
              });
          },
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred");
      });
  };
  return (
    <>
      <div
        className="w-1/3 m-auto flex items-center"
        style={{ height: "100vh" }}
      >
        <ToastContainer />
        <div className="w-full">
          <h1 className="text-center">{t("register")}</h1>
          <Form
            className="w-full"
            name="basic"
            initialValues={{ remember: true }}
            {...layout}
            onFinish={onFinish}
          >
            <Form.Item
              label={t("fullname")}
              name="name"
              rules={[{ required: true, message: "Please input fullname!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("username")}
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 8,
                  message: "Password should have at least 8 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("register")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegiterForm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
