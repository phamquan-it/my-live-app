import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import React from "react";

interface listItem {
  key: number;
  linkName: string;
  accessLink: string;
}
interface LinkListProps {
  key: number;
  listName: string;
  listCollection: listItem[];
}
const LinkList: React.FC<LinkListProps> = ({ listName, listCollection }) => {
  return (
    <div className="text-center sm:text-left">
      <Title level={5} style={{ color: "rgb(219, 44, 146)" }}>
        {listName}
      </Title>
      <ul>
        {listCollection.map((item) => (
          <li key={item.key}>
            <Link
              href={item.accessLink}
              className="text-base footer_link"
              style={{ color: "rgb(30 41 59)", fontWeight: 450 }}
              id="item_link_footer"
            >
              {item.linkName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LinkList;
