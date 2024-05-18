import { Image, Progress, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="shadow h-full p-3">
          <div className="flex justify-center">
            <Image
              width={150}
              className="rounded-full shadow-sm border"
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
              placeholder=""
              alt=""
              preview={false}
            />
          </div>
          <p className="text-center text-base">pmquan@gmail.com</p>
          <div className="my-3">
            <a
              className="btn border p-3 py-1  bg-pink-600 text-white me-2 hover:shadow-md hover:text-white hover:bg-pink-500 active:text-rose-700"
              onClick={() => {
                router.push("/");
              }}
            >
              Trang chủ
            </a>
            <a className="btn border p-3 py-1  bg-pink-600 text-white me-2 hover:shadow-md hover:text-white hover:bg-pink-500 active:text-rose-700">
              Đổi mật khẩu
            </a>
          </div>
          <div>
            <ul className="my-4">
              <li>
                <span className="font-semibold">Số điện thoại:</span> 0123456789
              </li>
              <li>
                <span className="font-semibold">Gói đang sử dụng:</span> Youtube
                Live(Basic)
              </li>
              <li>
                <span className="font-semibold">Ngày đăng ký:</span> 02/01/2024
              </li>
              <li>
                <span className="font-semibold">Ngày hết hạn:</span> 03/01/2024
              </li>
              <li>
                <span className="font-semibold"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="rounded shadow p-3">
            <div>
              <Title level={5} style={{marginBottom :0}}>Số luồng đang chạy</Title>
              <Progress percent={30} size={"small"} showInfo={false} strokeColor={"rgb(219, 44, 146)"}/>
            </div>
            <div className="mt-3">
              <Title level={5} style={{marginBottom :0}}>Số luồng đã tạo</Title>
              <Progress percent={30} size={"small"} showInfo={false} strokeColor={"rgb(219, 44, 146)"}/>
            </div>
          </div>
          <div className="rounded shadow mt-4 p-3">
            <Title level={5}>Lịch sử giao dịch</Title>
            <Table dataSource={[]} bordered>
                <Column title="ID" dataIndex="ID" key="id" />
                    <Column title="Tên giao dịch" dataIndex={"transactionName"}    key="transactionName" />
                <Column title="Ngày bắt đầu" dataIndex="Indate" key="indate" />
                <Column title="Ngày kết thúc" dataIndex="Enddate" key="endate" />
                
            </Table>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
