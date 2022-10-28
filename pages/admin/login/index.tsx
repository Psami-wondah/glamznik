import Info from "components/info";
import { InputField } from "components/input";
import { ButtonSpinner } from "components/loader";
import useLogin from "hooks/login.hook";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Auth } from "services/storage";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const { mutate, isLoading } = useLogin();

  function login() {
    const { username, password } = data;

    if (username.trim() === "" || username === null) {
      return setErr("please enter your username");
    }
    if (password.trim() === "" || password === null) {
      return setErr("please enter your password");
    }
    setErr("");
    mutate(data, {
      onSuccess: () => {
        router.push("/admin/dashboard");
      },
    });
  }

  useEffect(() => {
    if (Auth.getToken()) {
      router.push("/admin/dashboard");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value.trim(),
    });
  };
  return (
    <div className="flex justify-center mt-[10vh]">
      <div className=" space-y-5">
        <h1 className=" text-3xl font-bold uppercase">Glamznik Admin Login</h1>
        {err && <Info type="warning" name="Error" message={err} />}
        <InputField
          type="text"
          placeholder="Username"
          name="username"
          id="usrname"
          onChange={(e) => handleChange(e)}
          value={data.username}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          id="pass"
          onChange={(e) => handleChange(e)}
          value={data.password}
        />
        <div className="text-center">
          <button
            type="button"
            onClick={() => login()}
            className="bg-jewelry-gold py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
          >
            {isLoading ? <ButtonSpinner /> : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
