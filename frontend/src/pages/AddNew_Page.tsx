import "../styles/AddNewPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddNewPassword } from "../types/Types";
import CDropdown from "../components/FormComponent/CDropdown";
import { notify } from "../utils/notification";
import { AddAndUpdatePasswordFunc } from "../services/PasswordServices";
import { useMutation } from "@tanstack/react-query";

// // App List
// const apps = [
//   { title: "Twitter" },
//   { title: "Instagram" },
//   { title: "Facebook" },
//   { title: "Google" },
//   { title: "Netflix" },
//   { title: "Amazon" },
//   { title: "Linkedin" },
//   { title: "Youtube" },
//   { title: "Other" },
// ];

// // Category List
// const categories = [
//   { title: "API" },
//   { title: "Card" },
//   { title: "Email" },
//   { title: "Ecom" },
//   { title: "Other" },
// ];
// // Category List
// const categories = [
//   { title: "API" },
//   { title: "Card" },
//   { title: "Email" },
//   { title: "Ecom" },
//   { title: "Other" },
// ];

// const groupedOptions = [
//   {
//     label: "Group 1",
//     items: [
//       { label: "User A", value: "userA" },
//       { label: "User B", value: "userB" },
//       { label: "User C", value: "userC" },
//       { label: "User D", value: "userD" },
//       { label: "User E", value: "userE" },
//       { label: "User F", value: "userF" },
//       { label: "User G", value: "userG" },
//       { label: "User H", value: "userH" },
//     ],
//   },
//   {
//     label: "Group 2",
//     items: [
//       { label: "User I", value: "userI" },
//       { label: "User J", value: "userJ" },
//     ],
//   },
// ];

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

const AddNew_Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // React Hook Form Setup
  const { register, handleSubmit, control } = useForm<AddNewPassword>();

  // Form Submit Handler
  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    const sendData = {
      categoryType: data.categoryType,
      categoryName: data.categoryName,
      appName: data.appName,
      username: data.username,
      email: data.email,
      password: data.password,
      url: data.url,
    };
    // navigate("/");
    AddNewPasswordMutation.mutate(sendData);
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
  // Focus Input Field on Load
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  return (
    <div className="add_new_page">
      {/* <SearchBox /> */}
      <div className="add_new_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="app_container">
            <p className="app_label">App</p>
            <div className="add_new_apps">
            
              {apps.map((app, index) => (
                <button
                  type="button"
                  className={`add_new_app ${
                    selectedApp === app.title ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedApp(app.title)}
                >
                  <p>{app.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="category_container">
            <p className="category_label">Category</p>
            <div className="add_new_categories">
              {categories.map((category, index) => (
                <button
                  type="button"
                  className={`add_new_category ${
                    selectedCategory === category.title ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedCategory(category.title)}
                >
                  <p>{category.title}</p>
                </button>
              ))}
            </div>
          </div> */}

          <CDropdown
            control={control}
            name="categoryType"
            options={categoryTypeOptions}
            placeholder="Select an type"
            label="Category Type"
            required
            
          />
          <CDropdown
            control={control}
            name="categoryName"
            options={categoryOptions}
            placeholder="Select an app"
            label="Category"
            required
           
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
          {/* <CMultiSelectDropdown
            control={control}
            name="fruits"
            options={groupedOptions}
            isMultiSelect={true}
          /> */}
          <CInput
            label="App Name"
            id="name"
            type="text"
            placeholder="Enter App Name"
            {...register("appName", { required: true })}
          />

          <CInput
            label="username"
            id="username"
            type="text"
            placeholder="username"
            {...register("username")}
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
            {...register("password", { required: true })}
          />

          <CInput
            label="Website Link"
            id="link"
            type="text"
            placeholder="Website URL"
            {...register("url")}
          />

          {/* Submit Button */}
          <CButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddNew_Page;
