import React from "react";

interface HeadingProps {
  text: string;
}

const Heading = ({ text }: HeadingProps) => {
  return (
    <div className=" font-lato text-3xl w-max m-auto relative py-3">
      {text}
      <div className=" absolute border-b-jewelry-gold border-b right-[30%] left-[30%] bottom-0"></div>
    </div>
  );
};

export default Heading;
