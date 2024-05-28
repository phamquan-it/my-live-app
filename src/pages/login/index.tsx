import React from "react";
import { Form, Input, Button, Carousel } from "antd";
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
      <div
        className={`w-1/3 m-auto flex items-center ${ubuntu.className}`}
        style={{ height: "100vh" }}
      >
        <ToastContainer />
        <div className="w-full border rounded shadow">
          <div className="px-3 py-4">
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
                      min: 5,
                      message: "Password should have at least 5 characters",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Button
                  type="link"
                  style={{ color: "purple" }}
                  onClick={() => {
                    // Handle forgot password
                  }}
                >
                  {t("forgot")}
                </Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {t("login")}
                  </Button>{" "}
                  <Button htmlType="submit">{t("register")}</Button>
                </Form.Item>
                <Form.Item label="" name="">
                  <Link href={"/"}>Goto home page</Link>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
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
