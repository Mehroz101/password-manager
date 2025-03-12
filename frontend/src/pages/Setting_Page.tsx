import "../styles/Setting.css";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResponseInterface, UserDetailInterface } from "../types/Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notify } from "../utils/notification";
import { useNavigate } from "react-router-dom";
import { GetUserProfileData, UserDetail } from "../services/UserProfileService";
import { useEffect } from "react";

const Setting_Page = () => {
  const { register, handleSubmit,setValue } = useForm<UserDetailInterface>({
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      nPassword: "",
    },
  });
  const { data: userData } = useQuery<ResponseInterface>({
    queryKey: ["userData"],
    queryFn: GetUserProfileData,
  });
const navigate = useNavigate()
  const onsubmit: SubmitHandler<UserDetailInterface> = (data) => {
    console.log("Form Data:", data);
    const sendData = {
      username: data.username,
      fullname: data.fullname,
      password: data.password,
      nPassword: data.nPassword,
    };
    console.log(sendData);
    // navigate("/");
    userDetailMutation.mutate(sendData);
  };
  const userDetailMutation = useMutation({
    mutationFn: UserDetail,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  useEffect(()=>{
    if(userData){
      console.log(userData.data)
      const userdata = userData.data?.user;
      setValue("username",userdata?.username || "")
      setValue("fullname",userdata?.fullname || "")
    }
  },[userData])
  return (
    <>
      <div className="setting_page">
        <div className="setting_form">
          <form onSubmit={handleSubmit(onsubmit)} >
            <CInput
              type="text"
              placeholder="Username"
              id="username"
              label="Username"
              disabled={true}
              {...register("username")}
            />
            <CInput
              type="text"
              placeholder="Full Name"
              id="fullname"
              label="Full Name"
              {...register("fullname")}
            />
            <CInput
              type="password"
              placeholder="Old Password"
              id="password"
              label="Old Password"
              {...register("password")}
            />
            <CInput
              type="password"
              placeholder="New Password"
              id="new_password"
              label="New Password"
              {...register("nPassword")}
            />
            <CButton label="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting_Page;