import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Api } from "services/api";

export default function useDeleteItem() {
  return useMutation((slug: string) => Api.item.delete(slug), {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
