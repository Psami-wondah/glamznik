import { TailSpin } from "react-loader-spinner";

export const ButtonSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <TailSpin width={20} height={20} color={"white"} />
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="fixed bg-black bg-opacity-10 flex justify-center w-screen h-screen items-center top-0 left-0">
      <TailSpin color="#daa520" width={60} height={60} />
    </div>
  );
};
