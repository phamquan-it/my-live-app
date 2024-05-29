import Icon from "@ant-design/icons";
import { Badge, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Title from "antd/es/typography/Title";
import React from "react";
interface LiveInfoProps{
    key: number,
    threadName:string,
    platform: string,
    startTime: string,
    endTime:string,
    liveTime:string,
    speed: number,
    state: string
}
interface LiveListManagerProps {
    dataSource: LiveInfoProps[];
}
const LiveListManager:React.FC<LiveListManagerProps> = ({dataSource})=>{
    
      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'key',
          key: 'key',
          width:"10%"
        },
        {
          title: "Tên luồng",
          dataIndex: 'threadName',
          key: 'threadName',
          width:"30%"
        },
        {
            title: "Nền tảng",
            dataIndex: 'platform',
            key: 'platform',
          },
          {
            title: "Thời gian bắt đầu",
            dataIndex: 'startTime',
            key: 'startTime',
          },
          {
            title: "Thời gian kết thúc",
            dataIndex: 'endTime',
            key: 'endTime',
          },
          {
            title: "Thời gian live",
            dataIndex: 'liveTime',
            key: 'liveTime',
          },
          {
            title: "Tốc độ",
            dataIndex: 'speed',
            key: 'speed',
          },
          {
            title: "Trạng thái",
            dataIndex: 'state',
            key: 'state',
            render: (text:string)=>(<>
                    {<Badge count={text} color={(text=="start")?"green":"red"}/>}
            </>)
          },
        {
          title: 'Chức năng',
          
          
        },
      ];
  return(
    <>

    <Title level={3}>Danh sách cấu hình</Title>
    <Table dataSource={dataSource} columns={columns} bordered/>
    </>
);
} 
 export default LiveListManager