import { FilterOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import Title from "antd/es/typography/Title";

const FilterForm = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Title level={3}>
        <FilterOutlined /> Lọc dữ liệu
      </Title>

      <Form
        layout="vertical"
        className="flex gap-3"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên luồng"
          name="threadName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="state"
        
        >
            <Select
              style={{ width: 100 }}
              placeholder=""
                value={1}
            >
              <Select.Option value={1}>New</Select.Option>
              
            </Select>
        </Form.Item>
        <Form.Item
          label=" "
        >
          <Button type="primary"><FilterOutlined/>Lọc</Button>
          
        </Form.Item>
      </Form>
    </>
  );
};
export default FilterForm;
