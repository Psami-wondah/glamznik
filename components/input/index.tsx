import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import eye from "public/assets/svgs/eye.svg";
import eyeOff from "public/assets/svgs/eye-off.svg";

export const InputField = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const [typeState, setTypeState] = useState(props.type);
  const handleType = () => {
    if (typeState == "password") {
      setTypeState("text");
    } else {
      setTypeState("password");
    }
  };
  return (
    <div className="mb-4 relative">
      {/* <label className="block mb-1" htmlFor={name}>
        {label}
      </label> */}
      <input
        {...props}
        type={typeState}
        className={
          "py-2  border-b border-[#EAEAEA] focus:border-b-jewelry-gold focus:outline-none disabled:bg-gray-100 mt-1 block w-full placeholder:text-base" +
          " " +
          props.className
        }
      />
      {props.type == "password" && (
        <div
          className="absolute right-0 top-[30%] cursor-pointer"
          onClick={() => {
            handleType();
          }}
        >
          <Image
            className="w-6 "
            src={typeState == "password" ? eye : eyeOff}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

interface TextFieldProps {
  name: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  id: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  readonly?: boolean;
  min?: string;
}

export const TextField = ({
  name,
  placeholder,
  value,
  id,
  onChange,
  readonly,
  min,
  ...props
}: TextFieldProps) => {
  return (
    <div className="mb-4 relative">
      {/* <label className="block mb-1" htmlFor={name}>
        {label}
      </label> */}
      <textarea
        required
        onChange={onChange}
        id={id ? id : name}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        {...props}
        className="py-2  border-b border-[#EAEAEA] focus:border-b-jewelry-gold focus:outline-none disabled:bg-gray-100 mt-1 w-full placeholder:text-base"
      />
    </div>
  );
};
