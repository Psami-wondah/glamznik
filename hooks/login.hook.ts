import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Api } from "services/api";
import { Auth } from "services/storage";

export type LoginData = {
  username: string;
  password: string;
};

export default function useLogin() {
  return useMutation((data: LoginData) => Api.auth.signIn(data), {
    onSuccess: ({ data }) => {
      Auth.setUser(data);
      toast.success(data.message);
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });
}
