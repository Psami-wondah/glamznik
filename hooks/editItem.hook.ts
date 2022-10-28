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

export default function useEditItem() {
  return useMutation(
    ({ data, slug }: { data: ItemData; slug: string }) =>
      Api.item.edit(slug, data),
    {
      onSuccess: ({ data }) => {
        toast.success(data.message);
      },
      onError: (err: any) => {
        toast.error(err);
      },
    }
  );
}
