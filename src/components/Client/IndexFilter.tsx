import { Input, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { ChangeEvent } from "react";
interface indexFilterProps {
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPlatformChange?: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  onCategoryChange?: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  categoryData: any;
}
const IndexFilter: React.FC<indexFilterProps> = ({
  onSearch,
  onCategoryChange,
  onPlatformChange,
}) => {
  return (
    <>
      <div className="flex gap-1">
        <Input
          placeholder="Enter search..."
          style={{ width: 200 }}
          onChange={onSearch}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a platform.."
          onChange={onPlatformChange}
          //   onFocus={onFocus}
          //   onBlur={onBlur}
          //   onSearch={onSearch}
        >
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
          <Select.Option value="tom">Tom</Select.Option>
        </Select>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onCategoryChange}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </div>
    </>
  );
};
export default IndexFilter;
