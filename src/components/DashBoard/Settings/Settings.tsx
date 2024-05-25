import { Checkbox, DatePicker, Form, Input } from "antd";
import { Button, Select } from "antd/lib";

const Setting = () => {
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
          label="Time update service"
          name="timeupdateservice"
          rules={[
            { required: true, message: "Please input time update service!" },
          ]}
        >
          <DatePicker picker="quarter" />
        </Form.Item>
        <Form.Item
          label="Time update order"
          name="timeupdateorder"
          rules={[
            { required: true, message: "Please input Time update order!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="WhatsApp"
          name="whatapp"
          rules={[{ required: true, message: "Please input whatapp!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择"
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
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: "Please input Facebook!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Perfect Money account number"
          name="perfectmonneyaccountnumber"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Time update order finished (day)"
          name="timeupdateorderfinishday"
          rules={[
            {
              required: true,
              message: "Please input Time update order finished (day)!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Time deny payment processing (day)"
          name="timedenypaymentpressingday"
          rules={[
            {
              required: true,
              message: "Please input Time deny payment processing (day)",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Time cancel queue order (day)"
          name="facebook"
          rules={[
            {
              required: true,
              message: "Please input Time cancel queuw order day!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Provider" name="provider">
          <Checkbox
            checked
            disabled={false}
            // onChange={}
          >
            Gainsmm
          </Checkbox>
          <Checkbox
            checked
            disabled={false}
            // onChange={}
          >
            Viralsmm
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-en">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
export default Setting;
