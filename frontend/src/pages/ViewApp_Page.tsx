import { useLocation, useNavigate } from "react-router-dom";
// import Netflix from "../assets/netflix.png";
import "../styles/ViewApp.css";
import CInput from "../components/FormComponent/CInput";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CButton from "../components/FormComponent/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CDropdown from "../components/FormComponent/CDropdown";
import CMultiSelect from "../components/FormComponent/CMultiSelect";
import Google from "../assets/google.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddAndUpdatePasswordFunc,
  DeletePassword,
  GetSpecificPassword,
} from "../services/PasswordServices";
import CPasswordInput from "../components/FormComponent/CPasswordInput";
import { notify } from "../utils/notification";
import { formatDate } from "../utils/function";
const groupedOptions = [
  {
    label: "Group 1",
    items: [
      { label: "User A", value: "userA" },
      { label: "User B", value: "userB" },
      { label: "User C", value: "userC" },
      { label: "User D", value: "userD" },
      { label: "User E", value: "userE" },
      { label: "User F", value: "userF" },
      { label: "User G", value: "userG" },
      { label: "User H", value: "userH" },
    ],
  },
  {
    label: "Group 2",
    items: [
      { label: "User I", value: "userI" },
      { label: "User J", value: "userJ" },
    ],
  },
];

// const categoryOptions = [
//   { label: "Developement", value: "Developement" },
//   { label: "Networking", value: "Networking" },
//   { label: "Sales", value: "Sales" },
//   { label: "Support", value: "Support" },
// ];
const categoryOptions = [
  { label: "Developement", value: "Developement" },
  { label: "Networking", value: "Networking" },
  { label: "Sales", value: "Sales" },
  { label: "Support", value: "Support" },
  { label: "Google", value: "Google" },
  { label: "Gmail", value: "Gmail" },
  { label: "Netflix", value: "Netflix" },
  { label: "Amazon", value: "Amazon" },
  { label: "Linkedin", value: "Linkedin" },
  { label: "Other", value: "Other" },
];

const ViewApp_Page = () => {
  const location = useLocation(); // useLocation() returns an object
  const pathSegments = location.pathname.split("/"); // Extract pathname and split it

  const appId = pathSegments[2] || "N/A"; // Ensure there's a fallback in case it's missing
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // React Hook Form Setup
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddNewPassword>({
    defaultValues: {
      appName: "",
      username: "",
      email: "",
      password: "",
      url: "",
      categoryName: "",
    },
  });

  // Form Submit Handler
  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    const sendData = {
      categoryName: data.categoryName,
      username: data.username,
      appName: data.appName,
      email: data.email,
      password: data.password,
      url: data.url,
      passwordID: Number(appId),
    };
    console.log(sendData);
    AddNewPasswordMutation.mutate(sendData);
  };
  const deletePasswordMutation = useMutation({
    mutationFn: DeletePassword,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  const handleDeletePassword = (passwordId: number) => {
    console.log("passwordId: ", passwordId);
    deletePasswordMutation.mutate(passwordId);
  };
  const AddNewPasswordMutation = useMutation({
    mutationFn: AddAndUpdatePasswordFunc,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });
  const { data: specificData } = useQuery({
    queryKey: ["specificData"],
    queryFn: () => GetSpecificPassword(Number(appId)),
    enabled: appId ? true : false,
  });
  useEffect(() => {
    if (specificData) {
      console.log(specificData);
      setValue("appName", specificData.appName);
      setValue("username", specificData.username);
      setValue("email", specificData.email);
      setValue("password", specificData.password);
      setValue("url", specificData.webUrl);
      setValue("categoryName", specificData.categoryName);
    }
  }, [specificData]);

  return (
    <>
      <div className="viewapp_page">
        <div className="viewapp_top_card">
          <div className="top_card_left">
            <img src={specificData?.passwordImg} alt="appicon" />
          </div>
          <div className="top_card_right">
            <div className="top_card_right_top">
              <p className="top_card_title">
                {watch("appName", specificData?.appName)}
              </p>
              <p className="top_card_category">{specificData?.categoryType}</p>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeletePassword(Number(appId))}
              />
            </div>
            <div className="top_card_right_bottom">
              <p className="activity_box_account">
                <span>Last Edited: {formatDate(specificData?.updatedAt)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="form_fields">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CDropdown
              control={control}
              name="categoryName"
              options={categoryOptions}
              placeholder="Select a department"
              label="Category"
              required={true}
              onChange={(selectedOption) =>
                console.log("Selected:", selectedOption)
              }
            />
            {/* Input Fields */}
            {/* <CMultiSelect
              control={control}
              name="selectedItems"
              label="Allowed User"
              options={groupedOptions}
              placeholder="Select users"
              onChange={(selectedOptions) =>
                console.log("Selected:", selectedOptions)
              }
            /> */}
            {/* Input Fields */}
            <CInput
              label="App Name"
              id="appName"
              type="text"
              placeholder="Enter App Name"
              {...register("appName")}
            />
            <CInput
              label="Username"
              id="username"
              type="text"
              placeholder="Enter User Name"
              {...register("username")}
            />

            <CInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />

            <CPasswordInput
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <CInput
              label="Website Link"
              id="link"
              type="text"
              placeholder="Website URL"
              {...register("url")}
            />

            {/* Submit Button */}
            <CButton label="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewApp_Page;
