import ServicePage from "@/components/PageComponents/ServicePage";
import { QrcodeOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";

const Page = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <ServicePage>
        <div className="md:w-1/2 m-auto">
          <Title level={2} className="text-center">
            Deposit
          </Title>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign="left"
          >
            <Form.Item
              label="Amount (USD)"
              name="amount"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Exchange rate today"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Amount (VND)"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="flex gap-3 ">
                <Button type="primary" htmlType="submit">
                  Payment via Perfect Money
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<QrcodeOutlined />}
                >
                  Payment via QR Code
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </ServicePage>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
