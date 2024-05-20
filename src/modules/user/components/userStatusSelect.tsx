import { USER_STATUS } from "@/enums";
import { useTranslate } from "@/hooks";
import { Select, SelectProps } from "antd";

type Props = {} & SelectProps;

function UserStatusSelect({ ...props }: Props) {
  const { messages } = useTranslate();

  const options = [
    {
      label: " messages('status.active')",
      value: USER_STATUS.OPEN,
    },
    {
      label: "messages('status.block')",
      value: USER_STATUS.LOCK,
    },
  ];

  return (
    <Select
      placeholder="{messages('status.label')}"
      allowClear
      {...props}
      options={options}
    />
  );
}

export default UserStatusSelect;
