import { Input, Select } from "antd";
import React, { ChangeEventHandler, ReactNode } from "react";
export interface SelectDataProps {
  key: string | number;
  value: string | number;
  children: ReactNode;
}
interface DashBoardFilterProps {
  onSearchChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onSelectChange?: (value: any) => void;
  selectData: SelectDataProps[];
  search_placehoder?: string;
}
const DashBoardFilter: React.FC<DashBoardFilterProps> = ({
  onSearchChange,
  onSelectChange,
  selectData,
  search_placehoder,
}) => {
  return (
    <>
      <div className="flex gap-2 pb-3">
        <Input
          placeholder={search_placehoder}
          onChange={onSearchChange}
          className="!w-52"
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder=""
          onChange={onSelectChange}
        >
          {selectData.map((item) => (
            <Select.Option key={item.key} value={item.value}>
              {item.children}
            </Select.Option>
          ))}
        </Select>
      </div>
    </>
  );
};
export default DashBoardFilter;
