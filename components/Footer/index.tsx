import Image from "next/image";
import React from "react";
import logo from "public/assets/imgs/glamgo.jpeg";

const Footer = () => {
  return (
    <div className="mt-20 bg-[#F4F4F4] font-lato pb-20">
      <div className=" pt-10">
        <div className="flex gap-x-4 w-max m-auto">
          <div className="relative w-16 h-16 md:w-16 md:h-16 rounded-full overflow-hidden">
            <Image src={logo} alt="" fill className="object-cover" />
          </div>
          <div>
            <p className="font-[700] font-lato text-xl md:text-2xl">GLAMZNIK</p>
            <p className="uppercase font-bold text-sm ">Accessories</p>
            <p className="uppercase text-[0.7rem]">
              Get the best perfumes and jewelries
            </p>
          </div>
        </div>
        <div className="mt-5 text-center w-[80%] md:w-[60%] lg:w-[40%] m-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua est, qui.
        </div>
      </div>

      <div className=" text-center space-y-4 mt-10">
        <p className=" uppercase font-bold text-xl">Quick Links</p>
        <p>Home</p>
        <p>Shop</p>
        <p>Products</p>
        <p>About Us</p>
        <p>Contact Us</p>
      </div>
    </div>
  );
};

export default Footer;
