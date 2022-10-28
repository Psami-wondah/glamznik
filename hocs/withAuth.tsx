/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import useVerifyToken from "hooks/verifyToken.hook";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Auth } from "services/storage";
import { Loader } from "../components/loader";
export const withAuth = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useVerifyToken();
    useEffect(() => {
      (async () => {
        // if no accessToken was found,then we redirect to "/" page.
        if (!Auth.getToken()) {
          router.push("/");
        } else {
          // we call the api that verifies the token.
          mutate(
            { access_token: Auth.getToken() as string },
            {
              onSuccess: () => {
                setIsAuthenticated(true);
                setIsLoading(false);
              },
              onError: () => {
                Auth.clearUser();
                router.push("/admin/login");
                toast.error("Please Log In");
              },
            }
          );
        }
      })();
    }, [Auth.getToken()]);

    // check loading state
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    if (isAuthenticated) {
      return <WrappedComponent isLoading={isLoading} {...props} />;
    }
    return null;
  };
};
