import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../components/SearchBox";
import "../styles/AddNewPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddNewPassword } from "../types/Types";

// App List
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
const categories = [
  { title: "API" },
  { title: "Card" },
  { title: "Email" },
  { title: "Ecom" },
  { title: "Other" },
];

const AddNew_Page = () => {
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
    console.log(sendData);
    navigate("/");
  };

  // Focus Input Field on Load
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  return (
    <div className="add_new_page">
      <SearchBox />
      <div className="add_new_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* App Selection */}
          <div className="app_container">
            <p className="app_label">App</p>
            <div className="add_new_apps">
              {/* <button type="button" className="add_new_app">
                <FontAwesomeIcon icon={faPlus} />
                <p>Add</p>
              </button> */}
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

          {/* Category Selection */}
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
          </div>

          {/* Input Fields */}
          <CInput
            label="App Name"
            id="name"
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
          <CButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default AddNew_Page;
