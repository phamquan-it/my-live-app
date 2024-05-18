import { Button, Checkbox, Form, Input, Radio, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

interface liveFormConfigProps{
  defaultplatform: number
}
const LiveFormConfig: React.FC<liveFormConfigProps> = ({defaultplatform}) => {
  const [form] = Form.useForm();
  const [platform,setPlatform] = useState<number>(1)
  const [orderLive, setOrderLive] = useState(1); // Default value is 1
  const [infinity,setInfinity] = useState(true)
  const [now,setNow] = useState(true)
  const onFinish = (values: any) => {
      console.log('Success:', values);
    };

 
  return (
    
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Tên luồng live" className="font-semibold" name="thread_name">
        <Input placeholder="Đặt tên gợi nhớ" />
      </Form.Item>
      <Form.Item label="Nền tảng" className="font-semibold" name="platform_nanme">
        <Radio.Group value={platform} onChange={(e)=>{
          setPlatform(e.target.value);
        }} defaultValue={defaultplatform}>
          <Radio value={1}>Shoppee</Radio>
          <Radio value={2}>Youtube</Radio>
          <Radio value={3}>Tiktok</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Loại nguồn" className="font-semibold" name="sourceCategory">
        <Select style={{ width: 200 }} placeholder="Chọn loại nguồn">
          <Select.Option value="jack">Video</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={
          <>
            <div>
              <h5 className="font-semibold ">Link nguồn</h5>
             
            </div>
          </>
        } className="" name="sourceLink"
      >
        <Input.TextArea placeholder="Sử dụng 1 link Google Drive đạt hiệu năng tốt nhất
          Thông số video chuẩn: định dạng: .mp4 , mã hóa: h264 , chất lượng âm thanh: 128kbs 44100 Hz " rows={6} allowClear />
      </Form.Item>
      <Form.Item label="Thứ tự live" className="font-semibold" name="order_live">
      <Radio.Group value={orderLive} onChange={(e) => {
        setOrderLive(e.target.value);
      }} defaultValue={1}>
        <Radio value={1} checked={true}>Lần lượt</Radio>
        <Radio value={2}>Ngẫu nhiên</Radio>
      </Radio.Group>
    </Form.Item>
      <FormItem>
            <Checkbox
              checked={infinity} onChange={(e)=>{
               setInfinity((e.target.checked))
              }}
            >
              Live vĩnh viễn
            </Checkbox><br />
            <Checkbox
              checked={now} onChange={(e)=>{
                setNow((e.target.checked))
               }}
            >
              Live ngay bây giờ
            </Checkbox>
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit">Auto live</Button>
      </Form.Item>
    </Form>
  );
};

export default LiveFormConfig;
