import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../components/SearchBox";
import "../styles/AddNewPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useRef, useState } from "react";
import { Category } from "../types/Types";
import CInput from "../components/FormComponent/CInput";
import CButton from "../components/FormComponent/CButton";
const categories = [
  {
    title: "Twitter",
  },
  {
    title: "Instagram",
  },
  {
    title: "Facebook",
  },
  {
    title: "Google",
  },
  {
    title: "Netflix",
  },
  {
    title: "Amazon",
  },
  {
    title: "Linkedin",
  },
  {
    title: "Youtube",
  },
];
const AddNew_Page = () => {
  const [category, setCategories] = useState<Partial<Category>[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Submit");
    navigate("/");
  };
  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories]);
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focuses input field
      }
    }, 300); // Delay helps on some devices
  }, []);
  return (
    <>
      <div className="add_new_page">
        <SearchBox />
        <div className="add_new_categories">
          <div className="add_new_category ">
            <FontAwesomeIcon icon={faPlus} />
            <p>Add</p>
          </div>
          {category &&
            category.map((category, index) => (
              <button
                className={`add_new_category ${
                  activeCategory === index ? "active" : ""
                }`}
                key={index}
                onClick={() => setActiveCategory(index)}
              >
                <p>{category.title}</p>
              </button>
            ))}
        </div>
        <div className="add_new_form">
          <form action="">
            {/* <div className="add_new_field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div> */}
            <CInput
              label="Username"
              id="username"
              type="text"
              placeholder="Username"
              ref={inputRef}
            />
            <CInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="Email Address"
            />
            <CInput
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
            />
            <CButton label="Save" action={handleSubmit} />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNew_Page;
