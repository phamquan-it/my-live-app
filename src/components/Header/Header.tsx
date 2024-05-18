import {
  ArrowRightOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

const HeaderApp = () => {
  const [smScreenMenu, setsmScreenMenu] = useState<string>("h-0");
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (window.innerHeight < 400) {
    }
  });
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const menuItems = [
    { label: "Home", key: "1" },
    { label: "Platform", key: "2" },
    { label: "Services", key: "3" },
    { label: "Contact", key: "4" },
  ];
  const smMenuControl = () => {
    if (smScreenMenu == "h-44") {
      setsmScreenMenu("h-0");
    } else {
      setsmScreenMenu("h-44");
    }
  };
  return (
    <div className="container m-auto  py-2 ">
      <div className="bg-white flex justify-between items-center">
        <div>
          <span>live icon</span>
          <button
            className="btn hover:bg-slate-100 py-2 px-3 rounded sm:hidden"
            onClick={smMenuControl}
          >
            <MenuOutlined />
          </button>
        </div>
        <div className="hidden sm:block">
          <Menu
            mode="horizontal"
            style={{ width: 320 }}
            items={menuItems}
            defaultActiveFirst
          />
        </div>
        <div className="flex h-100 items-center">
          <button className="btn  py-2 text-rose-500 rounded hover:bg-rose-500 hover:text-white px-3">
            <UserOutlined /> Login
          </button>
          <button className="btn shadow text-white rounded border px-2 py-2 bg-rose-500 ms-3 hover:bg-rose-400 sm:hover:last:translate-x-2">
            Goto register <ArrowRightOutlined className="" />
          </button>
        </div>
      </div>
      <div
        className={`duration-300 shadow-sm border-bottom h-0 overflow-hidden ${smScreenMenu} sm:hidden`}
      >
        <Menu items={menuItems} onClick={smMenuControl} />
      </div>
    </div>
  );
};
export default HeaderApp;
