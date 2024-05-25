import { Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
interface ConfirmDeleteProps {
  onCancel?: () => void;
  onAccept?: () => void;
}
const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onAccept,
  onCancel,
}) => {
  const t = useTranslations("general");
  return (
    <>
      <div className="flex gap-2 justify-end">
        <Button type="primary" danger onClick={onAccept}>
          {t("accept")}
        </Button>
        <Button type="default" onClick={onCancel}>
          {t("cancel")}
        </Button>
      </div>
    </>
  );
};
export default ConfirmDelete;
