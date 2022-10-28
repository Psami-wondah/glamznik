import Image from "next/image";
import React from "react";

interface PerkCardProps {
  icon: string;
  text: string;
  subText: string;
}

const PerksCard = ({ icon, text, subText }: PerkCardProps) => {
  return (
    <div className=" flex items-center font-lato gap-x-3">
      <div>
        <Image src={icon} alt="" className="w-8" />
      </div>
      <div>
        <p className=" font-bold uppercase ">{text}</p>
        <p>{subText}</p>
      </div>
    </div>
  );
};

export default PerksCard;
