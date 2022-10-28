import Button from "components/button";
import Info from "components/info";
import { InputField, TextField } from "components/input";
import { ButtonSpinner, Loader } from "components/loader";
import { withAuth } from "hocs/withAuth";
import useEditItem from "hooks/editItem.hook";
import useUploadImage from "hooks/uploadImage.hook";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { Api } from "services/api";

export interface Item {
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

interface MyFile {
  name: string;
}
const Edit = ({ item }: Props) => {
  const router = useRouter();
  const fileRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
  );
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    name: item.name,
    price: item.price,
    description: item.description,
    image_url: item.image_url,
  });
  const [file, setFile] = useState<File | MyFile>({ name: "Select Image" });

  const { mutate: uploadImage, isLoading: uploadImageLoading } =
    useUploadImage();

  const { mutate, isLoading } = useEditItem();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleImage: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => {
    if (!e.target.files) return console.error("No file selected");
    const filesHere = e.target.files;

    const file = filesHere[0];
    // check if file is an image
    if (!file) return toast.error("No File Selected");

    if (file.size > 1000000) return toast.error("File is larger than 1mb");

    const currentImage = URL.createObjectURL(file);
    // setPreviewUrl(currentImage);

    setFile(file);

    uploadImage(file, {
      onSuccess: async (response) => {
        const { secure_url } = await response.json();
        setPreviewUrl(secure_url);
        setData({ ...data, image_url: secure_url });
      },
    });
  };

  const clickFile = () => {
    fileRef?.current?.click();
  };

  const handleSubmit = () => {
    const { description, name, image_url, price } = data;
    if (name.trim() === "" || name === null) {
      return setErr("please enter a name");
    }
    if (description.trim() === "" || description === null) {
      return setErr("please enter a description");
    }
    if (price === 0 || price === null) {
      return setErr("please enter a price");
    }
    if (image_url.trim() === "" || image_url === null) {
      return setErr("please select an image");
    }
    mutate(
      { data, slug: item.slug },
      {
        onSuccess: () => {
          router.push("/admin/dashboard");
        },
      }
    );
  };

  return (
    <div className=" mt-[5vh] pb-[10vh] px-[4%]">
      <div className="w-[20vh]">
        <Link href={"/admin/dashboard"}>
          <Button className="">Back</Button>
        </Link>
      </div>
      <div className="text-center space-y-5 w-[30vw] m-auto">
        <h1 className=" text-3xl font-bold uppercase">Add Item</h1>
        {err && <Info type="warning" name="Error" message={err} />}
        <InputField
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          value={data.name}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="number"
          placeholder="Price"
          name="price"
          id="price"
          value={data.price}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          placeholder="Description"
          name="description"
          id="description"
          value={data.description}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="file"
          className=" -ml-[9999px]"
          ref={fileRef}
          onChange={handleImage}
          accept="image/*"
        />

        <div className="flex justify-center">
          <div className="relative h-[30vh] w-[30vh] border-2 border-jewelry-gold">
            {uploadImageLoading ? (
              <div className=" text-jewelry-gold flex items-center justify-center h-full ">
                <TailSpin color="#daa520" width={30} height={30} />
              </div>
            ) : (
              <Image
                alt=""
                src={data.image_url || previewUrl}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => clickFile()}
          className="border-2 border-jewelry-gold py-[10px] w-[70%] font-[700] text-jewelry-gold rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
        >
          {file.name}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="bg-jewelry-gold py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
        >
          {isLoading ? <ButtonSpinner /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default withAuth(Edit);
