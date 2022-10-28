import Link from "next/link";
import React from "react";

interface MobileNavProps {
  dropDown: boolean;
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
  logout: () => void;
}

const MobileNav = ({
  dropDown,
  activePage,
  setActivePage,
  token,
  logout,
}: MobileNavProps) => {
  return (
    <div
      className={` md:hidden flex-col gap-x-8 font-lato font-[700] text-base ${
        dropDown ? "flex" : "hidden"
      }`}
    >
      <Link href={"/"}>
        <div
          className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
            activePage === "home" && " text-[#daa520] border-b-[#daa520]"
          }`}
          onClick={() => setActivePage("home")}
        >
          HOME
        </div>
      </Link>
      <div
        className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
          activePage === "products" && " text-[#daa520] border-b-[#daa520]"
        }`}
        onClick={() => setActivePage("products")}
      >
        PRODUCTS
      </div>
      {token ? (
        <Link href={"/admin/dashboard"}>
          <div
            className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
              activePage === "blog" && " text-[#daa520] border-b-[#daa520]"
            }`}
            onClick={() => setActivePage("blog")}
          >
            DASHBOARD
          </div>
        </Link>
      ) : (
        <Link href={"/admin/login"}>
          <div
            className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
              activePage === "blog" && " text-[#daa520] border-b-[#daa520]"
            }`}
            onClick={() => setActivePage("blog")}
          >
            ADMIN
          </div>
        </Link>
      )}

      <div
        className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
          activePage === "about" && " text-[#daa520] border-b-[#daa520]"
        }`}
        onClick={() => setActivePage("about")}
      >
        ABOUT US
      </div>
      <div
        className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
          activePage === "contact" && " text-[#daa520] border-b-[#daa520]"
        }`}
        onClick={() => setActivePage("contact")}
      >
        CONTACT US
      </div>
      {token ? (
        <div
          className={`cursor-pointer py-2 border-b-2 border-transparent w-max m-auto ${
            activePage === "shop" && " text-[#daa520] border-b-[#daa520]"
          }`}
          onClick={() => logout()}
        >
          SHOP
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
