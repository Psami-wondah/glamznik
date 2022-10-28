import React from "react";
import money_back from "public/assets/svgs/perks/money_back.svg";
import support from "public/assets/svgs/perks/support.svg";
import secure_payment from "public/assets/svgs/perks/secure_payment2.svg";
import PerksCard from "./PerksCard";

const Perks = () => {
  return (
    <div className="w-max md:w-full lg:w-max m-auto flex flex-col md:flex-row gap-x-10 gap-y-10 mt-20 md:flex-wrap justify-center">
      <PerksCard
        icon={money_back}
        text="Money Back Guarantee!"
        subText="100% money back in 20 days"
      />
      <PerksCard
        icon={support}
        text="Premium Support"
        subText="We support online 24 hours a day"
      />
      <PerksCard
        icon={secure_payment}
        text="Secure Payment"
        subText="We ensure secure payment"
      />
    </div>
  );
};

export default Perks;
