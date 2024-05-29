import React, { useEffect, useState } from "react";
import { Select } from "antd";
import RoleType from "@/DataType/RoleType";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/pages/api/axiosClient";

const { Option } = Select;
interface RoleSelectProps {
  onChange?: (value: any) => void;
}
const RoleSelect: React.FC<RoleSelectProps> = () => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const roleMutation = useMutation({
    mutationFn: () => axiosClient.get("/role/list"),
    onError: (e) => {
      console.log("Fail to connect:");
      console.log(e);
    },
    onSuccess: (data) => {
      setRoles(data.data.data);
    },
  });
  useEffect(() => {
    roleMutation.mutate();
  }, []);
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Role"
      onChange={(value) => {
        console.log(value); // Handle the change as needed
      }}
    >
      {roles.map((role: RoleType) => (
        <Option key={role.id} value={role.id}>
          <span style={{ textTransform: "uppercase" }}>{role.name}</span>
        </Option>
      ))}
    </Select>
  );
};

export default RoleSelect;
