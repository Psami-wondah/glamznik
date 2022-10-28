import React from "react";
import neck from "public/assets/svgs/necklace.svg";
import Heading from "components/Heading";
import FeatureCard from "./Card";
import Item from "pages/item/[slug]";

interface FeaturedProps {
  items: Item[];
}

const Featured = ({ items }: FeaturedProps) => {
  return (
    <div className="mt-20">
      <Heading text="Featured Collections" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4   m-auto mt-10 gap-x-8  justify-center gap-y-7 w-[90vw]">
        {items.map((item, index) => (
          <FeatureCard
            key={index}
            image={item.image_url}
            text={item.name}
            price={item.price}
            slug={item.slug}
          />
        ))}
      </div>

      <div className="w-max m-auto mt-10">
        <button className="uppercase py-2 px-4 bg-[#daa520] text-white hover:opacity-50">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Featured;
