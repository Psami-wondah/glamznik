import Button from "components/button";
import Info from "components/info";
import { InputField, TextField } from "components/input";
import { ButtonSpinner, Loader } from "components/loader";
import { withAuth } from "hocs/withAuth";
import useAddItem from "hooks/addItem.hook";
import useUploadImage from "hooks/uploadImage.hook";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
interface MyFile {
  name: string;
}
const Add = () => {
  const router = useRouter();
  const fileRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
  );
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    name: "",
    price: 0,
    description: "",
    image_url: "",
  });
  const [file, setFile] = useState<File | MyFile>({ name: "Select Image" });

  const { mutate: uploadImage, isLoading: uploadImageLoading } =
    useUploadImage();

  const { mutate, isLoading } = useAddItem();

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
    mutate(data, {
      onSuccess: () => {
        router.push("/admin/dashboard");
      },
    });
  };

  return (
    <div className=" mt-[5vh] pb-[10vh] px-[4%] font-lato">
      <Head>
        <title>Admin Add Item - Glamznik Accessories</title>
      </Head>
      <div className="w-[20vh]">
        <Link href={"/admin/dashboard"}>
          <Button className="">Back</Button>
        </Link>
      </div>
      <div className="text-center space-y-5 w-[80vw] md:w-[50vw] lg:w-[30vw] m-auto mt-4">
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

export default withAuth(Add);
