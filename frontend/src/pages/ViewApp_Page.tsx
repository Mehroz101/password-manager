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
      username: data.username,
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
              label="Username"
              id="username"
              type="text"
              placeholder="Username"
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
