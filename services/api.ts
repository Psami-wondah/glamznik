import AxiosInstance, { AuthAxiosInstance } from "./axiosConfig";

export const Api = {
  auth: {
    signIn: (data: object) => AxiosInstance.post("/admin/login", data),
    verifyToken: (data: object) => AxiosInstance.post("verify-token", data),
  },
  item: {
    add: (data: object) => AuthAxiosInstance.post("/admin/items", data),
    all: () => AuthAxiosInstance.get("/admin/items"),
    get: (slug: string) => AxiosInstance.get("/admin/item/" + slug),
    edit: (slug: string, data: object) =>
      AuthAxiosInstance.put("/admin/item/" + slug, data),
    delete: (slug: string) => AuthAxiosInstance.delete("/admin/item/" + slug),
  },
};
