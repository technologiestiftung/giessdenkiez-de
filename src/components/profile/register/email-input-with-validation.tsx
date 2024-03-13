import React from "react";
import TextInput from "../../input/text-input.tsx";

const EmailInputWithValidation: React.FC = () => {
  return (
    <>
      <label htmlFor="email" className="">
        Email
      </label>
      <TextInput type="email" id="email" name="email" />
    </>
  );
};

export default EmailInputWithValidation;
