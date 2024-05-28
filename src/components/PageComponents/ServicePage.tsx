import React, { ReactNode, useEffect, useState } from "react";
import {
  CalendarFilled,
  CarOutlined,
  DiffOutlined,
  FundOutlined,
  HistoryOutlined,
  HomeFilled,
  HomeOutlined,
  LaptopOutlined,
  MenuOutlined,
  OrderedListOutlined,
  PlusCircleFilled,
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
import {
  FaBuyNLarge,
  FaCashRegister,
  FaListUl,
  FaMoneyBill,
  FaVolumeOff,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageChoose from "../LocaleChoose";
import Title from "antd/es/typography/Title";
import { deleteCookie } from "cookies-next";

const { Header, Sider, Content } = Layout;

interface ServicePageLayout {
  children: ReactNode;
}
const ServicePage: React.FC<ServicePageLayout> = ({ children }) => {
  const t = useTranslations("Dashboard");
  const items_menu = [
    {
      key: "1",
      icon: <HomeFilled />,
      label: t("home"),
      page: "/dashboard",
    },
    {
      key: "2",
      icon: <HistoryOutlined />,
      label: "Payment history",
      page: "/dashboard/refund",
    },
    {
      key: "3",
      icon: <FaListUl />,
      label: t("services"),
      page: "/dashboard/refund",
    },
    {
      key: "4",
      icon: <FaMoneyBill />,
      label: "Cash flow",
      page: "/dashboard/refund",
    },
    {
      key: "5",
      icon: <TbCategoryFilled />,
      label: t("category"),
      page: "/dashboard/category",
    },
    {
      key: "6",
      icon: <FundOutlined />,
      label: t("refund"),
      page: "/dashboard/refund",
    },
    {
      key: "7",
      icon: <HistoryOutlined />,
      label: "Payment history",
      page: "/dashboard/refund",
    },
    {
      key: "8",
      icon: <CalendarFilled />,
      label: "Cront",
      page: "/dashboard/refund",
    },
    {
      key: "9",
      icon: <FaBuyNLarge />,
      label: t("order"),
      page: "/dashboard/order",
    },
    {
      key: "10",
      icon: <TeamOutlined />,
      label: t("user"),
      page: "/dashboard/user",
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: t("userprofile"),
      page: "/dashboard/user/info",
    },

    {
      key: "12",
      icon: <SettingOutlined />,
      label: t("Settings"),
      page: "/dashboard/settings",
    },
    {
      key: "13",
      icon: <FaVolumeOff />,
      label: "Voucher",
      page: "/dashboard/log",
    },
    {
      key: "14",
      icon: <DiffOutlined />,
      label: "Log",
      page: "/dashboard/log",
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
    <Layout
      style={{ height: "100vh", backgroundColor: "transparent" }}
      className=""
    >
      <div
        className="bg-white h-screen "
        style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
      >
        <Sider
          trigger={true}
          collapsible
          collapsed={collapsed}
          className="!py-0"
        >
          <div className="demo-logo-vertical" />
          <div className={`${collapsed ? "hidden" : "block"}`}>
            <div className="px-3 py-3 pt-5 text-gray-600">
              <Title level={3} className="!mb-0 !pb-0">
                Pham Quan
              </Title>
              <p>quanqqq11@gmail.com</p>
            </div>
            <div className="my-2 border mx-3 rounded-md font-semibold">
              <div className="bg-blue-100 flex justify-between p-3 ">
                <span className="text-gray-700">Funds</span>
                <span className="text-blue-500">$0</span>
              </div>
              <div className=" flex justify-between p-3">
                <span className="text-gray-700">Inprogess</span>
                <span className="text-blue-900">$0</span>
              </div>
            </div>
            <div className="mx-3 grid gap-2">
              <Button type="primary" icon={<PlusCircleFilled />}>
                New order
              </Button>
              <Button
                type="primary"
                className="!bg-green-600"
                icon={<PlusCircleFilled />}
              >
                Deposit
              </Button>
            </div>
          </div>
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
        <div className="grid">
          <Button
            className={`${!collapsed ? "!mx-3" : "!hidden"}`}
            onClick={() => {
              deleteCookie("token");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
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
              <div className="flex items-center gap-2">
                <LanguageChoose />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 0px 16px 10px",
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
