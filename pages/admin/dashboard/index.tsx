import Button from "components/button";

import { withAuth } from "hocs/withAuth";
import { ItemData } from "hooks/addItem.hook";
import useDeleteItem from "hooks/deleteItem.hook";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useRef, useState } from "react";
import { Api } from "services/api";

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
const Dashboard = ({ allItems }: Props) => {
  const router = useRouter();
  const { mutate, isLoading } = useDeleteItem();

  const [open, setOpen] = useState({ slug: "", state: false });

  const Delete = (slug: string) => {
    mutate(slug, {
      onSuccess: () => {
        router.reload();
      },
    });
    setOpen({ state: false, slug: "" });
  };

  return (
    <div className="px-[4%] pt-5 pb-5 font-lato">
      <Head>
        <title>Admin Dashboard - Glamznik Accessories</title>
      </Head>
      <div className=" flex justify-end ">
        <div className="w-[20vh]">
          <Link href={"/admin/dashboard/add"}>
            <Button className="">Add Item</Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className=" text-center font-bold text-4xl mt-5">Your Items</h1>{" "}
        <div className=" grid  md:grid-cols-2 lg:grid-cols-3 gap-y-9 gap-x-7 mt-5">
          {allItems.map((item, key) => (
            <div key={key} className="p-10 rounded bg-slate-100">
              <div className="relative h-[20vw] w-[20vw] m-auto rounded border-jewelry-gold border-2 overflow-hidden">
                <Image
                  src={item.image_url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center font-bold text-xl pt-3">{item.name}</p>
              <p className="text-center font-bold">₦{item.price}</p>
              <p>{item.description}</p>
              <div className=" space-x-5 pt-6">
                <Link href={"/admin/dashboard/edit/" + item.slug}>
                  <button className="bg-green-400 text-white px-6 py-2 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded"
                  onClick={() => setOpen({ state: true, slug: item.slug })}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open.state ? (
        <div
          className="fixed z-[1] top-0 left-0 w-screen h-screen bg-black bg-opacity-5"
          onClick={() => setOpen({ state: false, slug: "" })}
        >
          <div className="bg-white rounded-xl w-[80vw] md:w-[50vw] lg:w-[30vw] m-auto mt-[10vh] z-[2] p-[3rem]">
            <h2 className=" text-center font-bold text-2xl pt-5">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center gap-x-10 pt-6">
              <button
                className="bg-blue-400 text-white px-6 py-2 rounded"
                onClick={() => setOpen({ state: false, slug: "" })}
              >
                No
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2 rounded"
                onClick={() => Delete(open.slug)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withAuth(Dashboard);
