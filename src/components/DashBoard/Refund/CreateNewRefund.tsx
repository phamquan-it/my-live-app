import { Button, Form, Input, Select } from "antd";

const CreateNewRefund = () => {
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
          label="Mail user"
          name=""
          rules={[{ required: true, message: "Please choose an user" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Choose an user"
            //   onChange={onChange}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            //   onSearch={onSearch}
          >
            <Select.Option value="jack">Jack</Select.Option>
            {/* <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          label="Service"
          name="service"
          rules={[{ required: true, message: "Please choose a service!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Choose a service"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
          >
            <Select.Option value="jack">Youtube</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update refund
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateNewRefund;
