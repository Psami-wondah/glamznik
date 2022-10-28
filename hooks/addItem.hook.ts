import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Api } from "services/api";
import { Auth } from "services/storage";

export type ItemData = {
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export default function useAddItem() {
  return useMutation((data: ItemData) => Api.item.add(data), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
