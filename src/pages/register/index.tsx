import React from "react";
import { Form, Input, Button } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { RegisterPayload, authApi } from "@/API/authApi";
import { ToastContainer, toast } from "react-toastify";
import { error } from "console";
import { useRouter } from "next/router";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const RegiterForm = () => {
  const t = useTranslations("Form");
  const router = useRouter();
  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };

  const onFinish = async (values: RegisterPayload) => {
    if (values.confirmpassword != values.password) {
      toast.error(t("confirmpasswordError"));
      return;
    }
    await authApi
      .register(values)
      .then((response: any) => {
        toast.success("Success", {
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
        <div className="w-full shadow border rounded px-5 py-5">
          <Title level={3} className="text-center">
            {t("register")}
          </Title>
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
              label={t("email")}
              name="email"
              rules={[{ required: true, message: t("requiredEmail") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: t("requiredpassword") },
                {
                  min: 5,
                  message: "Password should have at least 5 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t("rpassword")}
              name="confirmpassword"
              rules={[
                { required: true, message: t("confirmpassword") },
                {
                  min: 5,
                  message: "Password should have at least 5 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="pb-3 flex gap-2">
                <Button type="primary" htmlType="submit">
                  {t("register")}
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {t("login")}
                </Button>
              </div>
              <Link href={"/"}>{t("gotohomepage")}</Link>
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
