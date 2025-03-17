import "../styles/AddNewPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CDropdown from "../components/FormComponent/CDropdown";
import { notify } from "../utils/notification";
import { AddAndUpdatePasswordFunc } from "../services/PasswordServices";
import { useMutation } from "@tanstack/react-query";
import CPasswordInput from "../components/FormComponent/CPasswordInput";

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

const AddNew_Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // React Hook Form Setup
  const { register, handleSubmit, control, watch, reset, setValue } =
    useForm<AddNewPassword>();
  const categoryType = watch("categoryType");

  // Form Submit Handler
  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    console.log(data);
    const filteredFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "categoryType") return acc;
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    const payload = {
      type: data.categoryType,
      fields: filteredFields,
    };
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

  // Focus input on load for an enhanced user experience
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

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
            onChange={(e: any) => {
              console.log(e.value);
              reset();
              setValue("categoryType", e.value);
            }}
          />

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
              {/* <CInput
                label="Password"
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("password", { required: true })}
              /> */}
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
              {/*               
              <CInput
                label="Routing Number"
                id="routingNumber"
                type="text"
                placeholder="Routing Number"
                {...register("routingNumber")}
              /> */}
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
              {/* <CInput
                label="PIN"
                id="pin"
                type="password"
                autoComplete="new-password"
                placeholder="PIN"
                {...register("pin")}
                
              /> */}
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
              <CInput
                label="App Name"
                id="appName"
                autoComplete="new-password"
                type="text"
                placeholder="Enter app name"
                {...register("appName", { required: true })}
              />
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
              {/* <CInput
                label="Password"
                id="socialPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("socialPassword", { required: true })}
              /> */}
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
              {/* <CInput
                label="API Key"
                id="apiKey"
                autoComplete="new-password"
                type="text"
                placeholder="API Key"
                {...register("apiKey", { required: true })}
              /> */}
               <CPasswordInput
                 label="API Key"
                 id="apiKey"
                 autoComplete="new-password"
                 type="password"
                 placeholder="API Key"
                 {...register("apiKey", { required: true })}
              />
              {/* <CInput
                label="API Secret"
                id="apiSecret"
                type="password"
                autoComplete="new-password"
                placeholder="API Secret"
                {...register("apiSecret", { required: true })}
              /> */}
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
              {/* <CInput
                label="Password"
                id="workPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("workPassword", { required: true })}
              /> */}
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
                label="App Name"
                id="appName"
                type="text"
                autoComplete="new-password"
                placeholder="Enter app name"
                {...register("appName", { required: true })}
              />
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

          {/* Common Fields (if applicable) */}
          {/* <CInput
            label="App Name"
            id="appName"
            type="text"
            placeholder="Enter App Name"
            {...register("appName", { required: true })}
          /> */}
          {/* <CInput
            label="Website Link"
            id="url"
            type="text"
            placeholder="Website URL"
            {...register("url")}
          /> */}

          <CButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddNew_Page;
