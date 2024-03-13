import React from "react";
import TextInput from "../../input/text-input";

const EmailInputWithValidation: React.FC = () => {
  return (
    <>
      <label htmlFor="email">Email</label>
      <TextInput type="email" id="email" required name="email" />
    </>
  );
};

export default EmailInputWithValidation;
