import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "public/assets/imgs/glamgo.jpeg";
import menu from "public/assets/svgs/menu.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import { Auth } from "services/storage";
import MobileNav from "./mobileNav";

const NavBar = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState("home");
  const [dropDown, setDropDowm] = useState(false);

  const [token, setToken] = useState(Auth.getToken());

  useEffect(() => {
    setToken(Auth.getToken());
  }, []);

  const Logout = () => {
    Auth.clearUser();
    setToken(Auth.getToken());
    router.push("/");
  };
  return (
    <div>
      <div className="w-[95%] md:w-[80%] mt-[2vh] m-auto flex md:flex-col xl:flex-row items-center gap-x-[5%] justify-between md:justify-center">
        <div className="flex gap-x-4">
          <Image src={logo} alt="" className=" w-10 md:w-16" />
          <div>
            <p className="font-bold font-lato text-2xl md:text-3xl text-jewelry-gold">
              GLAMZNIK
            </p>
            <p className="uppercase font-bold text-sm ">Accessories</p>
            <p className="uppercase text-xs">
              Get the best perfumes and jewelries
            </p>
          </div>
        </div>

        <div className="hidden md:flex gap-x-8 font-lato font-[700] text-base">
          <Link href={"/"}>
            <div
              className={`cursor-pointer py-2 border-b-2 border-transparent ${
                activePage === "home" && " text-[#daa520] border-b-[#daa520]"
              }`}
              onClick={() => setActivePage("home")}
            >
              HOME
            </div>
          </Link>
          <div
            className={`cursor-pointer py-2 border-b-2 border-transparent ${
              activePage === "products" && " text-[#daa520] border-b-[#daa520]"
            }`}
            onClick={() => setActivePage("products")}
          >
            PRODUCTS
          </div>
          {token ? (
            <Link href={"/admin/dashboard"}>
              {" "}
              <div
                className={`cursor-pointer py-2 border-b-2 border-transparent ${
                  activePage === "blog" && " text-[#daa520] border-b-[#daa520]"
                }`}
                onClick={() => setActivePage("blog")}
              >
                DASHBOARD
              </div>
            </Link>
          ) : (
            <Link href={"/admin/login"}>
              {" "}
              <div
                className={`cursor-pointer py-2 border-b-2 border-transparent ${
                  activePage === "blog" && " text-[#daa520] border-b-[#daa520]"
                }`}
                onClick={() => setActivePage("blog")}
              >
                ADMIN
              </div>
            </Link>
          )}

          <div
            className={`cursor-pointer py-2 border-b-2 border-transparent ${
              activePage === "about" && " text-[#daa520] border-b-[#daa520]"
            }`}
            onClick={() => setActivePage("about")}
          >
            ABOUT US
          </div>
          <div
            className={`cursor-pointer py-2 border-b-2 border-transparent ${
              activePage === "contact" && " text-[#daa520] border-b-[#daa520]"
            }`}
            onClick={() => setActivePage("contact")}
          >
            CONTACT US
          </div>
          {token ? (
            <div
              className={`cursor-pointer py-2 border-b-2 border-transparent ${
                activePage === "shop" && " text-[#daa520] border-b-[#daa520]"
              }`}
              onClick={() => Logout()}
            >
              LOGOUT
            </div>
          ) : null}
        </div>
        <div className="md:hidden" onClick={() => setDropDowm(!dropDown)}>
          <Image
            src={menu}
            alt=""
            className="w-8 cursor-pointer hover:opacity-60"
          />
        </div>
      </div>
      <MobileNav
        setActivePage={setActivePage}
        token={token}
        dropDown={dropDown}
        activePage={activePage}
        logout={Logout}
      />
    </div>
  );
};

export default NavBar;
