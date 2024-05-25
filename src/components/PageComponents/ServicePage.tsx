import React, { ReactNode, useEffect, useState } from "react";
import {
  CarOutlined,
  FundOutlined,
  HomeFilled,
  HomeOutlined,
  LaptopOutlined,
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
import { FaBuyNLarge } from "react-icons/fa";
import { useTranslations } from "next-intl";

const { Header, Sider, Content } = Layout;

interface ServicePageLayout {
  children: ReactNode;
}
const ServicePage: React.FC<ServicePageLayout> = ({ children }) => {
  const t = useTranslations("Dashboard");
  const items_menu = [
    {
      key: "9",
      icon: <HomeFilled />,
      label: t("home"),
      page: "/dashboard",
    },
    {
      key: "1",
      icon: <LaptopOutlined />,
      label: t("platform"),
      page: "/dashboard/platform",
    },
    {
      key: "2",
      icon: <TbCategoryFilled />,
      label: t("category"),
      page: "/dashboard/category",
    },
    {
      key: "3",
      icon: <FundOutlined />,
      label: t("refund"),
      page: "/dashboard/refund",
    },
    {
      key: "8",
      icon: <FaBuyNLarge />,
      label: t("order"),
      page: "/dashboard/order",
    },
    {
      key: "7",
      icon: <TeamOutlined />,
      label: t("user"),
      page: "/dashboard/user",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: t("userprofile"),
      page: "/dashboard/user/info",
    },

    {
      key: "5",
      icon: <SettingOutlined />,
      label: t("Settings"),
      page: "/dashboard/settings",
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
  const [currentPage, setcurrentPage] = useState<JSX.Element>(
    <LiveYoutubeSetup platform={2} title="Live Youtube" />
  );
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [defaultMenuActive, setDefaultMenuActive] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
    items_menu.map((item) => {
      if (item.page == router.asPath) setDefaultMenuActive([item.key]);
    });
  }, []);

  return (
    <Layout style={{ height: "100vh", backgroundColor: "transparent" }}>
      <div className="bg-white h-screen">
        <Sider trigger={true} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={defaultMenuActive}
            // defaultSelectedKeys={defaultMenuActive}
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
      </div>
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
