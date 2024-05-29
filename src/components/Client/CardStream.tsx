import { Card, Image } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";

interface CardStreamProps {
  title: string;
  content: string;
  access_link: string;
  image_link: string;
  className?: string;
}
const CardStream: React.FC<CardStreamProps> = ({
  title,
  content,
  access_link,
  image_link,
  className,
}) => {
  return (
    <>
      <Card
        title=""
        bordered={true}
        className={className}
        style={{ minWidth: 200 }}
      >
        <Image
          preview={false}
          className="hover:-translate-y-3 ease-out duration-300"
          src={image_link}
          alt=""
          width={60}
          height={60}
        />
        <Title level={4}>{title}</Title>
        <p className="font-medium">{content}</p>
        <Link
          className="font-medium text-pink-700 hover:text-pink-400 ease-out duration-300"
          href={access_link}
        >
          Read more
        </Link>
      </Card>
    </>
  );
};
export default CardStream;
