import { PLAYLIST_STATUS } from "@/enums";
import { useTranslate } from "@/hooks";
import { Select, SelectProps } from "antd";

type Props = {} & SelectProps;

function PlaylistStatusSelect({ ...props }: Props) {
  const { messages } = useTranslate();

  const options = [
    {
      label: "status.active",
      value: PLAYLIST_STATUS.OPEN,
    },
    {
      label: "status.block",
      value: PLAYLIST_STATUS.LOCK,
    },
  ];

  return (
    <Select
      placeholder={"status.label"}
      allowClear
      {...props}
      options={options}
    />
  );
}

export default PlaylistStatusSelect;
