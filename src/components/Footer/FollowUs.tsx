import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TikTokFilled,
  XFilled,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const FollowUs = () => {
  return (
    <div className="text-center sm:text-start">
      <Title level={5}>
        <span className="text-pink-600">Follow Us</span>
      </Title>
      <div className="flex gap-3 px-3 pb-3 justify-center sm:justify-start">
        <FacebookFilled />
        <XOutlined />
        <InstagramOutlined />
        <YoutubeFilled />
        <LinkedinFilled />
        <TikTokFilled />
      </div>
    </div>
  );
};
export default FollowUs;
