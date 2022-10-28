import React, { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import one from "public/assets/imgs/1.jpeg";
import two from "public/assets/imgs/2.jpeg";
import three from "public/assets/imgs/3.jpeg";
import four from "public/assets/imgs/4.jpeg";
import five from "public/assets/imgs/5.jpeg";
import Image from "next/image";
import { ItemData } from "hooks/addItem.hook";
import Link from "next/link";
import Item from "pages/item/[slug]";

interface SliderProps {
  items: Item[];
}

const Slider = ({ items }: SliderProps) => {
  const indicatorStyles: CSSProperties = {
    background: "#fff",
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
    margin: "0 6px",
  };
  return (
    <div className="relative">
      <Carousel
        // className="mt-[2vh]"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
        stopOnHover={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: "#daa520" }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              ></li>
            );
          }
          return (
            <div
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              // value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            ></div>
          );
        }}
      >
        {items.slice(0, 6).map((item, index) => (
          <div className="relative h-[70vh]" key={index}>
            <Image
              src={item.image_url}
              className="object-cover"
              fill
              alt=""
              // placeholder="blur"
            />
            <div className=" absolute px-8 lg:px-0 top-[23%] lg:right-[25%] font-lato lg:w-[50%] xl:w-[25%] text-left text-white">
              <p className=" uppercase text-lg   ">Best Collection</p>
              <p className=" text-4xl font-bold mt-4">{item.name}</p>

              <p className="mt-4 ">{item.description}</p>
              <Link href={"/item/" + item.slug}>
                <button className="uppercase py-2 px-4 bg-[#daa520] text-white mt-4 hover:opacity-50">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
