import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import LiveFormConfig from "./PageComponents/LiveFormConfig";
import FilterForm from "./FilterForm";
import LiveInfo from "./LiveInfo";
import LiveListManager from "./LiveListManager";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import { Button } from "antd";
interface liveYoutobeSetupProps {
  platform: number;
  title: string;
}
const LiveYoutubeSetup: React.FC<liveYoutobeSetupProps> = ({
  platform,
  title,
}) => {
  const date = new Date("02/01/2024"); // Assuming you have a Date object
  const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss").toString(); // Format the date
  console.log(formattedDate); // Output: e.g., 2024-05-13 15:30:00
  const [livestream, setLivestream] = useState<boolean>(false);
  return (
    <div>
      <Modal
        title=""
        open={livestream}
        onOk={() => setLivestream(false)}
        onCancel={() => setLivestream(false)}
      >
        <div className=" p-3 rouned my-3">
          <Title level={5}>Cấu hình</Title>
          <LiveFormConfig defaultplatform={platform} />
        </div>
      </Modal>
      <div className="grid grid-cols-2">
        <div>
          <Title>{title}</Title>
          <Button
            onClick={() => {
              setLivestream(true);
            }}
          >
            Live now
          </Button>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-full shadow-md rounded p-3">
          <FilterForm />
        </div>
        <div className="w-full rounded shadow p-3 flex justify-between">
          <LiveInfo
            data={{ active: 1, pending: 3, recent: 1, stop: 4 }}
            time="Today"
          />
          <LiveInfo
            data={{ active: 1, pending: 2, recent: 1, stop: 4 }}
            time="Yesterday"
          />
        </div>
      </div>
      <div className="mt-3 shadow rounded p-3">
        <LiveListManager
          dataSource={[
            {
              key: 1,
              endTime: formattedDate,
              liveTime: "02/01/2024",
              platform: "Youtube",
              speed: 1,
              startTime: formattedDate,
              state: "start",
              threadName: "thread1",
            },
          ]}
        />
      </div>
    </div>
  );
};
export default LiveYoutubeSetup;
