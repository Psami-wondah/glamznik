import React from "react";
import Categories from "components/Categories";
import Featured from "components/Featured";
import Footer from "components/Footer";
import Perks from "components/Perks";
import Slider from "components/Slider";
import AboutStore from "components/AboutStore";

import { GetServerSideProps } from "next";

import { Api } from "services/api";
import Head from "next/head";

interface Item {
  slug: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}
interface Props {
  allItems: Item[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await Api.item.all();

    return {
      props: {
        allItems: response.data.items,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        allItems: [],
      }, // will be passed to the page component as props
    };
  }
};

export default function Page(props: Props) {
  return (
    <div className=" font-lato">
      <Head>
        <title>Glamznik Accessories</title>
      </Head>
      <Slider items={props.allItems} />
      <Perks />
      {/* <Categories /> */}
      <Featured items={props.allItems} />
      <AboutStore />
      <Footer />
    </div>
  );
}
