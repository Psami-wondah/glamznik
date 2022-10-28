import React from "react";
import Heading from "components/Heading";

const AboutStore = () => {
  return (
    <div className="mt-20 font-lato">
      <Heading text={"About Store"} />
      <div className="m-auto text-center w-[95%] md:w-[80%] lg:w-[70%] mt-10">
        <p className=" font-bold">
          LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT, SED DO
          EIUSMOD TEMPOR IN
        </p>
        <div className="mt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </div>
      </div>
    </div>
  );
};

export default AboutStore;
