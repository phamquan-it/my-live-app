import ButtonFormModal from "@/components/DashBoard/components/General/ButtonFormModal";
import { Form, Input } from "antd";

const About = () => {
  return (
    <>
      <ButtonFormModal
        modalTitle={"Create new user"}
        formFields={
          <>
            <Form.Item label="" name="Category">
              <Input placeholder="Basic usage" />
            </Form.Item>
          </>
        }
        submitButton=""
        buttonTitle="Create"
        modalClassName=""
      />
    </>
  );
};
export default About;
