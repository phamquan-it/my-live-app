import FormLabel from "@/components/DashBoard/Form/FormLabel";
import CreateOrder from "@/components/DashBoard/Order/CreateOrder";
import ServicePage from "@/components/PageComponents/ServicePage";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import _ from "lodash";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/pages/api/axiosClient";
const Page = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [platforms, setPlatforms] = useState();
  const debounce_fun = _.debounce((keyword: string) => {
    console.log("Function debounced after 300ms!");
  }, 300);

  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => axiosClient.get("/platform/list?language=en", {}),
    queryKey: ["platform"],
    placeholderData: (previousData) => previousData,
  });
  return (
    <>
      <ServicePage>
        <Title className="text-center">New order</Title>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <Form
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              prefix=""
            >
              <Form.Item
                name="platform"
                label={<span className="font-semibold">Platform</span>}
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  onSearch={debounce_fun}
                  options={data?.data.data}
                />
              </Form.Item>
              <Form.Item
                name="category"
                label={<span className="font-semibold">Category</span>}
                rules={[{ required: true }]}
              >
                <Select
                  options={[{ value: "sample", label: <span>{}sample</span> }]}
                />
              </Form.Item>
              <Form.Item
                name="age"
                label={<span className="font-semibold">Service</span>}
                rules={[{ required: true }]}
              >
                <Select
                  options={[{ value: "sample", label: <span>{}sample</span> }]}
                />
              </Form.Item>
              <Form.Item
                name="temporaryprice"
                label=<FormLabel title="Temporary price" />
                rules={[{ required: true }]}
              >
                <Input placeholder="$0" value={"$0"} disabled />
              </Form.Item>
              <Form.Item
                name="voucher"
                label={<span className="font-semibold">Voucher</span>}
                rules={[{ required: true }]}
              >
                <Select
                  options={[{ value: "sample", label: <span>{}sample</span> }]}
                />
              </Form.Item>
              <Form.Item
                name="user"
                label=<FormLabel
                  title="User
                "
                />
                rules={[{ required: true }]}
              >
                <Select
                  options={[{ value: "sample", label: <span>{}User</span> }]}
                />
              </Form.Item>
              <Form.Item
                name="charge"
                label=<FormLabel title="Charge" />
                rules={[{ required: true }]}
              >
                <Select
                  options={[{ value: "sample", label: <span>{}Charge</span> }]}
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <Form layout="vertical">
              <Form.Item label={<FormLabel title="Description" />} name="">
                <Input.TextArea placeholder="" allowClear rows={10} readOnly />
              </Form.Item>
            </Form>
          </div>
        </div>
      </ServicePage>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
