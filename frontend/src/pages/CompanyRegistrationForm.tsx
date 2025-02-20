import React, { useEffect, useRef } from "react";
import "../styles/CompanyRegistrationForm.css";
import { useForm } from "react-hook-form";
import { CompanyRegistrationInterface } from "../types/Types";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useMutation } from "@tanstack/react-query";
import { RegisterCompany } from "../services/CompanyServices";
import { notify } from "../utils/notification";

const CompanyRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegistrationInterface>({
    defaultValues: {
      companyName: "",
      noOfUsers: 0,
    },
  });

  const InputRef = useRef<HTMLInputElement>(null);
  const RegisterCompanyMutation = useMutation({
    mutationFn: RegisterCompany,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: "Company Registered Successfully" });
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
  const onSubmit = (data: CompanyRegistrationInterface) => {
    RegisterCompanyMutation.mutate(data);
  };

  const onError = (errors: any) => {
    if (errors.companyName) {
      InputRef.current?.focus();
    }
  };

  //

  return (
    <div className="companyregistrationform_page">
      <div className="companyregistrationform_form">
        <h3 className="section_heading">Company Registration</h3>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Company Name Input */}
          <CInput
            type="text"
            placeholder="Company Name"
            id="companyName"
            label="Company Name"
            {...register("companyName", {
              required: "Company Name is required",
            })}
            error={errors.companyName}
          />

          {/* Number of Employees Input */}
          <CInput
            type="number"
            placeholder="Number of Employees"
            id="noOfUsers"
            label="Number of Employees"
            {...register("noOfUsers", {
              required: "Number of Employees is required",
            })}
            error={errors.noOfUsers} // FIXED THIS ERROR
          />

          {/* Submit Button */}
          <div className="action_btn">
            <CButton label="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
