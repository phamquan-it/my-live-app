import { Image, Select } from "antd";
import { getCookie, setCookie } from "cookies-next";
import { I18NProvider } from "next/dist/server/future/helpers/i18n-provider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
interface LanguageChooseProps {
  onChange?: (value: string) => void;
}
const LanguageChoose: React.FC<LanguageChooseProps> = ({ onChange }) => {
  const router = useRouter();
  const switchLanguage = (value: any) => {
    router.push(router, "", { locale: value });
  };
  return (
    <Select
      style={{ width: 200 }}
      placeholder="Choose a language"
      value={router.locale}
      onChange={onChange || switchLanguage}
    >
      <Select.Option value={"en"}>
        <div className="flex items-center">
          <Image src="/united-kingdom.png" alt="" preview={false} /> &nbsp;
          English
        </div>
      </Select.Option>
      <Select.Option value="vi">
        <div className="flex items-center">
          <Image src="/vietnam.png" alt="" preview={false} />
          &nbsp; Tiếng việt
        </div>
      </Select.Option>
    </Select>
  );
};
export default LanguageChoose;
