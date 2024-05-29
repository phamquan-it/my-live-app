import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../api/axiosClient";
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
    <div className="container m-auto">
      <h1>User Info</h1>
      <p>FullName:{data.data.name}</p>
      <p>Email:{data.data.email}</p>
      <p>Funds:{data.data.funds}</p>
      <p>Role:{data.data.role.name}</p>
      <p>Id User: {data.data.id}</p>
      <p>Active: {data.data.isActive}</p>
      <UserProfile />
    </div>
  );
};
export default UserInfo;
