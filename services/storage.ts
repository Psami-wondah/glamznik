export const Auth = {
  getToken: () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user) {
        const token = user.access_token;
        return token as string;
      }
      return null;
    } else {
      return null;
    }
  },
  setUser: (user: object) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },
  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  },
};
