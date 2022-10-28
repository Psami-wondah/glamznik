import React from "react";
import earring from "public/assets/imgs/earin.png";
import Heading from "components/Heading";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <div className="mt-20">
      <Heading text="Our Categories" />
      <div className="flex flex-col md:flex-row w-max md:w-full lg:w-max m-auto mt-10 gap-x-5 flex-wrap justify-center">
        <CategoryCard image={earring} category="Earrings" />
        <CategoryCard image={earring} category="Earrings" />
        <CategoryCard image={earring} category="Earrings" />
        <CategoryCard image={earring} category="Earrings" />
      </div>
    </div>
  );
};

export default Categories;
