import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturCardProps {
  image: string;
  text: string;
  price: number;
  slug: string;
}

const FeatureCard = ({ image, text, price, slug }: FeaturCardProps) => {
  return (
    <Link href={"/item/" + slug}>
      <div className="font-lato text-center  bg-orange-50 w-full rounded-xl p-5 pt-10">
        <div className="relative w-[60vw] h-[60vw]  md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw] m-auto">
          <Image src={image} alt="" fill className="object-cover" />
        </div>
        <div className=" text-center pt-4">
          <p className=" font-bold text-lg">{text}</p>
          <p className=" text-2xl text-jewelry-gold">₦{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
