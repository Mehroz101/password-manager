import "../styles/AddNewPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CDropdown from "../components/FormComponent/CDropdown";
import { notify } from "../utils/notification";
import {
  AddAndUpdatePasswordFunc,
  GetSpecificPassword,
} from "../services/PasswordServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import CPasswordInput from "../components/FormComponent/CPasswordInput";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const categoryOptions = [
  { label: "API", value: "API" },
  { label: "Card", value: "Card" },
  { label: "Email", value: "Email" },
  { label: "Social", value: "Social" },
  { label: "Bank", value: "Bank" },
  { label: "Wi‑Fi", value: "Wi-Fi" },
  { label: "Work", value: "Work" },
  { label: "Other", value: "Other" },
];
interface Payload {
  type: string;
  fields: Record<string, any>;
  passwordID?: number;
  showCompany: boolean;
}

const AddNew_Page = () => {
  const navigate = useNavigate();
  const [companyPass, setCompanyPass] = useState<boolean>(false);

  const { id } = useParams(); // assuming your route is something like /editpassword/:id
const appId = id ?? null;
  const { userData } = useSelector((state: RootState) => state.profile);
  const { register, handleSubmit, control, watch, reset, setValue } =
    useForm<AddNewPassword>();
  const categoryType = watch("categoryType");

  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    const filteredFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "categoryType") return acc;
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    let payload: Payload = {
      type: data.categoryType,
      fields: filteredFields,
      showCompany: companyPass,
    };
    if (appId) {
      payload = {
        type: data.categoryType,
        fields: filteredFields,
        passwordID: Number(appId),
        showCompany: companyPass,
      };
    }
    AddNewPasswordMutation.mutate(payload);
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
    enabled: !!appId,
  });

  useEffect(() => {
    reset();
    console.log("specificData", specificData);
    console.log("appId", appId);
    if (specificData && appId) {
      console.log("called");
      setValue("categoryType", specificData.type);
      Object.entries(specificData.fields).forEach(([key, value]) => {
        setValue(key as keyof AddNewPassword, value as string);
      });
      setCompanyPass(!!specificData?.companyPass);
      console.log("specificData", !!specificData.companyPass);
    }
  }, [specificData]);
  return (
    <div className="add_new_page">
  

      <div className="add_new_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CDropdown
            control={control}
            name="categoryType"
            options={categoryOptions}
            placeholder="Select an app"
            label="Category"
            required
            disabled={appId ? true : false}
            onChange={(e: any) => {
              console.log(e.value);
              reset();
              setValue("categoryType", e.value);
            }}
          />
          {categoryType && (
            <CInput
              label="App Name"
              id="appName"
              type="text"
              autoComplete="new-password"
              placeholder="Enter app name"
              {...register("appName", { required: true })}
            />
          )}
          {categoryType === "Email" && (
            <>
              <CInput
                label="Email Address"
                id="email"
                autoComplete="new-password"
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
              />

              <CPasswordInput
                label="Password"
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <CInput
                label="Recovery Email/Phone"
                id="recovery"
                type="text"
                autoComplete="new-password"
                placeholder="Recovery Email or Phone Number"
                {...register("recovery")}
              />
            </>
          )}

          {categoryType === "Bank" && (
            <>
              <CInput
                label="Bank Name"
                id="bankName"
                type="text"
                autoComplete="new-password"
                placeholder="Bank Name"
                {...register("bankName", { required: true })}
              />
              <CInput
                label="Account Number"
                id="accountNumber"
                type="text"
                autoComplete="new-password"
                placeholder="Account Number"
                {...register("accountNumber", { required: true })}
              />
            </>
          )}

          {categoryType === "Card" && (
            <>
              <CInput
                label="Card Holder Name"
                id="cardHolderName"
                type="text"
                autoComplete="new-password"
                placeholder="Card Holder Name"
                {...register("cardHolderName", { required: true })}
              />
              <CInput
                label="Card Number"
                id="cardNumber"
                type="text"
                autoComplete="new-password"
                placeholder="Card Number"
                {...register("cardNumber", { required: true })}
              />
              <CInput
                label="Expiration Date"
                id="expirationDate"
                type="text"
                autoComplete="new-password"
                placeholder="MM/YY"
                {...register("expirationDate", { required: true })}
              />
              <CInput
                label="CVV"
                id="cvv"
                type="text"
                autoComplete="new-password"
                placeholder="CVV"
                {...register("cvv", { required: true })}
              />

              <CPasswordInput
                label="PIN"
                id="pin"
                type="password"
                autoComplete="new-password"
                placeholder="PIN"
                {...register("pin")}
              />
            </>
          )}

          {categoryType === "Social" && (
            <>
              {/* <CInput
                label="App Name"
                id="appName"
                autoComplete="new-password"
                type="text"
                placeholder="Enter app name"
                {...register("appName", { required: true })}
              /> */}
              <CInput
                label="Username"
                id="socialUsername"
                type="text"
                autoComplete="new-password"
                placeholder="Username"
                {...register("socialUsername")}
              />
              <CInput
                label="Email"
                id="socialEmail"
                type="email"
                autoComplete="new-password"
                placeholder="Email Address"
                {...register("socialEmail")}
              />

              <CPasswordInput
                label="Password"
                id="socialPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("socialPassword", { required: true })}
              />
              <CInput
                label="Phone Number"
                id="socialPhone"
                type="text"
                autoComplete="new-password"
                placeholder="Phone Number"
                {...register("socialPhone")}
              />
            </>
          )}

          {categoryType === "API" && (
            <>
              <CPasswordInput
                label="API Key"
                id="apiKey"
                autoComplete="new-password"
                type="password"
                placeholder="API Key"
                {...register("apiKey", { required: true })}
              />

              <CPasswordInput
                label="API Secret"
                id="apiSecret"
                type="password"
                autoComplete="new-password"
                placeholder="API Secret"
                {...register("apiSecret", { required: true })}
              />
              <CInput
                label="Endpoint URL"
                id="endpoint"
                autoComplete="new-password"
                type="text"
                placeholder="Endpoint URL"
                {...register("endpoint", { required: true })}
              />
            </>
          )}

          {categoryType === "Wi-Fi" && (
            <>
              <CInput
                label="Wifi Name"
                id="wifiName"
                autoComplete="new-password"
                type="text"
                placeholder="Wi‑Fi name"
                {...register("wifiName", { required: true })}
              />
              {/* <CInput
                label="Wi‑Fi Password"
                id="wifiPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Wi‑Fi Password"
                {...register("wifiPassword", { required: true })}
              /> */}
              <CPasswordInput
                label="Wi‑Fi Password"
                id="wifiPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Wi‑Fi Password"
                {...register("wifiPassword", { required: true })}
              />
            </>
          )}

          {categoryType === "Work" && (
            <>
              <CInput
                label="Work Email"
                id="workEmail"
                type="email"
                autoComplete="new-password"
                placeholder="Work Email"
                {...register("workEmail", { required: true })}
              />
              <CInput
                label="Employee ID"
                id="employeeId"
                type="text"
                placeholder="Employee ID"
                {...register("employeeId")}
              />

              <CPasswordInput
                label="Password"
                id="workPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("workPassword", { required: true })}
              />
              <CInput
                label="Login URL"
                id="loginUrl"
                type="text"
                autoComplete="new-password"
                placeholder="Login URL"
                {...register("loginUrl")}
              />
            </>
          )}

          {categoryType === "Other" && (
            <>
              <CInput
                label="Details"
                id="otherDetails"
                type="text"
                autoComplete="new-password"
                placeholder="Enter details"
                {...register("otherDetails", { required: true })}
              />
            </>
          )}
          {userData?.companyOwner && (
            <div className="companycheckbox">
              <input
                type="checkbox"
                name="companyPass"
                onChange={(e) => {
                  setCompanyPass(e.target.checked);
                }}
                checked={companyPass}
                id="companyPass"
              />
              <label htmlFor="companyPass">
                Register as a company password
              </label>
            </div>
          )}
          <CButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddNew_Page;
