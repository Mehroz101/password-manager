import { useEffect, useRef, useState } from "react";
import "../styles/AddNewUser.css";
import CInput from "../components/FormComponent/CInput";
import { invitationInterface } from "../types/Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CButton from "../components/FormComponent/CButton";
import CDropdown from "../components/FormComponent/CDropdown";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../utils/notification";
import { SendInvitation } from "../services/CompanyServices";
const accessOptions = [
  { label: "Full Access", value: "Full Access" },
  { label: "Read only", value: "Read only" },
];
// Category List

const AddNewUser_Page = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<invitationInterface>();

  // Form Submit Handler
  const onSubmit: SubmitHandler<invitationInterface> = (data) => {
  
    const sendData = {
      email: data.email,
      accessLevel: data.accessLevel,
    };
    console.log(sendData);
    AddNewPasswordMutation.mutate(sendData);
    // navigate("/");
  };
  const AddNewPasswordMutation = useMutation({
    mutationFn: SendInvitation,
    onSuccess: (data) => {
      if (data.success) {
        notify({ type: "success", message: data.message });
        navigate("/showall");
      } else {
        notify({ type: "error", message: data.message });
      }
    },
  });

  // Focus Input Field on Load
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  return (
    <>
      <div className="addnewuser_page">
        <div className="add_new_form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CInput
              label="Email Address"
              id="email"
              type="email"
              required
              placeholder="Email Address"
              {...register("email")}
            />
            <CDropdown
              control={control}
              name="accessLevel"
              options={accessOptions}
              placeholder="Choose access level"
              label="Acess Level"
              required
              onChange={(e: any) => {
                console.log(e.value);
                setValue("accessLevel", e.value);
              }}
            />

            <CButton label="Create" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser_Page;
