import { useState } from "react";
import AuthLogo from "../assets/14680406.png";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthInterface } from "../types/Types";
import { useMutation } from "@tanstack/react-query";
import { LoginFunc, SignupFunc } from "../services/AuthService";
import { notify } from "../utils/notification";


const Auth_Page = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AuthInterface>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cPassword: "",
    },
  });
  const LoginMutation = useMutation({
    mutationFn: LoginFunc,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        localStorage.setItem("passwordmanager", data.data.token);
        navigate("/profile");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
    onError: (error: any) => {

      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      notify({ type: "error", message: errorMessage });
    },
  });
  const SignupMutation = useMutation({
    mutationFn: SignupFunc,
    onSuccess: (data) => {
      if (data.success) {
        setIsLogin(true);
        notify({ type: "success", message: data.message });
      } else {
        notify({ type: "error", message: data.message });
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      notify({ type: "error", message: errorMessage });
    },
  });

  const formSubmitHandler = (data: AuthInterface) => {
    if (!data.username || !data.email || !data.password)
      return notify({ type: "warning", message: "All fields are required" });
    if (isLogin) {
      let sendData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      LoginMutation.mutate(sendData);
    } else {
      if (data.password !== data.cPassword) {
        return notify({
          type: "error",
          message: "Passwords do not match",
        });
      }
      let sendData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      SignupMutation.mutate(sendData);
    }
    // navigate("/");
  };

  return (
    <div className="auth_page">
      <div className="auth_page_container">
        <div className="auth_page_top">
          <div className="auth_logo">
            <img src={AuthLogo} alt="Auth Logo" />
          </div>
          <div className="auth_main_text">
            <h2>PassKey</h2>
            <p>Frictionless Security</p>
          </div>
        </div>

        <div className="auth_page_form_container">
          <div className="auth_form_top">
            <button
              className={isLogin ? "" : "active"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          <p className="form_title">Personal details</p>
          <div className="auth_form_fields">
            <input
              type="text"
              placeholder="Enter username"
              {...register("username")}
            />
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("cPassword")}
              />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Fixed Login Button at Bottom */}
      <div className="auth_page_btn action_btn">
        <button
          onClick={() => {
            handleSubmit(formSubmitHandler)();
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Auth_Page;
