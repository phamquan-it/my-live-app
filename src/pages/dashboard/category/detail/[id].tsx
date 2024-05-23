import axiosClient from "@/pages/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: ["categorydetail"],
    queryFn: () => {
      axiosClient.get(`categories/detail/49?language=en`);
    },
  });
  // if (isPending) return <>Loading...</>;
  // if (isError) return <>An error occured</>;
  console.log(data);

  return (
    <>
      <div className="container m-auto mt-3">
        <Card title="">
          <p>{router.query.id}</p>
        </Card>
      </div>
    </>
  );
};
export default Page;
