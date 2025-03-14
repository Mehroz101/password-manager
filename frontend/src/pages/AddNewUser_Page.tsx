import { useEffect, useRef, useState } from "react";
import "../styles/AddNewUser.css";
import CInput from "../components/FormComponent/CInput";
import { AddNewPassword } from "../types/Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CButton from "../components/FormComponent/CButton";
const apps = [
  { title: "Twitter" },
  { title: "Instagram" },
  { title: "Facebook" },
  { title: "Google" },
  { title: "Netflix" },
  { title: "Amazon" },
  { title: "Linkedin" },
  { title: "Youtube" },
  { title: "Other" },
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
    formState: { errors },
  } = useForm<AddNewPassword>();

  // Form Submit Handler
  const onSubmit: SubmitHandler<AddNewPassword> = (data) => {
    if (!selectedApp && !selectedCategory) {
      return alert("app and category required");
    }
    const sendData = {
      appName: selectedApp,
      categoryName: selectedCategory,
      name: data.name,
      email: data.email,
      password: data.password,
      url: data.url,
    };
    navigate("/");
  };

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
            <div className="app_container">
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
            {/* Category Selection
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
            {/* Input Fields */}
            <CInput
              label="User Name"
              id="name"
              type="text"
              placeholder="Enter User Name"
              {...register("name")}
              ref={inputRef}
            />
            <CInput
              label="Username"
              id="username"
              type="text"
              placeholder="Enter Unique Username"
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
              label="Confirm Password"
              id="cPassword"
              type="password"
              placeholder="Confirm Your Password"
              {...register("url")}
            />
            {/* Submit Button */}
            <CButton label="Create" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser_Page;
