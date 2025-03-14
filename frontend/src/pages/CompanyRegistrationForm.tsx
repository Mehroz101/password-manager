import React, { useEffect, useRef, useState } from "react";
import "../styles/CompanyRegistrationForm.css";
import { useForm } from "react-hook-form";
import {
  CompanyRegistrationInterface,
  ResponseInterface,
} from "../types/Types";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetCompanyDetail,
  RegisterCompany,
  UploadCompanyLogo,
} from "../services/CompanyServices";
import { notify } from "../utils/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DefaultProfileImg from "../assets/companyLogo.png";
const API_URL = import.meta.env.REACT_APP_API_IMAGE_URL;

const CompanyRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<CompanyRegistrationInterface>({
    defaultValues: {
      companyName: "",
      noOfUsers: 0,
    },
  });
  const { data: companyData, refetch: refetchCompany } =
    useQuery<ResponseInterface>({
      queryKey: ["companydetail"],
      queryFn: GetCompanyDetail,
    });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string>(DefaultProfileImg);

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
      fileInputRef.current?.focus();
    }
  };
  const uploadCompanyLogoMutation = useMutation({
    mutationFn: UploadCompanyLogo,
    onSuccess: (data) => {
      if (data.success) {
        notify({
          type: "success",
          message: "Company logo updated successfully",
        });
        if(data.data)
        refetchCompany();
      } else {
        notify({ type: "error", message: data.message });
      }
    },
    onError: (error: any) => {
      notify({ type: "error", message: "Error uploading image" });
    },
  });
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("companyLogo", file);
      uploadCompanyLogoMutation.mutate(formData);
    }
  };
  useEffect(() => {
    if (companyData) {
      setValue("companyName", companyData.data?.companyName);
      setValue("noOfUsers", companyData.data?.noOfUsers);
    }
  }, [companyData]);
  return (
    <div className="companyregistrationform_page">
      <div className="companyregistrationform_form">
        <div className="company_page_top">
          <div className="company_img">
            <img
              src={
                companyData?.data?.companyLogo
                  ? `${API_URL}/uploads/${companyData?.data?.companyLogo}`
                  : profileImg
              }
              alt="Company Logo"
            />

            <div
              className="edit_companyImg"
              onClick={() => fileInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
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
            error={errors?.companyName}
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
            error={errors?.noOfUsers}
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
