import { useLocation, useNavigate } from "react-router-dom";
import Netflix from "../assets/netflix.png";
import "../styles/ViewApp.css";
import CInput from "../components/FormComponent/CInput";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CButton from "../components/FormComponent/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CDropdown from "../components/FormComponent/CDropdown";
import CMultiSelect from "../components/FormComponent/CMultiSelect";

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

const categoryOptions = [
  { label: "Developement", value: "Developement" },
  { label: "Networking", value: "Networking" },
  { label: "Sales", value: "Sales" },
  { label: "Support", value: "Support" },
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
    formState: { errors },
  } = useForm<AddNewPassword>();

  // Form Submit Handler
  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    const sendData = {
      appName: selectedApp,
      categoryName: selectedCategory,
      name: data.name,
      email: data.email,
      password: data.password,
      url: data.url,
    };
    console.log(sendData);
    navigate("/");
  };

  return (
    <>
      <div className="viewapp_page">
        <div className="viewapp_top_card">
          <div className="top_card_left">
            <img src={Netflix} alt="appicon" />
          </div>
          <div className="top_card_right">
            <div className="top_card_right_top">
              <p className="top_card_title">Netflix</p>
              <p className="top_card_category">Streaming</p>
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className="top_card_right_bottom">
              <p className="activity_box_account">
                <span>Last Edited: 12/07/2024</span> <span>12:40pm</span>
              </p>
            </div>
          </div>
        </div>
        <div className="form_fields">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CDropdown
              control={control}
              name="category"
              options={categoryOptions}
              placeholder="Select a department"
              label="Category"
              onChange={(selectedOption) =>
                console.log("Selected:", selectedOption)
              }
            />
            {/* Input Fields */}
            <CMultiSelect
              control={control}
              name="selectedItems"
              label="Allowed User"
              options={groupedOptions}
              placeholder="Select users"
              onChange={(selectedOptions) =>
                console.log("Selected:", selectedOptions)
              }
            />
            {/* Input Fields */}
            <CInput
              label="App Name"
              id="appName"
              type="text"
              placeholder="Enter App Name"
              {...register("name")}
            />

            <CInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />

            <CInput
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
