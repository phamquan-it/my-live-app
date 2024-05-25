import {
  CopyOutlined,
  FacebookFilled,
  SlackOutlined,
  TikTokFilled,
  TikTokOutlined,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import FastInfo from "./FastInfo";

const FastInfoList = () => {
  const fastList = [
    {
      title: "FaceBook",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-blue-500",
      icon: <FacebookFilled />,
    },
    {
      title: "X",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-gray-800",
      icon: <XOutlined />,
    },
    {
      title: "Tiktok",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-yellow-500",
      icon: <SlackOutlined />,
    },
    {
      title: "Youtube",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-red-500",
      icon: <YoutubeFilled />,
    },
  ];
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {fastList.map((item) => {
          return (
            <>
              <FastInfo
                title={item.title}
                monney={item.monney}
                dateTitle={item.dateTitle}
                color={item.color}
                icon={item.icon}
              />
            </>
          );
        })}
      </div>
    </>
  );
};
export default FastInfoList;
