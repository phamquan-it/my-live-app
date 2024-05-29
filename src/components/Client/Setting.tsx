import Title from "antd/es/typography/Title";
import LanguageChoose from "./LocaleChoose";
import { Button, Form, Select } from "antd";
import type { SelectProps } from "antd";

const Setting = () => {
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="shadow rounded p-3 py-2">
        <Title level={5}>Language:</Title>
        <LanguageChoose />
      </div>
      <div className="rounded shadow-md p-3 py-2 mt-3 border">
        <Title level={5}>Service:</Title>
       
        <Form
              name="basic"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              
        
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
              >
                <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          options={options}
        />
              </Form.Item>
        
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </Form.Item>
            </Form>
      </div>
    </>
  );
};
export default Setting;
