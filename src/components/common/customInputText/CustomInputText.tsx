import { useState } from "react";

import CustomErrorInput from "../customErrorInput";

import "./CustomInputText.scss";

interface CustomInputTextType {
  label: string;
  placeholder?: string;
  icon?: string;
  className?: string;
  onChange?: (v: string) => void;
  maxLength?: number;
  value?: string;
}

const CustomInputText = ({
  label,
  placeholder,
  icon,
  className,
  onChange,
  maxLength = 0,
  value,
}: CustomInputTextType) => {
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  const printError = (message: string) => {
    setError(message);
    setIsErrorVisible(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (maxLength > 0 && value.length > maxLength) {
      printError(
        "Insert a short name of your brand. Max 20 characters, you can include special symbols"
      );
    } else {
      setIsErrorVisible(false);
    }

    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  return (
    <div className={`custom-input-text ${className ? className : ""}`}>
      <label htmlFor={inputId}>{label}</label>

      <input
        type="text"
        id={inputId}
        placeholder={placeholder}
        style={{ backgroundImage: `url(${icon})` }}
        className={`${icon && "with-icon"} `}
        onChange={(event) => handleOnChange(event)}
        value={value}
      />

      <CustomErrorInput text={error} visible={isErrorVisible} />
    </div>
  );
};

export default CustomInputText;
