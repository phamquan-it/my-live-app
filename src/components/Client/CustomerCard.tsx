import { Card, Image } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

interface customerCardProps{
    image:string,
    comment:string,
    customerName:string,
    jobName:string
}

const CustomerCard:React.FC<customerCardProps> = ({image, comment, customerName, jobName})=>{
  return(
    <>
    <Card>
       <div className="flex justify-center"><Image src={image} alt="" width={100} className="rounded-full" preview={false}/></div>
       <p className="text-center text-base">“{comment}”</p>
       <Title level={5} className="text-center mt-5">{customerName}</Title>
       <p className="text-center font-light">{jobName}</p>
    </Card>
    
    </>
);
} 
 export default CustomerCard