import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { Api } from "services/api";

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
  return <div>{item.name}</div>;
};

export default Item;
