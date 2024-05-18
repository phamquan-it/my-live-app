import { Collapse } from "antd";
import Title from "antd/es/typography/Title";

interface Question {
  question: string;
  answer: string;
}
interface faqProps {
  key?: number;
  questions: Question[];
}
const FAQ: React.FC<faqProps> = ({ questions }) => {
  return (
    <>
      <div>
        <Title className="!text-gray-600 !font-thin !text-center">FAQ</Title>
        <Collapse
          accordion
          expandIconPosition="end"
          className="!shadow !bg-transparent"
          bordered={false}
        >
          {questions.map((item, index) => (
            <>
              <Collapse.Panel className="" header={item.question} key={index}>
                <p>{item.answer}</p>
              </Collapse.Panel>
            </>
          ))}
        </Collapse>
      </div>
    </>
  );
};
export default FAQ;
