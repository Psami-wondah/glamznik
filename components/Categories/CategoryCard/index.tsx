import Image, { StaticImageData } from "next/image";
import React from "react";

interface CategoryProps {
  image: StaticImageData | string;
  category: string;
}

const CategoryCard = ({ image, category }: CategoryProps) => {
  return (
    <div className="w-max">
      <div>
        <Image src={image} alt="" className=" w-56 h-36 object-cover" />
      </div>
      <p className="uppercase text-xl font-lato text-center mt-3">{category}</p>
    </div>
  );
};

export default CategoryCard;
