import React, { ReactNode, useEffect, useState } from "react";
import {
  FundOutlined,
  MenuOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined,
  TikTokOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import LiveYoutubeSetup from "../LiveYouTubeSetup";
import { useRouter } from "next/router";
import UserProfile from "../UserProfile";
import TeamMember from "../TeamMember";
import Setting from "../Setting";
import { TbCategoryFilled } from "react-icons/tb";
const items_menu = [
  {
    key: "1",
    icon: <ShoppingOutlined />,
    label: "Live Shoppee",
    page: "/",
  },
  {
    key: "2",
    icon: <TbCategoryFilled />,
    label: "Categories",
    page: <LiveYoutubeSetup platform={2} title="" />,
  },
  {
    key: "3",
    icon: <FundOutlined />,
    label: "Fund",
    page: "/dashboard/refund",
  },

  {
    key: "7",
    icon: <TeamOutlined />,
    label: "Users",
    page: "/dashboard/user",
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "User profile",
    page: <UserProfile />,
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    label: "Setting",
    page: <Setting />,
  },
];
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/user/info">
        Profile
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/logout">
        Logout
      </a>
    ),
  },
];

const { Header, Sider, Content } = Layout;

interface ServicePageLayout {
  children: ReactNode;
}
const ServicePage: React.FC<ServicePageLayout> = ({ children }) => {
  const [currentPage, setcurrentPage] = useState<JSX.Element>(
    <LiveYoutubeSetup platform={2} title="Live Youtube" />
  );
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          onClick={(e) => {
            items_menu.map((item: any) => {
              if (e.key == item.key) {
                router.push(item.page);
              }
            });
          }}
          items={items_menu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex">
            <Button
              type="text"
              icon=<MenuOutlined />
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="w-full flex justify-between pe-10">
              <span style={{ color: "purple" }}>LiveLogo</span>
              <span>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <Button className="border-0 shadow-sm text-slate-500">
                    pmquan@gmail.com <UserOutlined />
                  </Button>
                </Dropdown>
              </span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ServicePage;
