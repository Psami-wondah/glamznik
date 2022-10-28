import { useMutation } from "react-query";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "utils/constants";

export default function useUploadImage() {
  return useMutation(
    async (file: Blob) => {
      console.log("omor");
      const formData = new FormData();
      formData.append("file", file);
      const options = { method: "POST", body: formData };
      formData.append("upload_preset", CLOUDINARY_PRESET);
      return fetch(CLOUDINARY_URL, options);
    },
    {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (err: any) => {},
    }
  );
}
