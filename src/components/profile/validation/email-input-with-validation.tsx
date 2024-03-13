import React from "react";
import TextInput from "../../input/text-input";

export interface EmailInputValidationProps {
  label: string | React.ReactNode;
  defaultValue?: string;
}

const EmailInputWithValidation: React.FC<EmailInputValidationProps> = ({
  label,
  defaultValue,
}) => {
  return (
    <div className="flex-auto">
      <label className="mb-2 font-semibold" htmlFor="email">
        {label}
      </label>
      <TextInput
        type="email"
        id="email"
        name="email"
        required
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default EmailInputWithValidation;
