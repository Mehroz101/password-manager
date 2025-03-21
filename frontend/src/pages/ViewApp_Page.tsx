import { useLocation, useNavigate } from "react-router-dom";
// import Netflix from "../assets/netflix.png";
import "../styles/ViewApp.css";
import CInput from "../components/FormComponent/CInput";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CButton from "../components/FormComponent/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CDropdown from "../components/FormComponent/CDropdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddAndUpdatePasswordFunc,
  DeletePassword,
  GetSpecificPassword,
} from "../services/PasswordServices";
import CPasswordInput from "../components/FormComponent/CPasswordInput";
import { notify } from "../utils/notification";
import { formatDate } from "../utils/function";
const categoryOptions = [
  { label: "Developement", value: "Developement" },
  { label: "Wifi", value: "Wifi" },
  { label: "Card", value: "Card" },
  { label: "Support", value: "Support" },
  { label: "Google", value: "Google" },
  { label: "Gmail", value: "Gmail" },
  { label: "Netflix", value: "Netflix" },
  { label: "Linkedin", value: "Linkedin" },
  { label: "Other", value: "Other" },
];
const categoryTypeOptions = [
  { label: "API", value: "API" },
  { label: "Card", value: "Card" },
  { label: "Email", value: "Email" },
  { label: "Social", value: "Social" },
  { label: "Other", value: "Other" },
];

const ViewApp_Page = () => {
  const location = useLocation(); // useLocation() returns an object
  const pathSegments = location.pathname.split("/"); // Extract pathname and split it

  const appId = pathSegments[2] || "N/A"; // Ensure there's a fallback in case it's missing
  const navigate = useNavigate();

  // React Hook Form Setup
  const { control, register, handleSubmit, setValue, watch } =
    useForm<AddNewPassword>({
      defaultValues: {
        appName: "",
        username: "",
        email: "",
        password: "",
        url: "",
        categoryName: "",
        categoryType: "",
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
      categoryType: data.categoryType,
      passwordID: Number(appId),
    };
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
      setValue("appName", specificData.appName);
      setValue("username", specificData.username);
      setValue("email", specificData.email);
      setValue("password", specificData.password);
      setValue("url", specificData.webUrl);
      setValue("categoryName", specificData.categoryName);
      setValue("categoryType", specificData.categoryType);
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
                <span>
                  {specificData?.lastAction.actionType}:{" "}
                  {formatDate(specificData?.updatedAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="form_fields">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CDropdown
              control={control}
              name="categoryType"
              options={categoryTypeOptions}
              placeholder="Select a type"
              label="Category Type"
              required={true}
             
            />
            <CDropdown
              control={control}
              name="categoryName"
              options={categoryOptions}
              placeholder="Select a department"
              label="Category"
              required={true}
              
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
