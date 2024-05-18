import Link from "antd/es/typography/Link";
import LinkList from "./LinkList";
import {
  productsFooterData,
  resourcesData,
  legal_data,
  company_data,
} from "./footerData";
import { Image } from "antd";
import FollowUs from "./FollowUs";
const FooterApp = () => {
  return (
    <div className="pt-7">
      <div className="sm:container m-auto">
        <div className="flex-col ms-3 sm:ms-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 pb-5">
          <div className="lg:h-full">
            <div className="">live logo</div>
            <div className="mt-3">
              <FollowUs />
            </div>
          </div>
          <LinkList
            listName="Products"
            listCollection={productsFooterData}
            key={1}
          />
          <LinkList
            listName="Resources"
            listCollection={resourcesData}
            key={2}
          />
          <LinkList listName="Legal" listCollection={legal_data} key={3} />
          <LinkList listName="Company" listCollection={company_data} key={4} />
        </div>
      </div>
      <div className="bg-slate-100 py-3">
        <div className="container m-auto">
          <div className="flex justify-between items-center mx-3 sm:mx-0">
            <div>Copyright by antd</div>
            <div className="flex gap-1">
              <Image
                src="getongoogleplay.png"
                alt=""
                height={40}
                className="translate-y-1"
                preview={false}
              />
              <Image
                src="apple-app-store-logo.png"
                alt=""
                height={34}
                className="translate-y-2"
                preview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterApp;
