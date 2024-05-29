import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import ServicePage from "@/components/PageComponents/ServicePage";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import UserProfile from "@/components/Client/UserProfile";
export const fetchUserInfo = async () => {
  const { data } = await axiosClient.get("/user/info", {
    params: { language: "en" },
  });
  return data;
};
const UserInfo = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["userInfo", "en"], // query key with language as a parameter
    queryFn: fetchUserInfo, // query function to fetch user info
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }
  console.log(data);

  return (
    <>
      <Head>
        <title>User info</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <ServicePage>
        <div className="container m-auto">
          <UserProfile
            active={data.data.isActive}
            funds={data.data.funds}
            name={data.data.name}
            email={data.data.email}
            role={data.data.role.name}
          />
        </div>
      </ServicePage>
    </>
  );
};
export default UserInfo;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
