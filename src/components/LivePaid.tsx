import { CheckCircleFilled, DownOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React from "react";
interface ServiceDetail {
  info: string;
  goto?: boolean;
}
interface livePaidProps {
  key?: number;
  livePaidName: string;
  livePaidTime: string;
  liveServiceCharge: string;
  liveBillMethod: string;
  liveServiceDetail: ServiceDetail[];
}
const LivePaid: React.FC<livePaidProps> = ({
  livePaidName,
  livePaidTime,
  liveServiceCharge,
  liveBillMethod,
  liveServiceDetail,
}) => {
  return (
    <>
      <Card
        bordered={true}
        className="shadow-md hover:scale-105 duration-200
      "
      >
        <Title level={5}>{livePaidName}</Title>
        <Title style={{ marginTop: 4, marginBottom: 1 }}>
          <sup>$</sup>
          {liveServiceCharge}
          <span className="text-lg text-gray-400 font-normal">
            /{livePaidTime}
          </span>
        </Title>
        <span>{liveBillMethod}</span>
        <Button
          type="default"
          block
          className="!border-pink-400 !bg-pink-500 hover:!bg-pink-400 !text-white"
        >
          Get Stared Now
        </Button>
        <ul className="mt-5">
          {liveServiceDetail.map((item, index) => (
            <>
              <li className="flex" style={{ lineHeight: 2.5 }}>
                <span>
                  <CheckCircleFilled style={{ color: "rgb(219 39 119)" }} />
                  &nbsp; &nbsp;
                </span>
                {item.goto != undefined && item.goto ? (
                  <div className="flex justify-between w-full">
                    <Link href="" style={{ color: "rgb(219 39 119)" }}>
                      {item.info}
                    </Link>
                    <DownOutlined style={{ color: "rgb(219 39 119)" }} />
                  </div>
                ) : (
                  <>{item.info}</>
                )}
              </li>
            </>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default LivePaid;
