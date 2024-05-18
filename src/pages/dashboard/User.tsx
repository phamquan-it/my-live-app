import UserData from "@/DataType/UseDataType";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserType from "@/DataType/UserType";
import UserTable from "@/components/DashBoard/UserTable";

export default function Index() {
  const [users, setUsers] = useState<UserData>({ data: [], total: 0 });
  const fetchData = (offset: number, limit: number) => {
    axiosClient
      .get(`/user/list?language=en&limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2ZGYyNmVkMC02NWM3LTQzOTItOTJjZS01NjA3Y2MxYTA3Y2MiLCJlbWFpbCI6InBtcXVhMTIzbkBnbWFpbC5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTcxNTkwNzkyNywiZXhwIjoxNzE1OTI5NTI3fQ.uvRq-aiK1Q5KqbnD1OKB2iiv6WUF_SNgUUGe7j5YG40",
        },
      })
      .then((response) => {
        let userdata: UserData = { data: [], total: response.data.total };
        response.data.data.map((item: UserType) => {
          item.key = item.id;
          userdata.data.push(item);
          setUsers(userdata);
        });
      })
      .catch((error) => {
        console.log("An error occur" + error);
      });
  };
  useEffect(() => {
    fetchData(0, 10);
  }, []);
  return (
    <div className="container m-auto">
      <div>
        <UserTable
          data={users.data}
          total={users.total}
          onChange={(pagination, filter, sort) => {
            fetchData(
              pagination.current * pagination.pageSize - pagination.pageSize,
              pagination.current * pagination.pageSize
            );
            console.log(users);
          }}
        />
      </div>
    </div>
  );
}
