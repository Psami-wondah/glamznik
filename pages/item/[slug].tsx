import Button from "components/button";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Api } from "services/api";
import { API_URL, MAIN_URL, PHONE_NO } from "utils/constants";
import whatsapp from "public/assets/svgs/whatsapp.svg";
import Head from "next/head";

interface Item {
  slug: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}
interface Props {
  item: Item;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const response = await Api.item.get(context.query.slug as string);

    return {
      props: {
        item: response.data.item,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        item: {},
      }, // will be passed to the page component as props
    };
  }
};

const Item = ({ item }: Props) => {
  const itemUrl = MAIN_URL + "item/" + item.slug;
  return (
    <div className="font-lato pt-20">
      <Head>
        <title>{item.name} - Glamznik Accessories</title>
      </Head>
      <div className="grid md:grid-cols-2">
        <div>
          <div className="relative w-[60vw] h-[60vw]  md:w-[30vw] md:h-[30vw] m-auto rounded-xl overflow-hidden">
            <Image alt="" src={item.image_url} fill className=" object-cover" />
          </div>
        </div>

        <div className=" m-auto px-[1rem] lg:px-[4rem] space-y-4 w-full text-center md:text-left">
          <h1 className="text-5xl font-bold">{item.name}</h1>
          <h2 className="text-3xl">{item.description}</h2>
          <h3 className=" text-jewelry-gold font-bold text-2xl">
            ₦{item.price}
          </h3>
          <Link
            href={`https://wa.me/${PHONE_NO}?text=I'm%20interested%20in%20this%20item%20${itemUrl}`}
            target="_blank"
          >
            <Button className=" flex items-center justify-center gap-x-5 w-full">
              {" "}
              <Image alt="" src={whatsapp} /> Message Seller on Whatsapp
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
