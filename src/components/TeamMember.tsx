import {
  EditFilled,
  PlusCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Form, Image, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const TeamMember = () => {
    const [open,setOpen] = useState<boolean>(false)
    const [inviteMenberOpen,setinviteMenberOpen] = useState<boolean>(false)
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <>
      <div className=" rounded p-4 m-3 bg-slate-50">
        <div className="flex justify-between px-2 items-center">
          <div className="relative mb-3">
            <span
              className="bg-slate-50 absolute text-gray-400 -top-2 left-4 px-1"
              style={{ fontSize: 10 }}
            >
              Team name
            </span>
            <button className="p-1 px-3 rounded-full border hover:text-rose-700" onClick={()=>{
                setOpen(true)
            }}>
              My Team <EditFilled />
            </button>
          </div>
          <button className="btn bg-rose-600 rounded-full text-white p-3 py-1 shadow-md hover:bg-white hover:text-rose-600" onClick={()=>{
            setinviteMenberOpen(true)
          }}>
            Invite menber <PlusCircleOutlined />
          </button>
        </div>
        <Modal
        title=<><div className="text-center">Invite menber</div></>
        centered
        open={inviteMenberOpen}
        onOk={() => setinviteMenberOpen(false)}
        onCancel={() => setinviteMenberOpen(false)}
      >
        <Input placeholder="Friend name..." />
        <div style={{maxHeight:300, overflowY:"auto", marginTop:20}}>
        <CardMemberInfo
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
         <CardMemberInfo
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
         <CardMemberInfo
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
         <CardMemberInfo
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
         <CardMemberInfo
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
        </div>
      </Modal>
        <Modal
        title="Enter team name:"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        
        <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Team name"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Change team name
                </Button>
              </Form.Item>
            </Form>
      </Modal>
      
        <CardMember
          image_link="df"
          member_detail="dfdf"
          member_id="123"
          member_name=""
        />
      </div>
    </>
  );
};

interface cardMemberProps {
  member_id: string;
  image_link: string;
  member_name: string;
  member_detail: string;
}
const CardMember: React.FC<cardMemberProps> = ({
  member_id,
  image_link,
  member_name,
  member_detail,
}) => {
  return (
    <>
      <div className="bg-white rounded shadow">
        <div className="flex justify-between p-3 items-center">
          <div className="flex">
            <Image
              width={50}
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
              alt=""
              preview={false}
              className="rounded-full"
            />
            <div className="ms-3">
              <Title level={5} style={{ marginBottom: 0 }}>
                {" "}
                <span className="font-normal">User</span>
              </Title>
              <p className="font-light">You are the owner of this team</p>
            </div>
          </div>
          <div>
            <button className="btn p-2 rounded bg-gray-200 text-gray-400">
              <TeamOutlined /> Owner
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const CardMemberInfo: React.FC<cardMemberProps> = ({
    member_id,
    image_link,
    member_name,
    member_detail,
  }) => {
    return (
      <>
        <div className="bg-white rounded shadow">
          <div className="flex justify-between p-3 items-center">
            <div className="flex">
              <Image
                width={50}
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
                alt=""
                preview={false}
                className="rounded-full"
              />
              <div className="ms-3">
                <Title level={5} style={{ marginBottom: 0 }}>
                  {" "}
                  <span className="font-normal">User</span>
                </Title>
                <p className="font-light">You are the owner of this team</p>
              </div>
            </div>
            <div>
              <button className="btn p-2 rounded bg-rose-500 text-white hover:bg-slate-300 hover:text-rose-500">
                <PlusCircleOutlined /> Invite
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
export default TeamMember;

