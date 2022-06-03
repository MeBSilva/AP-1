import React from "react";

export type Props = {
  label?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} & React.InputHTMLAttributes<string>;

export const Input = ({ label, setValue, value }: Props) => {
  return (
    <div className="Input-container">
      <label className="Input-label" htmlFor="input">
        {label}
      </label>
      <input
        className="Input"
        id="input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace(/^[^0-9]/, ""));
        }}
        type="text"
      />
    </div>
  );
};
