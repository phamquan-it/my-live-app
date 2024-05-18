import { Select } from "antd";
import React, { useEffect, useState } from "react";

interface roleProps {
  onChange: (value: string) => void;
}
const Role: React.FC<roleProps> = ({ onChange }) => {
  const [roles, setRoles] = useState<number>(1);
  useEffect(() => {});
  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Role"
        onChange={(value) => {}}
      >
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="tom">Tom</Select.Option>
      </Select>
    </>
  );
};
export default Role;
