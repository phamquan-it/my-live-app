import React from "react";
import { Form, Input, Button, Carousel, Image } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Title from "antd/es/typography/Title";
import { Ubuntu } from "next/font/google";
import { authApi } from "@/API/authApi";
import { setCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import FormLayout from "@/components/Client/FormLayout";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
});
const LoginForm = () => {
  const t = useTranslations("Form");

  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };
  const contentStyle: React.CSSProperties = {
    marginTop: "30px",
    height: "260px",
    color: "#fff",
    lineHeight: "290px",
    textAlign: "center",
    background: "#364d79",
  };
  const router = useRouter();
  async function onFinish(values: any) {
    console.log(values);

    await authApi
      .login(values)
      .then((response) => {
        setCookie("token", response.data.token);
        setCookie("refresh_token", response.data.refresh_token);
        toast.success("Login success");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("An error occured");
        console.log(error);
        toast.error("An error occured");
      });
  }
  return (
    <>
      <FormLayout>
        <Form
          className="w-full py-5 pe-3"
          name="basic"
          initialValues={{ remember: true }}
          {...layout}
          onFinish={onFinish}
        >
          <Title level={3} className="text-center">
            {t("login")}
          </Title>
          <div className="px-2">
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

            <Form.Item className="!mt-3">
              <Button type="primary" block htmlType="submit">
                {t("login")}
              </Button>{" "}
              <p className="text-center">
                Don't have an account?{" "}
                <Button
                  className="!px-0"
                  type="link"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  {t("register")}
                </Button>
              </p>
            </Form.Item>
            <Form.Item label="" name="">
              <Link href={"/"}>{t("gotohomepage")}</Link>
            </Form.Item>
          </div>
        </Form>
      </FormLayout>
    </>
  );
};

export default LoginForm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
