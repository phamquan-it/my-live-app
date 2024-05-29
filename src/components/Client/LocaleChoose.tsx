import { Image, Select } from "antd";
import { getCookie, setCookie } from "cookies-next";
import { I18NProvider } from "next/dist/server/future/helpers/i18n-provider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function LanguageChoose(){
    
      const router = useRouter();
  return(
    <Select
          style={{ width: 200 }}
          placeholder="Choose a language" value={router.locale}
          onChange={(value)=>{
            router.push(router,'',{locale:value})
          }}
        >
          <Select.Option value={"en"}>
            <div className="flex items-center">
            <Image src='/united-kingdom.png' alt=''/> &nbsp;
            English
            </div>
            </Select.Option>
          <Select.Option value="vi">
          <div className="flex items-center">
          <Image src='/vietnam.png' alt=''/>&nbsp;
            Tiếng việt
          </div>
           </Select.Option>
        </Select>
);
} 
 export default LanguageChoose