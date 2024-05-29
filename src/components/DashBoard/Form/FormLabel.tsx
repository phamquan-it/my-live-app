import React from "react";
interface FormLabelProps {
  title: string;
}
const FormLabel: React.FC<FormLabelProps> = ({ title }) => {
  return <span className="font-semibold">{title}</span>;
};
export default FormLabel;
